'use client'

import MovieCard from '@/app/components/MovieCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { User } from '@supabase/supabase-js'

type Props = {
  title: string
  items: Movie[] | TVShow[] | Anime[]
  user: User | null
}

export default function TrendingCarousel({ title, items, user }: Props) {
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
            return (
              <CarouselItem
                key={item.id}
                className="flex max-w-[140px] md:mr-8"
              >
                <MovieCard item={item} user={user} />
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
