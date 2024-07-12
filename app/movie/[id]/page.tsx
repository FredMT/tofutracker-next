import type { Metadata } from 'next'
import { Suspense } from 'react'
import Title from '@/app/movie/components/Title'
import Backdrop from '@/app/movie/components/Backdrop'
import Poster from '@/app/components/Poster'
import { Skeleton } from '@/components/ui/skeleton'
import Tagline from '@/app/movie/components/Tagline'
import MovieInfo from '@/app/movie/components/MovieInfo'
import MobileButtons from '@/app/components/MobileButtons'
import Details from '@/app/movie/components/Details'
import Overview from '@/app/movie/components/Overview'
import CastAndCrew from '@/app/movie/components/CastAndCrew'
import SimilarMovies from '@/app/movie/components/SimilarMovies'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'

type Props = {
  params: {
    id: string
  }
}

export const generateMetadata = async ({ params }: Props) => {
  const { data: movie } = await getMovieData(parseInt(params.id.split('-')[0]))
  return {
    title: `${movie.details.title}`,
  }
}

async function getMovieData(id: number) {
  const data = await fetch(`http://localhost:3030/api/movie/${id}`, {
    cache: 'no-cache',
  })
  const result = await data.json()
  if (result.message === 'Is an anime') {
    redirect(`/anime/${result.data.anidb_id}`)
  }
  return result
}

async function getsimilarmovies(id: number) {
  const data = await fetch(`http://localhost:8080/api/getsimilarmovies/${id}`)
  const result = await data.json()
  return result
}

export default async function Movie({ params }: { params: { id: string } }) {
  const { data: movie } = await getMovieData(parseInt(params.id.split('-')[0]))
  const similarMovies = await getsimilarmovies(
    parseInt(params.id.split('-')[0])
  )

  return (
    <div className="flex flex-col gap-y-6">
      <Suspense
        fallback={<Skeleton className="h-[288px] w-full sm:h-[576px]" />}
      >
        <Backdrop
          backdrop_path={`https://image.tmdb.org/t/p/original${movie.details.backdrop_path}`}
          title={movie.details.title}
          logo_path={`https://image.tmdb.org/t/p/w300${movie.details.logo_path}`}
        />
      </Suspense>
      <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8 xl:px-40">
        <div className="flex justify-center">
          <Suspense
            fallback={
              <Skeleton className="mt-2 h-[186px] w-[124px] sm:h-[273px] sm:w-[182px] md:h-[336px] md:w-[224px]" />
            }
          >
            <Poster
              poster_path={movie.details.poster_path}
              title={movie.details.title}
              itemId={movie.details.id}
            />
          </Suspense>
        </div>
        <div className="flex basis-4/5 flex-col">
          <div className="flex justify-center sm:justify-start">
            <Suspense fallback={<Skeleton className="mt-6 h-6 w-[60vw]" />}>
              <Title title={movie.details.title} />
            </Suspense>
          </div>
          <div className="flex justify-center sm:justify-start">
            <Suspense fallback={<Skeleton className="mt-6 h-[24px] w-[80%]" />}>
              <Tagline tagline={movie.details.tagline} />
            </Suspense>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<Skeleton className="mt-6 h-[94px] w-full" />}>
              <MovieInfo
                vote_average={movie.details.vote_average}
                release_date={movie.details.release_date}
                runtime={movie.details.runtime}
                language={movie.details.original_language}
                certification={movie.details.certification}
              />
            </Suspense>
          </div>
          <div className="mt-6 flex justify-center sm:hidden">
            <Suspense fallback={<Skeleton className="mt-6 h-[168px] w-full" />}>
              <MobileButtons itemId={movie.details.id} />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Details</div>
            <Suspense fallback={<Skeleton className="mt-6 h-[253px] w-full" />}>
              <Details
                budget={movie.details.budget}
                revenue={movie.details.revenue}
                crew={movie.details.main_staff}
              />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle" id="overview">
              Overview
            </div>

            <Suspense fallback={<Skeleton className="mt-6 h-[350px] w-full" />}>
              <Overview overview={movie.details.overview} />
            </Suspense>
          </div>
          <div className="mt-6">
            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <CastAndCrew
                cast={movie.credits.cast}
                crew={movie.credits.crew}
              />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Similar Movies</div>
            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              {!similarMovies.ok ? (
                <p>No similar movies found</p>
              ) : (
                <SimilarMovies similar={similarMovies.data} />
              )}
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
