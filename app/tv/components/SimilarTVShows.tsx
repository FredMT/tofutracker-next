'use client'
import SimilarMedia from '@/app/components/SimilarMedia'
import React from 'react'

type TVShow = {
  adult: boolean
  backdrop_path: string
  id: number
  name: string
  original_language: string
  original_name: string
  overview: string
  poster_path: string
  media_type: string
  genre_ids: number[]
  popularity: number
  first_air_date: string
  vote_average: number
  vote_count: number
  origin_country: string
}

export default function SimilarTVShows({ similar }: { similar: TVShow[] }) {
  const similarTVShows = similar.map((tvShow) => ({
    id: tvShow.id,
    title: tvShow.name,
    poster_path: tvShow.poster_path,
    popularity: tvShow.popularity,
    release_date: tvShow.first_air_date,
    vote_average: tvShow.vote_average,
  }))

  return <SimilarMedia items={similarTVShows} basePath="tv" />
}
