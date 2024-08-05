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

type SimilarMediaProps = {
  items: MediaItem[]
  basePath: string
  type?: string
}

export default function SimilarMedia({
  items,
  basePath,
  type,
}: SimilarMediaProps) {
  return (
    <div className="my-6" id="similar">
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
                  <Image
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`
                        : `https://placehold.co/300x450?text=${item.title.replaceAll(' ', '+')}`
                    }
                    alt={`${item.title} Poster`}
                    className="h-[138px] w-[92px] rounded-md object-cover md:h-[169px] md:w-[112px] lg:h-[211px] lg:w-[140px]"
                    width={300}
                    height={450}
                  />
                  <div className="mt-2 line-clamp-2 text-[14px] font-medium leading-5 text-secondary-foreground">
                    {item.title}
                  </div>
                  <div className="text-[12px] text-muted-foreground">
                    <span>{item.release_date.slice(0, 4)}</span> &bull; &nbsp;
                    <span className="tracking-wide">
                      {item.vote_average}/10
                    </span>
                  </div>
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
