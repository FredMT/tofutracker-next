'use server'
import { authProcedure } from '@/lib/authProcedure'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const checkIn = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      autocomplete: z.boolean().optional().default(false),
    })
  )
  .handler(async ({ input, ctx }) => {
    const { mediaId, autocomplete } = input
    const response = await fetch(`${process.env.BACKEND_BASE_URL}check-in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: ctx.user.id.toString(),
        media_id: mediaId,
        autocomplete: autocomplete,
      }),
    })

    const data = await response.json()
    revalidateTag('is-in-library')
    return data
  })

export const cancelCheckIn = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_BASE_URL}check-in/${ctx.user.id.toString()}/${input.mediaId}`,
        {
          method: 'DELETE',
        }
      )

      const data = await res.json()
      revalidateTag('is-in-library')
      return data
    } catch (error) {
      return {
        success: false,
        message: 'An error occurred while canceling check-in',
      }
    }
  })
