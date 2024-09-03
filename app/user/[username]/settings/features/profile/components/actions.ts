'use server'

import { authenticatedAction } from '@/lib/safe-action'
import { updateBioUseCase } from '@/use-cases/users'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { db } from '@/db'
import { RateLimitError } from '@/lib/errors'
import { rateLimitByKey } from '@/lib/limiter'
import { generateRandomName } from '@/lib/names'
import { Profile } from '@prisma/client'

export const updateBioAction = authenticatedAction
  .input(
    z.object({
      bio: z.string().max(500, 'Bio must be 500 characters or less'),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const updatedProfile = await updateBioUseCase(ctx.user.id, input.bio)

      revalidatePath(`/user/${updatedProfile.username}`)
      revalidatePath(`/user/${updatedProfile.username}/settings`)

      return { success: true, bio: updatedProfile.bio }
    } catch (error) {
      throw 'Failed to update bio. Please try again.'
    }
  })

export async function uploadFile(
  formData: FormData,
  profile: Profile,
  type: 'profile' | 'banner'
) {
  const file = formData.get('file') as File
  if (!file) {
    throw new Error('No file provided')
  }

  try {
    await rateLimitByKey({
      key: `${profile.user_id}-upload-picture`,
      limit: 5,
      window: 12000000,
    })
  } catch (e) {
    if (e instanceof RateLimitError) {
      return { success: false, message: 'Rate limit exceeded' }
    }
  }

  const buffer = await file.arrayBuffer()
  const randomName = generateRandomName()
  const filename = `users/${profile.user_id}/${type}/${randomName}.${file.name.split('.').pop()}`

  const url = `https://${process.env.HOSTNAME}/${process.env.STORAGE_ZONE_NAME}/${filename}`

  if (process.env.ACCESS_KEY) {
    try {
      await fetch(
        `https://storage.bunnycdn.com/tofutracker-anime2/users/${profile.user_id}/${type}/`,
        {
          method: 'DELETE',
          headers: {
            AccessKey: process.env.ACCESS_KEY,
          },
        }
      )

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          AccessKey: process.env.ACCESS_KEY,
          'Content-Type': 'application/octet-stream',
        },
        body: buffer,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()

      if (result.HttpCode !== 201) {
        return { success: false, message: 'File upload failed' }
      }

      try {
        await db.profile.update({
          where: {
            user_id: profile.user_id,
          },
          data: {
            [type === 'profile' ? 'image' : 'banner_image']:
              `https://tofutrackeranime2.b-cdn.net/${filename}`,
          },
        })
      } catch (error: any) {
        return {
          success: false,
          message: `${type === 'profile' ? 'Profile' : 'Banner'} image upload failed`,
        }
      }
      revalidatePath(`/user/${profile.username}/settings`)
      return { success: true, message: 'Image uploaded successfully' }
    } catch (error) {
      console.error('Upload error:', error)
      return { success: false, message: 'Image upload failed' }
    }
  }
}
