'use server'

import api from '@/lib/api'
import { authProcedure } from '@/lib/authProcedure'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const changeWatchStatusMovie = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      watchStatus: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const body = {
        userId: ctx.user.id,
        mediaId: input.mediaId,
        watchStatus: input.watchStatus,
      }

      const res = await fetch(
        `${process.env.BACKEND_BASE_URL}user-media/change-movie-status`,
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
      console.error('Error changing watch status:', error)
      return {
        success: false,
        message: 'An error occurred while changing the watch status',
      }
    }
  })

export const changeWatchStatusTv = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      watchStatus: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const body = {
      user_id: ctx.user.id,
      show_id: input.mediaId,
      watch_status: input.watchStatus,
    }
    try {
      const res = await fetch(
        `${process.env.BACKEND_BASE_URL}user-media/change-tv-status`,
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
      console.error('Error changing watch status:', error)
      return {
        success: false,
        message: 'An error occurred while changing the watch status',
      }
    }
  })

export const changeWatchStatusTvSeason = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      watchStatus: z.string(),
      seasonId: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const body = {
        session_id: ctx.session.id,
        showId: input.mediaId,
        watchStatus: input.watchStatus,
        seasonId: input.seasonId,
      }
      const res = await fetch(
        `${process.env.BACKEND_BASE_URL}user-media/change-season-status`,
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
      console.error('Error changing watch status:', error)
      return {
        success: false,
        message: 'An error occurred while changing the watch status',
      }
    }
  })

export const changeWatchStatusAnimeTv = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      watchStatus: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const data = await api.post<{ success: boolean; message: string }>(
        `watch-status/anime-show?animeId=${input.mediaId}2&status=${input.watchStatus}&session_id=${ctx.session.id}`
      )

      revalidateTag('is-in-library')
      return data
    } catch (error) {
      console.error('Error changing watch status:', error)
      return {
        success: false,
        message: 'An error occurred while changing the watch status',
      }
    }
  })

export const changeWatchStatusAnimeTvSeason = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      watchStatus: z.string(),
      seasonId: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const data = await api.post<{ success: boolean; message: string }>(
        `watch-status/anime-season?animeId=${input.mediaId}&status=${input.watchStatus}&seasonId=${input.seasonId}&session_id=${ctx.session.id}`
      )

      revalidateTag('is-in-library')
      return data
    } catch (error) {
      console.error('Error changing watch status:', error)
      return {
        success: false,
        message: 'An error occurred while changing the watch status',
      }
    }
  })

export const changeWatchStatusAnimeMovie = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      watchStatus: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const data = await api.post<{ success: boolean; message: string }>(
        `watch-status/anime-movie?movieId=${input.mediaId}&status=${input.watchStatus}&session_id=${ctx.session.id}`
      )

      revalidateTag('is-in-library')
      return data
    } catch (error) {
      console.error('Error changing watch status:', error)
      return {
        success: false,
        message: 'An error occurred while changing the watch status',
      }
    }
  })
