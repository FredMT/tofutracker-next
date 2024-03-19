"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { Card } from "@/components/ui/card";

type SimilarProps = {
  type: string;
  id: number;
};

type SimilarAnime = {
  id: number;
  title: string;
  rating: string;
  start_date: string;
  poster: string;
  type: string;
};

async function getSeasonYear(startDate: string) {
  const [year, month] = startDate.split("-").map(Number);
  const seasons = ["Winter", "Spring", "Summer", "Fall"];
  const seasonIndex = Math.floor((month - 1) / 3);
  return `${seasons[seasonIndex]} ${year}`;
}

export default function SimilarAnime({ type, id }: SimilarProps) {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  let animeType = type !== "Movie" ? "tv" : "movie";

  const { data, error, isLoading } = useSWR(
    `https://jellyfish-app-lmbt9.ondigitalocean.app/api/getsimilaranime/${animeType}/${id}`,
    fetcher
  );

  if (error) {
    return <div>Error...</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const similar = data.data;

  return (
    <Card className="border-x-0 border-t-0 rounded-none pb-8">
      <div className="mt-6">
        <Carousel
          opts={{
            align: "start",
            dragFree: true,
            slidesToScroll: 3,
          }}
          className="w-full"
        >
          <CarouselContent className="max-w-[120px] md:max-w-[140px] lg:max-w-[165px]">
            {similar ? (
              similar?.map((item: SimilarAnime) => (
                <CarouselItem key={item.id}>
                  <Link
                    href={`/anime/${item.id}-${item.title
                      .replace(/ /g, "-")
                      .replace(/:/g, "")
                      .replace(/'/g, "")}`}
                  >
                    <div className="flex flex-col">
                      <Image
                        src={`https://cdn.anidb.net/images/main/${item.poster}`}
                        alt={`${item.title} Poster`}
                        className="h-[138px] w-[92px] rounded-md object-cover md:h-[169px] md:w-[112px]
                              lg:h-[211px] lg:w-[140px]"
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
      </div>
    </Card>
  );
}
