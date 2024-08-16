'use server'

import { revalidateTag } from 'next/cache'

export async function addToLibrary(prevState: any, formData: FormData) {
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
    const response = await fetch('http://localhost:3030/api/user-media/rate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rateMediaDto),
    })

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

export async function changeWatchStatus(prevState: any, formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')
  const watchStatus = formData.get('watchStatus')
  const addPlay = formData.get('addPlay') === 'true'
  console.log(userId, mediaId, watchStatus, addPlay)

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
