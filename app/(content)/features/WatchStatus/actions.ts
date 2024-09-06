'use server'

import { validateRequest } from '@/lib/auth'
import { revalidateTag } from 'next/cache'

export async function changeWatchStatus(prevState: any, formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')
  const watchStatus = formData.get('watchStatus')
  const addPlay = formData.get('addPlay') === 'true'

  const body: any = {
    userId: Number(userId),
    mediaId: Number(mediaId),
    watchStatus,
  }

  if (watchStatus === 'COMPLETED') {
    body.addPlay = addPlay
  }

  try {
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
}

export async function changeWatchStatusTvSeason(
  prevState: any,
  formData: FormData
) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const showId = formData.get('mediaId')
  const watchStatus = formData.get('watchStatus')
  const seasonId = formData.get('seasonId')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/change-season-status`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          showId: showId,
          watchStatus: watchStatus,
          seasonId: seasonId,
        }),
        credentials: 'include',
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
}

export async function changeWatchStatusTv(prevState: any, formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')
  const watchStatus = formData.get('watchStatus')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/change-tv-status`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          show_id: mediaId,
          watch_status: watchStatus,
        }),
        credentials: 'include',
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
}

export async function changeWatchStatusAnimeTv(
  prevState: any,
  formData: FormData
) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const mediaId = formData.get('mediaId')
  const watchStatus = formData.get('watchStatus')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}watch-status/anime-show?animeId=${`${mediaId}2`}&status=${watchStatus}&session_id=${sessionId}`,
      {
        method: 'POST',
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
}

export async function changeWatchStatusAnimeTvSeason(
  prevState: any,
  formData: FormData
) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const mediaId = formData.get('mediaId')
  const watchStatus = formData.get('watchStatus')
  const seasonId = formData.get('seasonId')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}watch-status/anime-season?animeId=${`${mediaId}`}&status=${watchStatus}&seasonId=${seasonId}&session_id=${sessionId}`,
      {
        method: 'POST',
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
}

export async function changeAnimeMovieWatchStatus(
  prevState: any,
  formData: FormData
) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const mediaId = formData.get('mediaId')
  const watchStatus = formData.get('watchStatus')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}watch-status/anime-movie?movieId=${mediaId}&status=${watchStatus}&session_id=${sessionId}`,
      {
        method: 'POST',
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
}
