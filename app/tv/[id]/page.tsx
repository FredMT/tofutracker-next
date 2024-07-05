import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Title from '@/app/movie/components/Title'
import { Skeleton } from '@/components/ui/skeleton'
import Backdrop from '@/app/movie/components/Backdrop'
import Poster from '@/app/components/Poster'
import Tagline from '@/app/movie/components/Tagline'
import MovieInfo from '@/app/movie/components/MovieInfo'
import MobileButtons from '@/app/components/MobileButtons'
import Details from '../components/Details'
import Overview from '@/app/movie/components/Overview'
import SeasonsAndEpisodes from '../components/SeasonsAndEpisodes'
import CastAndCrew from '@/app/movie/components/CastAndCrew'
import SimilarTVShows from '../components/SimilarTVShows'
import { redirect } from 'next/navigation'
import Seasons from '../components/Seasons'
import Videos from '@/app/components/Videos'

export const generateMetadata = async ({ params }: Props) => {
  const result = await getTVData(parseInt(params.id.split('-')[0]))
  return {
    title: `${result.name}`,
  }
}

type Props = {
  params: {
    id: string
  }
}

async function getTVData(id: number) {
  const data = await fetch(`http://localhost:8080/api/gettv/${id}`, {
    cache: 'no-store',
  })
  const result = await data.json()
  if (result?.data?.message === 'This is an anime.') {
    redirect(`/anime/${result.data.data.anidb_id}`)
  }
  return result
}

export default async function TVShow({ params }: { params: { id: string } }) {
  const tv = await getTVData(parseInt(params.id))

  const res = await fetch(
    `http://localhost:8080/tvtest/${parseInt(params.id)}`,
    { cache: 'no-store' }
  )
  const tv2 = await res.json()

  const res2 = await fetch(
    `http://localhost:8080/api/gettvsimilar/${parseInt(params.id)}`,
    { cache: 'no-store' }
  )
  const similar = await res2.json()

  return (
    <div className="flex flex-col gap-y-6">
      <Suspense fallback={<Skeleton className="h-[288px] w-full" />}>
        <Backdrop
          backdrop_path={`https://image.tmdb.org/t/p/original${tv2.details.backdrop_path}`}
          title={tv2.details.title}
          logo_path={`https://image.tmdb.org/t/p/w300${tv2.details.logo_path}`}
        />
      </Suspense>
      <div className="mx-auto max-w-[1400px]">
        <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8">
          <div className="flex justify-center">
            <Suspense
              fallback={
                <Skeleton className="mt-2 h-[186px] w-[124px] sm:h-[full] sm:w-full" />
              }
            >
              <Poster
                poster_path={tv2.details.poster_path}
                title={tv2.details.title}
                id={tv2.details.id}
                item_type="tv"
              />
            </Suspense>
          </div>
          <div className="flex max-w-[1100px] basis-4/5 flex-col">
            <div className="flex justify-center sm:justify-between">
              <Suspense fallback={<Skeleton className="mt-6 h-6" />}>
                <Title title={tv2.details.title} />
              </Suspense>
            </div>
            <div className="flex justify-center sm:justify-start">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[24px] w-[80%]" />}
              >
                <Tagline tagline={tv2.details.tagline} />
              </Suspense>
            </div>
            <div className="flex justify-center">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[94px] w-full" />}
              >
                <MovieInfo
                  vote_average={tv2.details.vote_average}
                  release_date={tv2.details.first_air_date.split('-')[0]}
                  language={tv.original_language}
                  certification={tv2.details.content_rating}
                  networks={tv2.details.networks}
                />
              </Suspense>
            </div>
            <div className="mt-6 flex justify-center sm:hidden">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[168px] w-full" />}
              >
                <MobileButtons item_id={tv2.details.id} item_type="tv" />
              </Suspense>
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Details</div>
              <Suspense
                fallback={<Skeleton className="mt-6 h-[253px] w-full" />}
              >
                <Details
                  type={tv2.details.type}
                  status={tv2.details.status}
                  creators={tv2.details.created_by}
                  production_companies={tv2.details.production_companies}
                  seasons={tv2.details.number_of_seasons}
                  episodes={tv2.details.number_of_episodes}
                />
              </Suspense>
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle" id="overview">
                Overview
              </div>

              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <Overview overview={tv2.details.overview} />
              </Suspense>
            </div>

            <div className="mt-6">
              <div className="contentpagedetailtitle" id="seasons">
                Seasons
              </div>

              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <Seasons seasons={tv2.seasons} />
              </Suspense>
            </div>

            <div className="mt-6">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <CastAndCrew cast={tv2.credits.cast} crew={tv2.credits.crew} />
              </Suspense>
            </div>
            <div className="mt-6 pb-6 sm:pb-20">
              <div className="contentpagedetailtitle">Similar TV Shows</div>
              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                {!similar.ok ? (
                  <div>No similar tv shows found</div>
                ) : (
                  <SimilarTVShows similar={similar.data} />
                )}
              </Suspense>
            </div>
            {/* <div className="mt-6 pb-6 sm:pb-20">
              <div className="contentpagedetailtitle">Videos</div>
              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <Videos videos={tv2.videos} />
              </Suspense>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}
