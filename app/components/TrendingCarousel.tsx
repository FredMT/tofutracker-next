import MovieCard from '@/components/MovieCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

type CarouselProps = {
  title: string
  items: Movie[] | TVShow[] | Anime[]
  yearExtractor: (item: Movie | TVShow | Anime) => string
  ratingExtractor: (item: Movie | TVShow | Anime) => number
}

export default function TrendingCarousel({
  title,
  items,
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
          {items.map((item) => {
            const year = yearExtractor(item)
            const rating = ratingExtractor(item)
            return (
              <CarouselItem
                key={item.id}
                className="flex max-w-[140px] md:mr-8"
              >
                <MovieCard item={item} year={year} rating={rating} />
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
