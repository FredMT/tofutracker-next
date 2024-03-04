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

type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export default function SimilarMovies({ similar }: { similar: Movie[] }) {
  const similarMovies = similar
    .filter((content: Movie) => content.poster_path !== null)
    .map((content) => ({
      id: content.id,
      title: content.title,
      poster_path: content.poster_path,
      popularity: content.popularity.toFixed(2),
      release_date: content.release_date,
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
          {similarMovies.map((movie, index) => (
            <CarouselItem key={index}>
              <Link
                href={`/movie/${movie.id}-${movie.title
                  .replace(/ /g, "-")
                  .replace(/:/g, "")}`}
              >
                <div className="flex flex-col">
                  <Image
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie.poster_path}`}
                    alt={`${movie.title} Poster`}
                    className="h-[138px] w-[92px] rounded-md object-cover md:h-[169px] md:w-[112px]
                        lg:h-[211px] lg:w-[140px]"
                    width={112}
                    height={168}
                  />
                  <div className="mt-2 line-clamp-2 text-[14px] font-medium leading-5 text-secondary-foreground">
                    {movie.title}
                  </div>
                  <div className="text-[12px] text-muted-foreground">
                    <span>{movie.release_date.slice(0, 4)}</span> &bull; &nbsp;
                    <span className="tracking-wide">
                      {movie.vote_average.toFixed(1)}/10
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
