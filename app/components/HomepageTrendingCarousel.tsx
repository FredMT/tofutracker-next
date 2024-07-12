'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import HomepageTrendingMovieBadges from './HomepageTrendingMovieBadges'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { TrendingData } from '@/types/commonTypes'

export default function HomepageTrendingCarousel({
  data,
}: {
  data: TrendingData
}) {
  const trendingData = data.movies.flatMap((movie, index) => [
    { ...movie },
    { ...data.tvShows[index] },
  ])

  return (
    <Carousel
      className="h-full w-full"
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {trendingData.map((item: Movie | TVShow) => (
          <CarouselItem key={item.id} className="h-[60vh]">
            <div className="relative h-full w-full">
              <Image
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title}
                className="object-cover object-center"
                fill
                priority
                sizes="100vw"
              />
              <div className="absolute bottom-20 left-0 right-0 mx-auto flex justify-center">
                <Link href={`/${item.media_type}/${item.id}`}>
                  <div className="relative h-[100px] w-[200px] sm:h-[200px] sm:w-[400px]">
                    <Image
                      src={`https://image.tmdb.org/t/p/w300${item.logo_path}) || https://placehold.co/600x400/jpg?text=${item.title}`}
                      alt={item.title}
                      className="object-contain object-center"
                      sizes="100vw, 100vw"
                      priority
                      fill
                    />
                  </div>
                </Link>
              </div>

              <HomepageTrendingMovieBadges genres={item.genres} />

              <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black to-transparent p-12 opacity-35" />
              <div className="absolute left-0 right-0 top-0 flex justify-center bg-gradient-to-b from-black to-transparent p-12 opacity-50" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute bottom-0 left-5 border-none bg-transparent text-white hover:bg-transparent hover:text-slate-300 disabled:text-slate-800" />
      <CarouselNext className="absolute bottom-0 right-5 border-none bg-transparent text-white hover:bg-transparent hover:text-slate-300 disabled:text-slate-800" />
    </Carousel>
  )
}
