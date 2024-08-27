import { Badge } from '@/components/ui/badge'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type MediaItem = {
  id: number
  title: string
  poster_path: string
  popularity: number
  release_date: string
  vote_average: number
}

type RecommendedMediaProps = {
  items: MediaItem[]
  basePath: string
  type?: string
}

export default function RecommendedMedia({
  items,
  basePath,
  type,
}: RecommendedMediaProps) {
  return (
    <div className="my-6" id="recommended">
      <Carousel
        opts={{
          align: 'start',
          dragFree: true,
        }}
      >
        <CarouselContent className="max-w-[120px] md:max-w-[140px] lg:max-w-[165px]">
          {items.map((item, index) => (
            <CarouselItem key={index}>
              <Link
                href={`/${type === 'anime' ? 'anime' : basePath}/${item.id}`}
              >
                <div className="flex flex-col">
                  <div className="relative">
                    <Image
                      className="w-full rounded-sm object-cover lg:h-[210px] lg:w-[140px]"
                      src={`https://image.tmdb.org/t/p/w440_and_h660_face${item.poster_path}`}
                      alt={item.title}
                      width={112}
                      height={168}
                      sizes="100vw"
                    />
                    <div className="absolute right-1 top-1">
                      {item.vote_average > 0 && (
                        <Badge className="border-0 bg-gradient-to-r from-[#90CEA1] via-[#3CBEC9] to-[#00B3E5]">
                          <div>{`${item.vote_average.toFixed(1)}`}</div>
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 line-clamp-2 text-[14px] font-medium leading-5 text-secondary-foreground">
                    {item.title}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {item.release_date.slice(0, 4)}
                  </span>{' '}
                  &nbsp;
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -top-9 right-16">
          <CarouselPrevious className="ml-5 rounded-md border-muted-foreground" />
          <CarouselNext className="rounded-md border-muted-foreground" />
        </div>
      </Carousel>
    </div>
  )
}
