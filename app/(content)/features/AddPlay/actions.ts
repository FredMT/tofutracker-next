'use server'
import api from '@/lib/api'
import { validateRequest } from '@/lib/auth'
import { authProcedure } from '@/lib/authProcedure'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const addPlayActionMovie = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      datetime: z.string().optional(),
    })
  )
  .handler(async ({ input, ctx }) => {
    let watchDate = new Date().toISOString()

    if (input.datetime) {
      watchDate = new Date(input.datetime).toISOString()
    }

    try {
      const data = await api.post<{ success: boolean; message: string }>(
        'user-media/movies/add-play',
        {
          mediaId: input.mediaId,
          watchDate: watchDate,
          session_id: ctx.session.id,
        }
      )

      revalidateTag('user-media')
      return data
    } catch (error) {
      console.error('Error adding play:', error)
      return {
        success: false,
        message: 'An error occurred while adding a play for this movie',
      }
    }
  })
