'use server'
import { authProcedure } from '@/lib/authProcedure'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const quickTrackAction = authProcedure
  .input(
    z.object({
      updates: z.record(
        z.record(
          z.object({
            add: z.array(z.number()),
            remove: z.array(z.number()),
          })
        )
      ),
      mediaType: z.enum(['tv', 'animetv']),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      await fetch(
        `${process.env.BACKEND_BASE_URL}quick-track/${input.mediaType === 'animetv' ? 'anime' : 'tv'}?session_id=${ctx.session.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(input.updates),
        }
      )

      revalidateTag('is-in-library')
      return { success: true, message: 'Show progress updated successfully' }
    } catch (error) {
      console.error('Error updating show progress:', error)
      return {
        success: false,
        message: 'An error occurred while updating show progress',
      }
    }
  })
