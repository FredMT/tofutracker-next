'use client'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'
import useSWR from 'swr'
import React from 'react'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

type RelatedAnime = {
  type: string
  related_id: number
  poster: string
  title: string
  rating: number
  start_date: string
}

async function getSeasonYear(startDate: string) {
  const [year, month] = startDate.split('-').map(Number)
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall']
  const seasonIndex = Math.floor((month - 1) / 3)
  return `${seasons[seasonIndex]} ${year}`
}

export default function RelatedAnime({
  showId,
  related,
}: {
  showId: number
  related: any
}) {
  if (related.data.length > 0) {
    return (
      <>
        <div className="contentpagedetailtitle mt-6" id="related">
          Related Anime
        </div>
        <div className="mt-6">
          <Card className="rounded-none border-0 pb-8">
            <Carousel
              className="w-full"
              opts={{
                align: 'start',
                dragFree: true,
                slidesToScroll: 1,
              }}
            >
              <CarouselContent className="max-w-[120px] md:max-w-[140px] lg:max-w-[165px]">
                {related ? (
                  related?.data.map((item: RelatedAnime) => (
                    <CarouselItem key={item.related_id}>
                      <Link href={`/anime/${showId}/season/${item.related_id}`}>
                        <div className="flex flex-col">
                          <div className="relative">
                            <Image
                              src={`https://tofutrackeranime2.b-cdn.net/posters/${item.poster}`}
                              alt={`${item.title} Poster`}
                              className="h-[138px] w-[92px] rounded-md object-cover md:h-[169px] md:w-[112px] lg:h-[211px] lg:w-[140px]"
                              width={300}
                              height={450}
                            />
                            <div className="absolute right-3 top-1">
                              {item.rating !== null && (
                                <Badge className="bg-[#30374F] text-[#F8A359]">
                                  <div>{`${item.rating.toFixed(1)}`}</div>
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="mt-2 line-clamp-2 text-[14px] font-medium leading-5 text-secondary-foreground">
                            {item.title}
                          </div>
                          <span className="detail text-muted-foreground">
                            {getSeasonYear(item.start_date)}
                          </span>
                          <span className="detail text-muted-foreground">
                            {item.type}
                          </span>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))
                ) : (
                  <div className="ml-10">No similar anime found.</div>
                )}
              </CarouselContent>
              <div className="absolute -top-9 right-16">
                <CarouselPrevious className="ml-5 rounded-md border-muted-foreground" />
                <CarouselNext className="rounded-md border-muted-foreground" />
              </div>
            </Carousel>
          </Card>
        </div>
      </>
    )
  }
}
