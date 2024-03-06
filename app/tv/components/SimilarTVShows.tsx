"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TVShow = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string;
};

export default function SimilarTVShows({ similar }: { similar: TVShow[] }) {
  const similarTVShows = similar
    .filter((content: TVShow) => content.poster_path !== null)
    .map((content) => ({
      id: content.id,
      title: content.name,
      poster_path: content.poster_path,
      popularity: content.popularity.toFixed(2),
      release_date: content.first_air_date,
      vote_average: content.vote_average,
    }))
    .sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));

  return (
    <div className="mt-6">
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
      >
        <CarouselContent className="max-w-[120px] md:max-w-[140px] lg:max-w-[165px]">
          {similarTVShows.map((tvShow, index) => (
            <CarouselItem key={index}>
              <Link
                href={`/tv/${tvShow.id}-${tvShow.title
                  .replace(/ /g, "-")
                  .replace(/:/g, "")
                  .replace(/'/g, "")}`}
              >
                <div className="flex flex-col">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${tvShow.poster_path}`}
                    alt={`${tvShow.title} Poster`}
                    className="h-[138px] w-[92px] rounded-md object-cover md:h-[169px] md:w-[112px]
                        lg:h-[211px] lg:w-[140px]"
                    width={300}
                    height={450}
                  />
                  <div className="mt-2 line-clamp-2 text-[14px] font-medium leading-5 text-secondary-foreground">
                    {tvShow.title}
                  </div>
                  <div className="text-[12px] text-muted-foreground">
                    <span>{tvShow.release_date.slice(0, 4)}</span> &bull; &nbsp;
                    <span className="tracking-wide">
                      {tvShow.vote_average.toFixed(1)}/10
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
  );
}
