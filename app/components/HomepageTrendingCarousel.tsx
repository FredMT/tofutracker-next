'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'
import Link from 'next/link'
import HomepageTrendingMovieBadges from './HomepageTrendingMovieBadges'

export default function HomepageTrendingCarousel({ data }: { data: any }) {
  const trendingData = data.movies.flatMap((movie: any, index: number) => [
    { ...movie },
    { ...data.tv[index] },
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
        {trendingData.map((item: any) => (
          <CarouselItem key={item.media_id} className="h-[60vh]">
            <div className="relative h-full w-full">
              <Image
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title}
                className="object-cover object-center"
                fill
                priority
                sizes="100vw"
              />
              {item.logo_path && (
                <div className="absolute bottom-20 left-0 right-0 mx-auto flex justify-center">
                  <Link href={`/${item.media_type}/${item.media_id}`}>
                    <div className="relative h-[100px] w-[200px] sm:h-[200px] sm:w-[400px]">
                      <Image
                        src={`https://image.tmdb.org/t/p/w300${item.logo_path})`}
                        alt={item.title}
                        className="select-none object-contain object-center drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        sizes="100vw, 100vw"
                        priority
                        fill
                      />
                    </div>
                  </Link>
                </div>
              )}

              <HomepageTrendingMovieBadges genres={item.genres} />

              <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black to-transparent p-12 opacity-35" />
              <div className="absolute left-0 right-0 top-0 flex justify-center bg-gradient-to-b from-black to-transparent p-12 opacity-50" />
              <div className="absolute bottom-0 left-0 top-0 flex justify-center bg-gradient-to-r from-black to-transparent p-12 opacity-50" />
              <div className="absolute bottom-0 right-0 top-0 flex justify-center bg-gradient-to-l from-black to-transparent p-12 opacity-50" />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute bottom-0 left-5 border-none bg-transparent text-white hover:bg-transparent hover:text-slate-300 disabled:text-slate-800" />
      <CarouselNext className="absolute bottom-0 right-5 border-none bg-transparent text-white hover:bg-transparent hover:text-slate-300 disabled:text-slate-800" />
    </Carousel>
  )
}
