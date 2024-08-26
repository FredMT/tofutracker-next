'use client'
import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'

type Cast = {
  id: number
  name: string
  order: number
  character: string
  profile_path: string
  popularity: number
}

type Crew = {
  id: number
  name: string
  job: string
  profile_path: string
  popularity: number
}

export default function CastAndCrew({
  cast,
  crew,
}: {
  cast: Cast[]
  crew: Crew[]
}) {
  if (!cast.length && !crew.length) return null
  return (
    <Tabs
      defaultValue={`${Boolean(cast.length) ? 'cast' : 'crew'}`}
      id="credits"
    >
      <TabsList className="gap-1 border bg-transparent">
        {Boolean(cast.length) && (
          <TabsTrigger value="cast" className="data-[state=active]:bg-accent">
            Cast
          </TabsTrigger>
        )}
        {Boolean(crew.length) && (
          <TabsTrigger value="crew" className="data-[state=active]:bg-accent">
            Crew
          </TabsTrigger>
        )}
      </TabsList>

      {Boolean(cast.length) && (
        <TabsContent value="cast" className="mt-4">
          <Carousel
            className="relative min-h-[300px]"
            opts={{
              align: 'start',
              dragFree: true,
            }}
          >
            <CarouselContent className="max-w-[120px] md:max-w-[140px] lg:max-w-[165px]">
              {cast.map(({ name, profile_path, character, id }) => (
                <CarouselItem key={id + Math.random()} className="">
                  <div className="flex flex-col">
                    <Image
                      src={
                        profile_path
                          ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${profile_path}`
                          : `https://placehold.co/300x450/webp?text=${name.replaceAll(' ', '+')}`
                      }
                      alt={`${name}`}
                      className="h-[138px] w-[92px] rounded-md object-cover md:h-[169px] md:w-[112px] lg:h-[211px] lg:w-[140px]"
                      width={172}
                      height={259}
                    />
                    <div className="mt-2 text-[14px] font-semibold">{name}</div>
                    <div className="line-clamp-1 text-[12px] font-semibold text-muted-foreground">
                      {character}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute -top-9 right-16">
              <CarouselPrevious className="ml-5 rounded-md border-muted-foreground" />
              <CarouselNext className="rounded-md border-muted-foreground" />
            </div>
          </Carousel>
        </TabsContent>
      )}
      {Boolean(crew.length) && (
        <TabsContent value="crew" className="mt-4">
          <Carousel
            className="relative min-h-[300px]"
            opts={{
              align: 'start',
              dragFree: true,
            }}
          >
            <CarouselContent className="max-w-[120px] md:max-w-[140px] lg:max-w-[165px]">
              {crew.slice(0, 50).map(({ name, profile_path, job, id }) => (
                <CarouselItem key={id + Math.random()} className="">
                  <div className="flex flex-col">
                    <Image
                      src={
                        profile_path
                          ? `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${profile_path}`
                          : `https://placehold.co/300x450/webp?text=${name.replaceAll(' ', '+')}`
                      }
                      alt={`${name}`}
                      className="h-[138px] w-[92px] rounded-md object-cover md:h-[169px] md:w-[112px] lg:h-[211px] lg:w-[140px]"
                      width={172}
                      height={259}
                    />
                    <div className="mt-2 text-[14px] font-semibold">{name}</div>
                    <div className="line-clamp-1 text-[12px] font-semibold text-muted-foreground">
                      {job}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="absolute -top-9 right-16">
              <CarouselPrevious className="ml-5 rounded-md border-muted-foreground" />
              <CarouselNext className="rounded-md border-muted-foreground" />
            </div>
          </Carousel>
        </TabsContent>
      )}
    </Tabs>
  )
}
