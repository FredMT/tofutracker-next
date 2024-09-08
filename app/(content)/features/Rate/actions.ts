'use server'

import { authProcedure } from '@/lib/authProcedure'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const rateMovie = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      rating: z.number(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const body = {
      user_id: ctx.user.id,
      media_id: Number(input.mediaId),
      rating: input.rating,
    }
    try {
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}user-media/rate-movie`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      )

      const data = await response.json()

      if (data.success) {
        revalidateTag('is-in-library')
        return { success: true, message: 'Media rating updated successfully' }
      } else {
        return { success: false, message: 'Failed to update media rating' }
      }
    } catch (error) {
      console.error('Error rating movie:', error)
      return {
        success: false,
        message: 'An error occurred while rating the movie',
      }
    }
  })

export const rateTv = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      rating: z.number(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}user-media/rate-show`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: ctx.user.id,
            show_id: input.mediaId,
            rating: input.rating,
          }),
        }
      )

      const data = await response.json()

      if (data.success) {
        revalidateTag('is-in-library')
        return { success: true, message: 'Media rating updated successfully' }
      } else {
        return { success: false, message: 'Failed to update media rating' }
      }
    } catch (error) {
      console.error('Error rating TV show:', error)
      return {
        success: false,
        message: 'An error occurred while rating the TV show',
      }
    }
  })

export const rateTvSeason = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      seasonId: z.string(),
      rating: z.number(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}user-media/rate-season`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: ctx.session.id,
            showId: input.mediaId,
            seasonId: input.seasonId,
            rating: input.rating,
          }),
        }
      )

      const data = await response.json()

      revalidateTag('is-in-library')

      return data
    } catch (error) {
      console.error('Error rating TV season:', error)
      return {
        success: false,
        message: 'An error occurred while rating the TV season',
      }
    }
  })

export const rateTvAnime = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      rating: z.number(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}ratings/anime-show?animeId=${`${input.mediaId}2`}&score=${input.rating}&session_id=${ctx.session.id}`,
        {
          method: 'POST',
        }
      )

      const data = await response.json()

      if (data.success) {
        revalidateTag('is-in-library')
        return { success: true, message: 'Media rating updated successfully' }
      } else {
        return { success: false, message: 'Failed to update media rating' }
      }
    } catch (error) {
      console.error('Error rating anime TV show:', error)
      return {
        success: false,
        message: 'An error occurred while rating the anime TV show',
      }
    }
  })

export const rateTvAnimeSeason = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      seasonId: z.string(),
      rating: z.number(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}ratings/anime/season?seasonId=${input.seasonId}&rating=${input.rating}&session_id=${ctx.session.id}`,
        {
          method: 'POST',
        }
      )

      const data = await response.json()

      if (data) {
        revalidateTag('is-in-library')
        return { success: true, message: 'Media rating updated successfully' }
      } else {
        return { success: false, message: 'Failed to update media rating' }
      }
    } catch (error) {
      console.error('Error rating anime TV season:', error)
      return {
        success: false,
        message: 'An error occurred while rating the anime TV season',
      }
    }
  })

export const rateAnimeMovie = authProcedure
  .input(
    z.object({
      mediaId: z.string(),
      rating: z.number(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_BASE_URL}ratings/anime/movie?movieId=${input.mediaId}&rating=${input.rating}&session_id=${ctx.session.id}`,
        {
          method: 'POST',
        }
      )

      const data = await response.json()

      if (data) {
        revalidateTag('is-in-library')
        return { success: true, message: 'Media rating updated successfully' }
      } else {
        return { success: false, message: 'Failed to update media rating' }
      }
    } catch (error) {
      console.error('Error rating anime movie:', error)
      return {
        success: false,
        message: 'An error occurred while rating the anime movie',
      }
    }
  })
