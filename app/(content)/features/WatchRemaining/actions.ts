'use server'

import { authProcedure } from '@/lib/authProcedure'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

export const watchRemaningTvAction = authProcedure
  .input(z.object({ mediaId: z.number(), datetime: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_BASE_URL}user-media/watch-remaining-tv`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: ctx.user.id.toString(),
            show_id: input.mediaId,
            watch_date: input.datetime,
          }),
        }
      )

      const data = await res.json()
      revalidateTag('is-in-tv')
      return data
    } catch (error) {
      return {
        success: false,
        message:
          'An error occurred while marking remaining episodes as watched',
      }
    }
  })

export const watchRemaningAnimeTvAction = authProcedure
  .input(z.object({ mediaId: z.number() }))
  .handler(async ({ input, ctx }) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_BASE_URL}user-library/anime/watch-remaining?animeId=${`${input.mediaId}2`}&session_id=${ctx.session.id}`,
        { method: 'POST' }
      )
      revalidateTag('is-in-tv')
      return await res.json()
    } catch (error) {
      return {
        success: false,
        message:
          'An error occurred while marking remaining episodes as watched',
      }
    }
  })

export const watchRemaningAnimeTvSeasonAction = authProcedure
  .input(z.object({ mediaId: z.number(), seasonId: z.string() }))
  .handler(async ({ input, ctx }) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_BASE_URL}user-library/anime/season/watch-remaining?animeId=${input.mediaId}&seasonId=${input.seasonId}&session_id=${ctx.session.id}`,
        { method: 'POST' }
      )
      revalidateTag('is-in-tv')
      return await res.json()
    } catch (error) {
      return {
        success: false,
        message:
          'An error occurred while marking remaining episodes as watched',
      }
    }
  })

export const watchRemaningTvSeasonAction = authProcedure
  .input(
    z.object({
      mediaId: z.number(),
      seasonId: z.string(),
      datetime: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const res = await fetch(
        `${process.env.BACKEND_BASE_URL}user-media/watch-remaining-season`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            session_id: ctx.session.id,
            show_id: input.mediaId,
            watch_date: input.datetime,
            season_id: input.seasonId,
          }),
        }
      )
      revalidateTag('is-in-tv')
      return await res.json()
    } catch (error) {
      return {
        success: false,
        message:
          'An error occurred while marking remaining episodes as watched',
      }
    }
  })
