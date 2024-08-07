'use client'

import MovieCard from '@/app/components/MovieCard'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { User } from 'lucia'

type Props = {
  title: string
  items: any
  user: User | undefined
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
          {items
            .filter(
              (item: any) =>
                ![46260, 12971, 60572, 12609, 30983, 31910].includes(
                  item.media_id
                )
            )
            .map((item: any) => {
              return (
                <CarouselItem
                  key={item.media_id}
                  className="flex max-w-[140px] sm:mr-8"
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
