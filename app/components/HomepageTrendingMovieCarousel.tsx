"use client";

import useSWR from "swr";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import HomepageTrendingMovieBadges from "./HomepageTrendingMovieBadges";
import Autoplay from "embla-carousel-autoplay";
import SkeletonHomepageTrendingMovieCarousel from "./SkeletonHomepageTrendingMovieCarousel";

type Movie = {
  id: number;
  backdrop_path: string;
  title: string;
  logo_path: string;
  genre_ids: number[];
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const json = await res.json();
  return json.results.map(
    ({ id, backdrop_path, logo_path, title, genre_ids }: Movie) => ({
      id,
      title,
      backdrop_path: `https://image.tmdb.org/t/p/original${backdrop_path}`,
      logo_path: `https://image.tmdb.org/t/p/original${logo_path}`,
      genre_ids,
    })
  );
};

export default function HomepageTrendingMovieCarousel() {
  const { data, error, isLoading } = useSWR(
    "https://jellyfish-app-lmbt9.ondigitalocean.app/api/trending",
    fetcher
  );

  if (error) return <div>Failed to load</div>;

  if (isLoading) return <SkeletonHomepageTrendingMovieCarousel />;

  return (
    <Carousel
      className="w-full h-full"
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((movie: Movie, index: number) => (
          <CarouselItem key={index} className="h-[60vh]">
            <div className="relative h-full w-full">
              <Image
                src={movie.backdrop_path}
                alt={movie.title}
                className="object-cover object-center"
                fill
                priority
                sizes="100vw, 100vw"
              />
              <div className="absolute bottom-20 left-0 right-0 mx-auto flex justify-center">
                <div className="relative h-[200px] w-[400px]">
                  <Image
                    src={movie.logo_path}
                    alt={movie.title}
                    className="object-contain object-center"
                    sizes="100vw, 100vw"
                    fill
                  />
                </div>
              </div>

              <HomepageTrendingMovieBadges genre_ids={movie.genre_ids} />

              <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black to-transparent p-5 opacity-35" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute bottom-0 left-5 bg-transparent border-none text-white disabled:text-slate-800 hover:bg-transparent hover:text-slate-300" />
      <CarouselNext className="absolute bottom-0 right-5 bg-transparent border-none text-white disabled:text-slate-800 hover:bg-transparent hover:text-slate-300" />
    </Carousel>
  );
}
