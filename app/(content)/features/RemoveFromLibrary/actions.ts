'use server'

import api from '@/lib/api'
import { authProcedure } from '@/lib/authProcedure'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const removeFromLibraryMovie = authProcedure
  .input(z.object({ mediaId: z.string() }))
  .handler(async ({ input, ctx }) => {
    const body = {
      user_id: ctx.user.id.toString(),
      media_id: input.mediaId,
    }
    try {
      const res = await fetch(
        `${process.env.BACKEND_BASE_URL}user-media/delete-movie`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )

      const data = await res.json()

      revalidateTag('is-in-library')

      return { success: data.success, message: data.message }
    } catch (error) {
      console.error('Error removing from library:', error)
      return {
        success: false,
        message: 'An error occurred while removing from library',
      }
    }
  })

export const removeFromLibraryTv = authProcedure
  .input(z.object({ mediaId: z.string() }))
  .handler(async ({ input, ctx }) => {
    const body = {
      user_id: ctx.user.id,
      show_id: input.mediaId,
    }
    try {
      const res = await fetch(
        `${process.env.BACKEND_BASE_URL}user-media/delete-show`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
          credentials: 'include',
        }
      )

      const data = await res.json()

      revalidateTag('is-in-library')

      return { success: data.success, message: data.message }
    } catch (error) {
      console.error('Error removing from library:', error)
      return {
        success: false,
        message: 'An error occurred while removing from library',
      }
    }
  })

export const removeFromLibraryTvSeason = authProcedure
  .input(z.object({ mediaId: z.string(), seasonId: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      await api.delete(`user-media/delete-season`, {
        session_id: ctx.session.id,
        showId: input.mediaId,
        seasonId: input.seasonId,
      })
      revalidateTag('is-in-library')
      return { success: true, message: 'Season removed from library' }
    } catch (error) {
      console.error('Error removing from library:', error)
      return {
        success: false,
        message: 'An error occurred while removing from library',
      }
    }
  })

export const removeFromLibraryTvAnime = authProcedure
  .input(z.object({ mediaId: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      api.delete(`user-library/anime/deleteShow`, {
        animeId: input.mediaId,
        session_id: ctx.session.id,
      })

      revalidateTag('is-in-library')

      return { success: true, message: 'Anime removed from library' }
    } catch (error) {
      console.error('Error removing from library:', error)
      return {
        success: false,
        message: 'An error occurred while removing from library',
      }
    }
  })

export const removeFromLibraryAnimeSeason = authProcedure
  .input(z.object({ mediaId: z.string(), seasonId: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      await api.delete(`user-media/delete-anime-season`, {
        seasonId: input.seasonId,
        showId: input.mediaId,
        session_id: ctx.session.id,
      })

      revalidateTag('is-in-library')
      return { success: true, message: 'Season removed from library' }
    } catch (error) {
      console.error('Error removing from library:', error)
      return {
        success: false,
        message: 'An error occurred while removing from library',
      }
    }
  })

export const removeFromLibraryAnimeMovie = authProcedure
  .input(z.object({ mediaId: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      await api.delete<Response>(`user-library/anime/delete-movie`, {
        movieId: input.mediaId,
        session_id: ctx.session.id,
      })

      revalidateTag('is-in-library')

      return { success: true, message: 'Movie removed from library' }
    } catch (error) {
      console.error('Error removing from library:', error)
      return {
        success: false,
        message: 'An error occurred while removing from library',
      }
    }
  })
