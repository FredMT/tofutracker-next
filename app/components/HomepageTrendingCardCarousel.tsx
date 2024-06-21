'use client'
import TrendingCarousel from './TrendingCarousel'

export default function HomepageTrendingCardCarousel({
  data,
}: {
  data: TrendingData
}) {
  if (data) {
    const yearExtractor = (item: Movie | TVShow | Anime) => {
      if ('release_date' in item) {
        return item.release_date.split('-')[0]
      } else if ('first_air_date' in item) {
        return item.first_air_date.split('-')[0]
      } else if ('start_date' in item) {
        return item.start_date.split('-')[0]
      }
      return ''
    }

    const ratingExtractor = (item: Movie | TVShow | Anime) => {
      if ('vote_average' in item) {
        return parseFloat(item.vote_average.toFixed(2))
      } else if ('rating' in item) {
        return parseFloat(item.rating.toFixed(2))
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
