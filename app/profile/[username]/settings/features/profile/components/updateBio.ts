'use server'

import { authenticatedAction } from '@/lib/safe-action'
import { updateBioUseCase } from '@/use-cases/users'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateBioAction = authenticatedAction
  .input(
    z.object({
      bio: z.string().max(500, 'Bio must be 500 characters or less'),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const updatedProfile = await updateBioUseCase(ctx.user.id, input.bio)

      // Revalidate the profile page
      revalidatePath(`/profile/${updatedProfile.username}`)
      revalidatePath(`/profile/${updatedProfile.username}/settings`)

      return { success: true, bio: updatedProfile.bio }
    } catch (error) {
      throw 'Failed to update bio. Please try again.'
    }
  })
