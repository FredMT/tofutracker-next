import { validateRequest } from '@/lib/auth'

export async function getLibraryData(userId: number, itemId: string) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}user-media/movie/details`,
    {
      next: { tags: ['is-in-library'] },
      cache: 'no-cache',
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, media_id: itemId }),
    }
  )
  const result = await data.json()
  return result
}

export async function getLibraryTvData(
  userId: number,
  itemId: string | number
) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}user-media/tv/details?userId=${userId}&showId=${itemId.toString().slice(0, -1)}`,
    {
      next: { tags: ['is-in-library'] },
      cache: 'no-cache',
      credentials: 'include',
      method: 'GET',
    }
  )
  const result = await data.json()
  return result
}

export async function getLibraryAnimeMovieData(itemId: string | number) {
  const session = await validateRequest()
  if (!session.session || !session) return null
  const sessionId = session.session.id
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}media-details?session_id=${sessionId}&mediaId=${itemId.toString().slice(0, -1)}&mediaType=ANIME_MOVIE`,
    {
      next: { tags: ['is-in-library'] },
      cache: 'no-cache',
      credentials: 'include',
      method: 'GET',
    }
  )
  const result = await data.json()
  return result
}

export async function getLibraryTvSeasonData(itemId: string, seasonId: number) {
  const session = await validateRequest()
  if (!session.session || !session) return null

  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}user-media/season/details?session_id=${session.session.id}&showId=${itemId}&seasonId=${seasonId}`,
    {
      next: { tags: ['is-in-library'] },
      cache: 'no-cache',
      credentials: 'include',
      method: 'GET',
    }
  )
  const result = await data.json()
  return result
}

export async function getLibraryAnimeSeasonData(
  itemId: string,
  seasonId: number
) {
  const session = await validateRequest()
  if (!session.session || !session) return null

  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}user-media/anime/season/details?session_id=${session.session.id}&animeId=${itemId}&animeSeasonId=${seasonId}`,
    {
      next: { tags: ['is-in-library'] },
      cache: 'no-cache',
      credentials: 'include',
      method: 'GET',
    }
  )
  const result = await data.json()
  return result
}

export async function getLibraryAnimeData(itemId: string) {
  const session = await validateRequest()
  if (!session.session || !session) return null

  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}media-details?session_id=${session.session.id}&mediaId=${itemId}&mediaType=ANIME_SHOW`,
    {
      next: { tags: ['is-in-library'] },
      cache: 'no-cache',
      credentials: 'include',
      method: 'GET',
    }
  )
  const result = await data.json()
  return result
}
