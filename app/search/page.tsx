'use client'

import SearchInputForm from './components/SearchInputForm'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { useState } from 'react'
import Rating from '../components/Rating'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

type MovieItem = {
  id: number
  title: string
  vote_average: number
  release_date: string
  poster_path: string
  overview: string
  description: never
  rating: never
  poster: never
  name: never
  first_air_date: never
  start_date: never
}

type TVItem = {
  id: number
  name: string
  vote_average: number
  first_air_date: string
  poster_path: string
  overview: string
  description: never
  rating: never
  poster: never
  title: never
  release_date: never
  start_date: never
}

type AnimeItem = {
  id: number
  title: string
  rating: number
  poster_path: never
  description: string
  poster: string
  name: never
  start_date: string
  first_air_date: never
  release_date: never
  vote_average: never
  overview: never
}

export default function Search() {
  const search = useSearchParams()
  const query = search ? search.get('q') : null

  const [categorySelected, setCategorySelected] = useState('movie')
  const [expandedStates, setExpandedStates] = useState<Record<number, boolean>>(
    {}
  )

  const toggleOverview = (id: number) => {
    setExpandedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const { data: searchResults, error: searchResultsError } = useSWR(
    () =>
      query
        ? `https://tofutracker-3pt5y.ondigitalocean.app/api/search/${query}`
        : null,
    fetcher
  )

  if (searchResultsError) {
    return (
      <div className="mt-20 flex flex-col gap-6 px-4">
        <p>
          There was
          <SearchInputForm /> an error retrieving the search results
        </p>
      </div>
    )
  }

  if (searchResults) {
    console.log(searchResults)
    return (
      <>
        <div className="mt-20 flex flex-col gap-6 px-4">
          <SearchInputForm />
          <div className="flex gap-4">
            <Badge
              variant="outline"
              className={`px-4 py-2 text-sm ${
                categorySelected === 'movie' ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setCategorySelected('movie')}
            >
              Movies
              <span className="ml-2">{searchResults.data.movies.length}</span>
            </Badge>
            <Badge
              variant="outline"
              className={`px-4 py-2 text-sm ${
                categorySelected === 'tv' ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setCategorySelected('tv')}
            >
              TV Shows
              <span className="ml-2">{searchResults.data.tv.length}</span>
            </Badge>
            <Badge
              variant="outline"
              className={`px-4 py-2 text-sm ${
                categorySelected === 'anime' ? 'ring-2 ring-purple-500' : ''
              }`}
              onClick={() => setCategorySelected('anime')}
            >
              Anime
              <span className="ml-2">{searchResults.data.anime.length}</span>
            </Badge>
          </div>
        </div>

        <div className="mb-6 mt-8 flex w-full flex-col gap-8 px-8">
          {(categorySelected === 'movie'
            ? searchResults.data.movies
            : categorySelected === 'tv'
              ? searchResults.data.tv
              : searchResults.data.anime
          ).map((item: MovieItem | TVItem | AnimeItem) => (
            <div key={item.id} className="flex gap-2">
              <Link href={`/${categorySelected}/${item.id}`}>
                <Image
                  src={
                    categorySelected === 'anime'
                      ? Boolean(item.poster)
                        ? `https://cdn.anidb.net/images/main/${item.poster}`
                        : 'https://placehold.co/80x120/jpg'
                      : Boolean(item.poster_path)
                        ? `https://image.tmdb.org/t/p/original${item.poster_path}`
                        : 'https://placehold.co/80x120/jpg'
                  }
                  alt={categorySelected === 'tv' ? item.name : item.title}
                  width={80}
                  height={120}
                  className="max-h-[calc(3*40px)] min-w-[calc(2*40px)]"
                />
              </Link>
              <div className="flex flex-col">
                <Link href={`/${categorySelected}/${item.id}`}>
                  <p className="mb-2 font-medium leading-6">
                    {categorySelected === 'tv' ? item.name : item.title}
                    {(categorySelected === 'tv' && item.first_air_date) ||
                    (categorySelected === 'movie' && item.release_date) ||
                    (categorySelected === 'anime' && item.start_date) ? (
                      <span className="ml-1 text-sm font-medium leading-6">
                        (
                        {
                          (categorySelected === 'tv'
                            ? item.first_air_date
                            : categorySelected === 'movie'
                              ? item.release_date
                              : item.start_date
                          ).split('-')[0]
                        }
                        )
                      </span>
                    ) : null}
                  </p>

                  <div className="mb-2">
                    <Rating
                      value={parseFloat(
                        (categorySelected === 'anime'
                          ? item.rating
                          : item.vote_average
                        ).toFixed(1)
                      )}
                      totalStars={5}
                      precision={0.1}
                      size={1}
                      readOnly={true}
                      onRatingChange={() => {}}
                    />
                  </div>
                  <p
                    className={`mb-2 text-sm max-sm:hidden ${
                      expandedStates[item.id]
                        ? 'line-clamp-none'
                        : 'line-clamp-2'
                    }`}
                  >
                    {categorySelected === 'anime'
                      ? item.description
                      : item.overview}
                  </p>
                </Link>

                {(categorySelected === 'anime' &&
                  item.description &&
                  item.description.split(' ').length > 30) ||
                  (categorySelected === 'movie' &&
                    item.overview &&
                    item.overview.split(' ').length > 30 && (
                      <div className="flex justify-center">
                        {expandedStates[item.id] ? (
                          <ChevronUp
                            className="size-5"
                            onClick={() => toggleOverview(item.id)}
                          />
                        ) : (
                          <ChevronDown
                            className="size-5"
                            onClick={() => toggleOverview(item.id)}
                          />
                        )}
                      </div>
                    ))}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-4" />
      </>
    )
  }

  return (
    <div className="mt-20 flex flex-col gap-6 px-4">
      <SearchInputForm />
    </div>
  )
}
