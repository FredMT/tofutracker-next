import { SearchInput } from './components/SearchInput'
import SearchResults from './components/SearchResults'

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

export default function Search({
  searchParams,
}: {
  searchParams?: {
    query?: string
  }
}) {
  const query = searchParams?.query || ''

  return (
    <div className="mx-auto mt-[72px] flex max-w-[1676px] px-5 lg:px-40">
      <div className="w-full px-4 py-5">
        <div className="flex w-full flex-col">
          <SearchInput query={query} />
          <SearchResults query={query} />
        </div>
      </div>
    </div>
  )
}
