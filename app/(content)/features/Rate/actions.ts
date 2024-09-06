'use server'

import { validateRequest } from '@/lib/auth'
import { revalidateTag } from 'next/cache'

export async function rateMedia(prevState: any, formData: FormData) {
  const userId = formData.get('user_id')
  const mediaId = formData.get('media_id')
  const rating = formData.get('rating')

  if (!userId || !mediaId || !rating) {
    return { success: false, message: 'Missing required fields' }
  }

  const rateMediaDto = {
    user_id: Number(userId),
    media_id: Number(mediaId),
    rating: Number(rating),
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/rate-movie`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rateMediaDto),
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
    console.error('Error updating media rating:', error)
    return {
      success: false,
      message: 'An error occurred while updating the rating',
    }
  }
}

export async function rateMediaTv(prevState: any, formData: FormData) {
  const userId = formData.get('user_id')
  const mediaId = formData.get('media_id')
  const rating = formData.get('rating')

  if (!userId || !mediaId || !rating) {
    return { success: false, message: 'Missing required fields' }
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/rate-show`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          show_id: mediaId,
          rating: rating,
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
    console.error('Error updating media rating:', error)
    return {
      success: false,
      message: 'An error occurred while updating the rating',
    }
  }
}

export async function rateMediaTvAnime(prevState: any, formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const mediaId = formData.get('media_id')
  const rating = formData.get('rating')

  if (!mediaId || !rating) {
    return { success: false, message: 'Missing required fields' }
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}ratings/anime-show?animeId=${`${mediaId}2`}&score=${rating}&session_id=${sessionId}`,
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
    console.error('Error updating media rating:', error)
    return {
      success: false,
      message: 'An error occurred while updating the rating',
    }
  }
}

export async function rateMediaTvAnimeSeason(
  prevState: any,
  formData: FormData
) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const seasonId = formData.get('seasonId')
  const rating = formData.get('rating')

  if (!seasonId || !rating) {
    return { success: false, message: 'Missing required fields' }
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}ratings/anime/season?seasonId=${seasonId}&rating=${rating}&session_id=${sessionId}`,
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
    console.error('Error updating media rating:', error)
    return {
      success: false,
      message: 'An error occurred while updating the rating',
    }
  }
}

export async function rateMediaTvSeason(prevState: any, formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const mediaId = formData.get('media_id')
  const rating = formData.get('rating')
  const seasonId = formData.get('seasonId')

  if (!mediaId || !seasonId || !rating) {
    return { success: false, message: 'Missing required fields' }
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/rate-season`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          showId: mediaId,
          seasonId: seasonId,
          rating: rating,
        }),
      }
    )

    const data = await response.json()

    revalidateTag('is-in-library')

    return data
  } catch (error) {
    console.error('Error updating media rating:', error)
    return {
      success: false,
      message: 'An error occurred while updating the rating',
    }
  }
}

export async function rateMediaTvAnimeMovie(
  prevState: any,
  formData: FormData
) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const rating = formData.get('rating')
  const movieId = formData.get('media_id')

  if (!rating) {
    return { success: false, message: 'Missing required fields' }
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}ratings/anime/movie?movieId=${movieId}&rating=${rating}&session_id=${sessionId}`,
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
    console.error('Error updating media rating:', error)
    return {
      success: false,
      message: 'An error occurred while updating the rating',
    }
  }
}
