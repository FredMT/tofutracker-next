'use server'

import { validateRequest } from '@/lib/auth'
import { revalidateTag } from 'next/cache'

export async function addToLibrary(formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const mediaId = formData.get('mediaId')

  if (!mediaId) {
    return { success: false, message: 'Media ID is required' }
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/movies/add?session_id=${sessionId}&mediaId=${mediaId}&watchStatus=COMPLETED`,
      {
        method: 'POST',
      }
    )

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
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }
  const showId = formData.get('mediaId')
  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/shows/add?session_id=${session.session.id}&showId=${showId}`,
      {
        method: 'POST',
      }
    )

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
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/shows/add-season?session_id=${sessionId}&show_id=${showId}&season_id=${seasonId}`,
      {
        method: 'POST',
      }
    )

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

export async function addToLibraryTvAnime(formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const showId = formData.get('mediaId')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/anime/add?session_id=${sessionId}&animeId=${showId}`,
      {
        method: 'POST',
      }
    )

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

export async function addToLibraryMovieAnime(formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const movieId = formData.get('mediaId')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-anime/add-movie?session_id=${sessionId}&movieId=${movieId}`,
      {
        method: 'POST',
      }
    )

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

export async function addToLibraryTvAnimeSeason(formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session)
    return { success: false, message: 'Unauthorized' }

  const sessionId = session.session.id
  const animeId = formData.get('mediaId')
  const seasonId = formData.get('seasonId')

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/anime/add-season?seasonId=${seasonId}&animeId=${animeId}&session_id=${sessionId}`,
      {
        method: 'POST',
      }
    )

    const data = await res.json()
    revalidateTag('is-in-library')
    if (data.success) {
      return { success: data.success, message: 'Anime season added to library' }
    } else {
      return {
        success: false,
        message: 'Failed to add anime season to library',
      }
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while adding to library',
    }
  }
}
