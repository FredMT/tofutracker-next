'use client'

import useSWR from 'swr'
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
import SkeletonHomepageTrendingMovieCarousel from './SkeletonHomepageTrendingMovieCarousel'
import Link from 'next/link'

type Content = {
  id: number
  backdrop_path: string
  title: string
  logo_path: string
  genre_ids: number[]
  media_type: string
}

export default function HomepageTrendingMovieCarousel() {
  const {
    data: fetchedData,
    error,
    isLoading,
  } = useSWR(
    'https://tofutracker-3pt5y.ondigitalocean.app/api/trending',
    (url) => fetch(url).then((res) => res.json())
  )

  let data: Content[] = []
  if (fetchedData) {
    const minLength = Math.min(
      fetchedData.movies.length,
      fetchedData.tvShows.length,
      5
    )
    for (let i = 0; i < minLength; i++) {
      data.push(fetchedData.movies[i]) // Add movie
      data.push(fetchedData.tvShows[i]) // Add TV show
    }
  }

  if (error) return <div>Failed to load</div>

  if (isLoading) return <SkeletonHomepageTrendingMovieCarousel />

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
        {data.map((item: Content, index: number) => (
          <CarouselItem key={index} className="h-[60vh]">
            <div className="relative h-full w-full">
              <Image
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt={item.title}
                className="object-cover object-center"
                fill
                priority
                sizes="100vw, 100vw"
              />
              <div className="absolute bottom-20 left-0 right-0 mx-auto flex justify-center">
                <Link
                  href={`/${item.media_type}/${item.id}-${item.title
                    .replace(/ /g, '-')
                    .replace(/:/g, '')}`}
                >
                  <div className="relative h-[100px] w-[200px] sm:h-[200px] sm:w-[400px]">
                    <Image
                      src={item.logo_path}
                      alt={item.title}
                      className="object-contain object-center"
                      sizes="100vw, 100vw"
                      priority
                      fill
                    />
                  </div>
                </Link>
              </div>

              <HomepageTrendingMovieBadges genre_ids={item.genre_ids} />

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
