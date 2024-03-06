"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

type CastMember = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

type CrewMember = CastMember & {
  department: string;
  job: string;
} & Omit<CastMember, "cast_id" | "character" | "order">;

type CastAndCrewProps = {
  cast: CastMember[];
  crew: CrewMember[];
};

const transformCast = (data: CastMember[]) =>
  data
    ?.filter((member) => member.profile_path !== null)
    ?.slice(0, 50)
    .map((member) => ({
      name: member.name,
      profile_path: member.profile_path,
      character: member.character,
    }));

const transformCrew = (data: CrewMember[]) =>
  data
    ?.filter(
      (member, index, self) =>
        index === self.findIndex((t) => t.name === member.name) &&
        member.profile_path
    )
    ?.sort((a, b) => b.popularity - a.popularity)
    ?.slice(0, 50)
    .map(({ name, profile_path, job }) => ({
      name,
      profile_path,
      job,
    }));

export default function CastAndCrew({
  credits,
}: {
  credits: CastAndCrewProps;
}) {
  const { cast, crew } = credits;
  const transformedCast = transformCast(cast);
  const transformedCrew = transformCrew(crew);
  return (
    <Tabs defaultValue="cast">
      <TabsList className=" gap-1 border bg-transparent">
        <TabsTrigger value="cast" className="data-[state=active]:bg-accent">
          Cast
        </TabsTrigger>
        <TabsTrigger value="crew" className="data-[state=active]:bg-accent">
          Crew
        </TabsTrigger>
      </TabsList>

      <TabsContent value="cast" className="mt-4">
        <Carousel
          className="relative min-h-[200px]"
          opts={{
            align: "start",
            dragFree: true,
            slidesToScroll: 3,
          }}
        >
          <CarouselContent className="max-w-[120px] md:max-w-[140px] lg:max-w-[165px]">
            {transformedCast.map(({ name, profile_path, character }, index) => (
              <CarouselItem key={index} className="">
                <div className="flex flex-col">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${profile_path}`}
                    alt={`${name}`}
                    className="h-[138px] w-[92px] rounded-md object-cover md:h-[169px] md:w-[112px]
                      lg:h-[211px] lg:w-[140px]"
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
          className="relative min-h-[200px]"
          opts={{
            align: "start",
            dragFree: true,
            slidesToScroll: 3,
          }}
        >
          <CarouselContent className="max-w-[120px] md:max-w-[140px] lg:max-w-[165px]">
            {transformedCrew.map(({ name, profile_path, job }, index) => (
              <CarouselItem key={index} className="">
                <div className="flex flex-col">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${profile_path}`}
                    alt={`${name}`}
                    className="h-[138px] w-[92px] rounded-md object-cover md:h-[169px] md:w-[112px]
                      lg:h-[211px] lg:w-[140px]"
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
  );
}