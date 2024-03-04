"use client";

import useSWR from "swr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import MovieCard from "@/components/MovieCard";

type Movie = {
  id: number;
  title: string;
  logo_path: string;
  poster_path: string;
  year: string;
  rating: number;
  media_type: string;
  release_date: string;
  vote_average: number;
  first_air_date: string;
  origin_country: string[];
  genre_ids: number[];
  start_date: string;
};

export default function HomepageTrendingMovieCardCarousel() {
  const {
    data: fetchedData,
    error,
    isLoading,
  } = useSWR(
    "https://jellyfish-app-lmbt9.ondigitalocean.app/api/trending",
    (url) => fetch(url).then((res) => res.json())
  );

  if (error) return <div>Failed to load</div>;

  if (isLoading)
    return (
      <Carousel className="w-full">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <Skeleton>
                <div className="min-w-[112px] min-h-[260px] sm:min-w-[140px] sm:min-h-[302px]"></div>
              </Skeleton>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute -top-8 right-16">
          <CarouselPrevious className="ml-5 rounded-md border-muted-foreground" />
          <CarouselNext className="rounded-md border-muted-foreground" />
        </div>
      </Carousel>
    );

  if (fetchedData) {
    return (
      <>
        <div className="text-primary text-lg not-italic font-semibold leading-7">
          Trending Movies
        </div>
        <Carousel
          className="w-full"
          opts={{
            dragFree: true,
            slidesToScroll: 3,
            align: "start",
          }}
        >
          <CarouselContent>
            {fetchedData.movies.map((movie: Movie, index: number) => {
              const year = movie.release_date.split("-")[0];
              const rating = movie.vote_average.toFixed(2);
              return (
                <CarouselItem
                  key={movie.id}
                  className="flex max-w-[140px] md:mr-8"
                >
                  <MovieCard
                    key={movie.id}
                    {...movie}
                    year={year}
                    rating={parseFloat(rating)}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="absolute -top-9 right-16">
            <CarouselPrevious className="ml-5 rounded-md border-muted-foreground" />
            <CarouselNext className="rounded-md border-muted-foreground" />
          </div>
        </Carousel>

        <div className="text-primary text-lg not-italic font-semibold leading-7">
          Trending TV Shows
        </div>

        <Carousel
          className="w-full"
          opts={{
            dragFree: true,
            slidesToScroll: 3,
            align: "start",
          }}
        >
          <CarouselContent>
            {fetchedData.tvShows
              .filter(
                (tvShow: Movie) =>
                  !tvShow.genre_ids.includes(16) &&
                  tvShow.origin_country[0] !== "JP"
              )
              .map((tvShow: Movie, index: number) => {
                const year = tvShow.first_air_date.split("-")[0];
                const rating = tvShow.vote_average.toFixed(2);
                return (
                  <CarouselItem
                    key={tvShow.id}
                    className="flex max-w-[140px] md:mr-8"
                  >
                    <MovieCard
                      key={tvShow.id}
                      {...tvShow}
                      year={year}
                      rating={parseFloat(rating)}
                    />
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <div className="absolute -top-9 right-16">
            <CarouselPrevious className="ml-5 rounded-md border-muted-foreground" />
            <CarouselNext className="rounded-md border-muted-foreground" />
          </div>
        </Carousel>

        <div className="text-primary text-lg not-italic font-semibold leading-7">
          Trending Anime
        </div>

        <Carousel
          className="w-full"
          opts={{
            dragFree: true,
            slidesToScroll: 3,
            align: "start",
          }}
        >
          <CarouselContent>
            {fetchedData.anime.map((anime: Movie, index: number) => {
              const year = anime.start_date.split("-")[0];
              const rating = anime.rating;
              return (
                <CarouselItem
                  key={anime.id}
                  className="flex max-w-[140px] md:mr-8"
                >
                  <MovieCard
                    key={anime.id}
                    {...anime}
                    year={year}
                    rating={rating}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="absolute -top-9 right-16">
            <CarouselPrevious className="ml-5 rounded-md border-muted-foreground" />
            <CarouselNext className="rounded-md border-muted-foreground" />
          </div>
        </Carousel>
      </>
    );
  }
}
