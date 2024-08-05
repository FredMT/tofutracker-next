'use client'
import React from 'react'
import SimilarMedia from '@/app/components/SimilarMedia'

type Movie = {
  adult?: boolean
  backdrop_path?: string
  genre_ids?: number[]
  id: number
  original_language?: string
  original_title?: string
  overview?: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count?: number
}

export default function SimilarMovies({
  similar,
  type,
}: {
  similar: Movie[]
  type?: string
}) {
  const similarMovies = similar.map((content) => ({
    id: content.id,
    title: content.title,
    poster_path: content.poster_path,
    popularity: content.popularity,
    release_date: content.release_date,
    vote_average: content.vote_average,
  }))

  return <SimilarMedia items={similarMovies} basePath="movie" type={type} />
}
