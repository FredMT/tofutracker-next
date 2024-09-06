'use server'

import { validateRequest } from '@/lib/auth'
import { revalidateTag } from 'next/cache'

export async function watchRemainingAction(formData: FormData) {
  const userId = formData.get('userId')
  const showId = formData.get('mediaId')
  const watchDate = formData.get('datetime')

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/watch-remaining-tv`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          show_id: showId,
          watch_date: watchDate,
        }),
      }
    )

    const result = await response.json()

    revalidateTag('is-in-tv')

    return { success: result.success, message: result.message }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to mark remaining episodes as watched',
    }
  }
}

export async function watchRemainingActionTvAnime(formData: FormData) {
  const showId = formData.get('mediaId')
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }
  const sessionId = session.session.id

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}user-library/anime/watch-remaining?animeId=${`${showId}2`}&session_id=${sessionId}`,
      {
        method: 'POST',
      }
    )

    const result = await response.json()

    revalidateTag('is-in-tv')

    return { success: true, message: result.message }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to mark remaining episodes as watched',
    }
  }
}

export async function watchRemainingActionTvAnimeSeason(formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const animeId = formData.get('mediaId')
  const seasonId = formData.get('seasonId')

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}user-library/anime/season/watch-remaining?animeId=${animeId}&seasonId=${seasonId}&session_id=${sessionId}`,
      {
        method: 'POST',
      }
    )

    const result = await response.json()

    revalidateTag('is-in-tv')

    return { success: result.success, message: result.message }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to mark remaining episodes as watched',
    }
  }
}

export async function watchRemainingActionTvSeason(formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const showId = formData.get('mediaId')
  const watchDate = formData.get('datetime')
  const seasonId = formData.get('seasonId')

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/watch-remaining-season`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          show_id: showId,
          watch_date: watchDate,
          season_id: seasonId,
        }),
      }
    )

    const result = await response.json()

    revalidateTag('is-in-tv')

    return { success: result.success, message: result.message }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to mark remaining episodes as watched',
    }
  }
}
