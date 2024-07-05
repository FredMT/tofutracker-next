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

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function RelatedAnime({ id }: { id: number }) {
  const {
    data: related,
    error,
    isLoading,
  } = useSWR(`http://localhost:8080/api/getanimerelationsinfo/${id}`, fetcher)

  if (error) {
    return <div>Error...</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (related.data.length > 0) {
    return (
      <>
        <div className="contentpagedetailtitle mt-6" id="related">
          Related Anime
        </div>
        <div className="mt-6">
          <Card className="rounded-none border-x-0 border-t-0 pb-8">
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
                      <Link href={`/anime/${item.related_id}`}>
                        <div className="flex flex-col">
                          <img
                            src={`https://tofutrackeranime2.b-cdn.net/posters/${item.poster}`}
                            alt={`${item.title} Poster`}
                            className="h-[138px] w-[92px] rounded-md object-cover md:h-[169px] md:w-[112px] lg:h-[211px] lg:w-[140px]"
                            width={300}
                            height={450}
                          />
                          <div className="mt-2 line-clamp-2 text-[14px] font-medium leading-5 text-secondary-foreground">
                            {item.title}
                          </div>
                          <div className="text-[12px] text-muted-foreground">
                            <span>{getSeasonYear(item.start_date)}</span> &bull;
                            &nbsp;
                            <span className="tracking-wide">{item.rating}</span>
                          </div>
                          <div className="text-[12px] text-muted-foreground">
                            {item.type}
                          </div>
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
