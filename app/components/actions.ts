'use server'

import { validateRequest } from '@/lib/auth'
import { revalidateTag } from 'next/cache'

export async function addToLibrary(formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')

  try {
    const res = await fetch('http://localhost:3030/api/user-media/add-movie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        media_id: mediaId,
        watch_status: 'COMPLETED',
      }),
    })

    const data = await res.json()

    revalidateTag('is-in-library')

    return { success: data.success, message: data.message }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while adding to library',
    }
  }
}

export async function addToLibraryTv(formData: FormData) {
  const userId = formData.get('userId')
  const showId = formData.get('mediaId')

  try {
    const res = await fetch('http://localhost:3030/api/user-media/add-show', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        show_id: showId,
      }),
    })

    const data = await res.json()

    revalidateTag('is-in-library')

    return { success: data.success, message: data.message }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while adding to library',
    }
  }
}

export async function addToLibraryTvSeason(formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const showId = formData.get('mediaId')
  const seasonId = formData.get('seasonId')

  try {
    const res = await fetch('http://localhost:3030/api/user-media/add-season', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        show_id: showId,
        season_id: seasonId,
      }),
    })

    const data = await res.json()

    revalidateTag('is-in-library')

    return { success: data.success, message: data.message }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while adding to library',
    }
  }
}

export async function removeFromLibrary(prevState: any, formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')

  try {
    const res = await fetch(
      'http://localhost:3030/api/user-media/delete-movie',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          media_id: mediaId,
        }),
        credentials: 'include',
      }
    )

    const data = await res.json()

    revalidateTag('is-in-library')

    return { success: data.success, message: data.message }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while removing from library',
    }
  }
}

export async function removeFromLibraryTv(prevState: any, formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')

  try {
    const res = await fetch(
      'http://localhost:3030/api/user-media/delete-show',
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          show_id: mediaId,
        }),
        credentials: 'include',
      }
    )

    const data = await res.json()

    revalidateTag('is-in-library')

    return { success: data.success, message: data.message }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while removing from library',
    }
  }
}

export async function removeFromLibraryTvSeason(
  prevState: any,
  formData: FormData
) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const showId = formData.get('mediaId')
  const seasonId = formData.get('seasonId')

  try {
    const res = await fetch(
      `http://localhost:3030/api/user-media/delete-season?session_id=${session.session.id}&showId=${showId}&seasonId=${seasonId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    )

    const data = await res.json()

    revalidateTag('is-in-library')

    return { success: data.success, message: data.message }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while removing from library',
    }
  }
}

export async function addPlayAction(prevState: any, formData: FormData) {
  const datetime = formData.get('datetime')
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')

  const body: any = {
    user_id: userId,
    media_id: mediaId,
  }

  if (datetime) {
    body.watch_date = new Date(datetime as string).toISOString()
  }

  try {
    const res = await fetch(
      'http://localhost:3030/api/user-media/add-play-movie',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include',
      }
    )

    const data = await res.json()

    revalidateTag('user-media')

    return { success: data.success, message: data.message }
  } catch (error) {
    console.error('Error adding play:', error)
    return {
      success: false,
      message: 'An error occurred while adding a play for this movie',
    }
  }
}

export async function checkInAction(prevState: any, formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')
  const autocomplete = formData.get('autocomplete') === 'true'

  const response = await fetch('http://localhost:3030/api/check-in', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      media_id: mediaId,
      autocomplete: autocomplete,
    }),
  })

  const data = await response.json()
  revalidateTag('is-in-library')
  return data
}

export async function cancelCheckInAction(prevState: any, formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')

  const res = await fetch(
    `http://localhost:3030/api/check-in/${userId}/${mediaId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )

  const data = await res.json()
  revalidateTag('is-in-library')
  return data
}

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
      'http://localhost:3030/api/user-media/rate-movie',
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
      'http://localhost:3030/api/user-media/rate-show',
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
      'http://localhost:3030/api/user-media/rate-season',
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
      'http://localhost:3030/api/user-media/change-movie-status',
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
      'http://localhost:3030/api/user-media/change-season-status',
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
      'http://localhost:3030/api/user-media/change-tv-status',
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

export async function watchRemainingAction(formData: FormData) {
  const userId = formData.get('userId')
  const showId = formData.get('mediaId')
  const watchDate = formData.get('datetime')

  try {
    const response = await fetch(
      'http://localhost:3030/api/user-media/watch-remaining-tv',
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
      'http://localhost:3030/api/user-media/watch-remaining-season',
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

export async function quickTrackAction(formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const showId = formData.get('showId')
  const updates = formData.get('updates')

  try {
    const response = await fetch(
      'http://localhost:3030/api/user-media/quick-track',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          show_id: showId,
          updates: updates,
        }),
        credentials: 'include',
      }
    )

    const data = await response.json()

    if (data.success) {
      revalidateTag('is-in-library')
      return { success: true, message: 'Show progress updated successfully' }
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update show progress',
      }
    }
  } catch (error) {
    console.error('Error updating show progress:', error)
    return {
      success: false,
      message: 'An error occurred while updating show progress',
    }
  }
}
