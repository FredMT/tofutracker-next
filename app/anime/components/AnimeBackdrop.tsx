import Image from 'next/image'
import React from 'react'

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

export default async function AnimeBackdrop({
  title,
  type,
  id,
}: {
  title: string
  type: string
  id: number
}) {
  let images

  type !== 'Movie'
    ? (images = await getAnimeImages('tv', id))
    : (images = await getAnimeImages('movie', id))

  const backdrop_path =
    images?.backdrops && images.backdrops.length > 0
      ? 'https://image.tmdb.org/t/p/original' +
        images.backdrops.reduce((prev: Images, current: Images) =>
          prev.vote_average > current.vote_average ? prev : current
        ).file_path
      : undefined

  const logo_path =
    'https://image.tmdb.org/t/p/original' + images?.logos &&
    images?.logos?.length > 0
      ? images.logos.reduce((prev: Images, current: Images) =>
          prev.vote_average > current.vote_average ? prev : current
        ).file_path
      : undefined

  return (
    <div className="relative">
      <Image
        className="h-[288px] w-full object-cover sm:h-[576px] sm:w-full"
        src={
          backdrop_path
            ? `https://image.tmdb.org/t/p/original${backdrop_path}`
            : 'https://placehold.co/1920x1080/000000/FFFFFF.png?text=Banner+Image+Not+Found'
        }
        alt={title}
        width={1920}
        height={1080}
        priority
      />
      {logo_path && (
        <Image
          src={`https://image.tmdb.org/t/p/original${logo_path}`}
          alt={title}
          width={1920}
          height={1080}
          className="absolute -bottom-[45%] left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform object-contain sm:h-[400px] sm:w-[400px]"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black to-transparent p-12 opacity-35" />
      <div className="absolute left-0 right-0 top-0 flex justify-center bg-gradient-to-b from-black to-transparent p-12 opacity-50" />
    </div>
  )
}
