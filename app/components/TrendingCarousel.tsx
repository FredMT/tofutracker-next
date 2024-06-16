import MovieCard from '@/components/MovieCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

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

type CarouselProps = {
  title: string
  items: Item[]
  filterFn?: (item: Item) => boolean
  yearExtractor: (item: Item) => string
  ratingExtractor: (item: Item) => number
}

export default function TrendingCarousel({
  title,
  items,
  filterFn = () => true,
  yearExtractor,
  ratingExtractor,
}: CarouselProps) {
  return (
    <>
      <div className="text-lg font-semibold not-italic leading-7 text-primary">
        {title}
      </div>
      <Carousel
        className="w-full"
        opts={{
          dragFree: true,
          align: 'start',
        }}
      >
        <CarouselContent>
          {items.filter(filterFn).map((item) => {
            const year = yearExtractor(item)
            const rating = ratingExtractor(item)
            return (
              <CarouselItem
                key={item.id}
                className="flex max-w-[140px] md:mr-8"
              >
                <MovieCard
                  key={item.id}
                  {...item}
                  year={year}
                  rating={rating}
                />
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <div className="absolute -top-9 right-16">
          <CarouselPrevious className="ml-5 rounded-md border-muted-foreground" />
          <CarouselNext className="rounded-md border-muted-foreground" />
        </div>
      </Carousel>
    </>
  )
}
