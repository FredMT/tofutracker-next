import Image from 'next/image'
import React from 'react'
import { createClient } from '@/utils/supabase/server'
import MobileButtons from '@/app/components/MobileButtons'

type Images = {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string
  vote_average: number
  vote_count: number
  width: number
}

async function getAnimeImages(type: string, id: number) {
  const url = `https://tofutracker-3pt5y.ondigitalocean.app/api/getanimeimages/${type}/${id}`
  const data = await fetch(url)
  const result = await data.json()
  return result.data
}

async function checkAnimeInLibrary(id: number, user_id: string) {
  const url = `https://tofutracker-3pt5y.ondigitalocean.app/api/checkanimeinlibrary/${id}/${user_id}`
  const data = await fetch(url)
  const result = await data.json()
  return result.data
}

async function getCurrentRating(
  item_id: number,
  user_id: string
): Promise<number> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('item_lists')
    .select('*')
    .eq('item_id', item_id)
    .eq('user_id', user_id)
    .eq('item_type', 'anime')

  if (error) {
    console.error('Error fetching rating:', error)
    return -1
  }

  if (data && data.length > 0 && Boolean(data[0].rating)) {
    return data[0].rating
  } else {
    return -1
  }
}

export default async function AnimePoster({
  title,
  type,
  poster,
  id,
}: {
  title: string
  type: string
  poster: string
  id: number
}) {
  let images
  let poster_path

  type !== 'Movie'
    ? (images = await getAnimeImages('tv', id))
    : (images = await getAnimeImages('movie', id))

  if (images?.posters && images.posters.length > 0) {
    const highestRatedPoster = images.posters.reduce(
      (prev: Images, current: Images) =>
        prev.vote_average > current.vote_average ? prev : current
    )
    poster_path =
      'https://image.tmdb.org/t/p/w440_and_h660_face' +
      highestRatedPoster.file_path
  } else {
    poster_path = `https://tofutrackeranime2.b-cdn.net/posters/${poster}`
  }

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  let isInLibrary = false
  let currentRating: number = -1

  if (user) {
    isInLibrary = await checkAnimeInLibrary(id, user.id)
    currentRating = await getCurrentRating(id, user.id)
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Image
        className="h-[186px] w-[124px] rounded-sm border border-muted object-cover sm:h-[273px] sm:min-w-[182px] md:h-[336px] md:min-w-[224px]"
        src={poster_path}
        alt={title}
        width={600}
        height={900}
        priority
      />
      <div className="hidden gap-y-4 sm:flex sm:flex-col">
        <MobileButtons item_id={id} item_type="anime" />
      </div>
    </div>
  )
}
