'use client'
import TrendingCarousel from './TrendingCarousel'

type Anime = {
  id: number
  title: string
  rating: string
  end_date: string | null
  media_type: string
  start_date: string
  poster_path: string
}

type Movie = {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  genre_ids: number[]
  logo_path: string
  media_type: string
}

type TVShow = {
  id: number
  title: string
  poster_path: string
  backdrop_path: string
  first_air_date: string
  vote_average: number
  genre_ids: number[]
  origin_country: string[]
  logo_path: string
  media_type: string
}

type Item = Movie | TVShow | Anime

export default function HomepageTrendingCardCarousel({
  data,
}: {
  data: {
    movies: Movie[]
    tvShows: TVShow[]
    anime: Anime[]
  }
}) {
  if (data) {
    const yearExtractor = (item: Item) => {
      if ('release_date' in item) {
        return item.release_date.split('-')[0]
      } else if ('first_air_date' in item) {
        return item.first_air_date.split('-')[0]
      } else if ('start_date' in item) {
        return item.start_date.split('-')[0]
      }
      return ''
    }

    const ratingExtractor = (item: Item) => {
      if ('vote_average' in item) {
        return parseFloat(item.vote_average.toFixed(2))
      } else if ('rating' in item) {
        return parseFloat(item.rating)
      }
      return 0
    }

    return (
      <>
        <TrendingCarousel
          title="Trending Movies"
          items={data.movies}
          yearExtractor={yearExtractor}
          ratingExtractor={ratingExtractor}
        />

        <TrendingCarousel
          title="Trending TV Shows"
          items={data.tvShows}
          filterFn={(item: Item) =>
            'genre_ids' in item &&
            !item.genre_ids.includes(16) &&
            'origin_country' in item &&
            item.origin_country[0] !== 'JP'
          }
          yearExtractor={yearExtractor}
          ratingExtractor={ratingExtractor}
        />

        <TrendingCarousel
          title="Trending Anime"
          items={data.anime}
          yearExtractor={yearExtractor}
          ratingExtractor={ratingExtractor}
        />
      </>
    )
  }
}
