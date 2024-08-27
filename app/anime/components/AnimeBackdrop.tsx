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

async function getAnimeImages(id: number) {
  const url = `${process.env.BACKEND_BASE_URL}anime/images/${id}`
  const data = await fetch(url)
  const result = await data.json()
  return result
}

export default async function AnimeBackdrop({
  title,
  id,
}: {
  title: string
  id: number
}) {
  const images = await getAnimeImages(id)

  return (
    <div className="relative overflow-hidden">
      <Image
        className="h-[70vh] w-full object-cover sm:w-full"
        src={
          images.data
            ? `https://image.tmdb.org/t/p/w1280${images.data.backdrop}`
            : 'https://placehold.co/1280x720/000000/FFFFFF.png?text=Banner+Image+Not+Found'
        }
        alt={title}
        width={1920}
        height={1080}
        priority
      />
      {images.logo && (
        <Image
          src={`https://image.tmdb.org/t/p/w300${images.data.logo}`}
          alt={title}
          width={1920}
          height={1080}
          className="absolute -bottom-[45%] left-1/2 h-[200px] w-[200px] -translate-x-[60%] -translate-y-1/2 transform object-contain sm:h-[400px] sm:w-[400px]"
        />
      )}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black to-transparent p-12 opacity-35" />
      <div className="absolute left-0 right-0 top-0 flex justify-center bg-gradient-to-b from-black to-transparent p-12 opacity-50" />
    </div>
  )
}
