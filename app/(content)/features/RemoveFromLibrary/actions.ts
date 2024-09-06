'use server'

import { validateRequest } from '@/lib/auth'
import { revalidateTag } from 'next/cache'

export async function removeFromLibrary(prevState: any, formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/delete-movie`,
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
      `${process.env.BACKEND_BASE_URL}user-media/delete-show`,
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
      `${process.env.BACKEND_BASE_URL}user-media/delete-season?session_id=${session.session.id}&showId=${showId}&seasonId=${seasonId}`,
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

export async function removeFromLibraryAnimeSeason(
  prevState: any,
  formData: FormData
) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const showId = formData.get('mediaId')
  const seasonId = formData.get('seasonId')
  const sessionId = session.session.id

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/delete-anime-season?seasonId=${seasonId}&showId=${showId}&session_id=${sessionId}`,
      {
        method: 'DELETE',
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

export async function removeFromLibraryTvAnime(
  prevState: any,
  formData: FormData
) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const showId = formData.get('mediaId')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-library/anime/deleteShow?animeId=${showId}&session_id=${session.session.id}`,
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

export async function removeFromLibraryAnimeMovie(
  prevState: any,
  formData: FormData
) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const movieId = formData.get('mediaId')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-library/anime/delete-movie?movieId=${movieId}&session_id=${sessionId}`,
      {
        method: 'DELETE',
      }
    )

    const data = await res.json()

    revalidateTag('is-in-library')

    return { success: true, message: 'Movie removed from library' }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while removing from library',
    }
  }
}
