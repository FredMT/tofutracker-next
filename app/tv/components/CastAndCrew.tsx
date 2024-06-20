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

type Person = {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  total_episode_count: number
}

type CastMember = Person & {
  roles: {
    credit_id: string
    character: string
    episode_count: number
  }[]
  order: number
}

type CrewMember = Person & {
  jobs: {
    credit_id: string
    job: string
    episode_count: number
  }[]
  department: string
}

type CastAndCrewProps = {
  cast: CastMember[]
  crew: CrewMember[]
}

const transformCast = (data: CastMember[]) =>
  data
    ?.filter((member) => member.profile_path !== null)
    ?.slice(0, 50)
    .map((member) => ({
      name: member.name,
      profile_path: member.profile_path,
      character: member.roles[0].character,
    }))

const transformCrew = (data: CrewMember[]) =>
  data
    ?.filter((member) => member.profile_path !== null)
    ?.slice(0, 50)
    .map((member) => ({
      name: member.name,
      profile_path: member.profile_path,
      job: member.jobs[0].job,
    }))

export default function CastAndCrew({
  credits,
}: {
  credits: CastAndCrewProps
}) {
  const { cast, crew } = credits
  const transformedCast = transformCast(cast)
  const transformedCrew = transformCrew(crew)
  return (
    <Tabs defaultValue="credits">
      <TabsList className="gap-1 border bg-transparent">
        <TabsTrigger value="cast" className="data-[state=active]:bg-accent">
          Cast
        </TabsTrigger>
        <TabsTrigger value="crew" className="data-[state=active]:bg-accent">
          Crew
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cast" className="mt-4">
        <Carousel
          className="relative min-h-[300px]"
          opts={{
            align: 'start',
            dragFree: true,
          }}
        >
          <CarouselContent className="max-w-[120px] md:max-w-[140px] lg:max-w-[165px]">
            {transformedCast.map(({ name, profile_path, character }, index) => (
              <CarouselItem key={index} className="">
                <div className="flex flex-col">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${profile_path}`}
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
      <TabsContent value="crew" className="mt-4">
        <Carousel
          className="relative min-h-[300px]"
          opts={{
            align: 'start',
            dragFree: true,
          }}
        >
          <CarouselContent className="max-w-[120px] md:max-w-[140px] lg:max-w-[165px]">
            {transformedCrew.map(({ name, profile_path, job }, index) => (
              <CarouselItem key={index} className="">
                <div className="flex flex-col">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${profile_path}`}
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
    </Tabs>
  )
}
