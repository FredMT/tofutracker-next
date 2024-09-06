'use server'

import api from '@/lib/api'
import { authProcedure } from '@/lib/authProcedure'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const addToLibraryMovie = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const data = await api.post<{ success: boolean; message: string }>(
        'user-media/movies/add',
        {
          mediaId: input.mediaId,
          watchStatus: 'COMPLETED',
          session_id: ctx.session.id,
        }
      )

      revalidateTag('is-in-library')
      return data
    } catch (error) {
      console.error('Error adding to library:', error)
      return {
        success: false,
        message: 'An error occurred while adding to library',
      }
    }
  })

export const addToLibraryTv = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const data = await api.post<{ success: boolean; message: string }>(
        'user-media/shows/add',
        { showId: input.mediaId, session_id: ctx.session.id }
      )

      revalidateTag('is-in-library')
      return data
    } catch (error) {
      console.error('Error adding to library:', error)
      return {
        success: false,
        message: 'An error occurred while adding to library',
      }
    }
  })

export const addToLibraryTvSeason = authProcedure
  .input(z.object({ mediaId: z.string(), seasonId: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      const data = await api.post<{ success: boolean; message: string }>(
        'user-media/shows/add-season',
        {
          session_id: ctx.session.id,
          show_id: input.mediaId,
          season_id: input.seasonId,
        }
      )

      revalidateTag('is-in-library')
      return data
    } catch (error) {
      console.error('Error adding to library:', error)
      return {
        success: false,
        message: 'An error occurred while adding to library',
      }
    }
  })

export const addToLibraryTvAnime = authProcedure
  .input(z.object({ mediaId: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      const data = await api.post<{ success: boolean; message: string }>(
        'user-media/anime/add',
        {
          session_id: ctx.session.id,
          animeId: input.mediaId,
        }
      )

      revalidateTag('is-in-library')
      return data
    } catch (error) {
      console.error('Error adding to library:', error)
      return {
        success: false,
        message: 'An error occurred while adding to library',
      }
    }
  })

export const addToLibraryMovieAnime = authProcedure
  .input(z.object({ mediaId: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      const data = await api.post<{ success: boolean; message: string }>(
        'user-anime/add-movie',
        {
          session_id: ctx.session.id,
          movieId: input.mediaId,
        }
      )

      revalidateTag('is-in-library')
      return data
    } catch (error) {
      console.error('Error adding to library:', error)
      return {
        success: false,
        message: 'An error occurred while adding to library',
      }
    }
  })

export const addToLibraryTvAnimeSeason = authProcedure
  .input(z.object({ mediaId: z.string(), seasonId: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      const data = await api.post<{ success: boolean; message: string }>(
        'user-media/anime/add-season',
        {
          session_id: ctx.session.id,
          animeId: input.mediaId,
          seasonId: input.seasonId,
        }
      )

      revalidateTag('is-in-library')
      return data
    } catch (error) {
      console.error('Error adding to library:', error)
      return {
        success: false,
        message: 'An error occurred while adding to library',
      }
    }
  })
