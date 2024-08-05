import React, { Suspense } from 'react'
import Title from '@/app/movie/components/Title'
import { Skeleton } from '@/components/ui/skeleton'
import Backdrop from '@/app/movie/components/Backdrop'
import Poster from '@/app/components/Poster'
import Tagline from '@/app/movie/components/Tagline'
import MovieInfo from '@/app/movie/components/MovieInfo'
import MobileButtons from '@/app/components/MobileButtons'
import Details from '@/app/tv/components/Details'
import Overview from '@/app/movie/components/Overview'
import CastAndCrew from '@/app/movie/components/CastAndCrew'
import SimilarTVShows from '@/app/tv/components/SimilarTVShows'
import { redirect } from 'next/navigation'
import Seasons from '@/app/tv/components/Seasons'
import Videos from '@/app/components/Videos'

// export const generateMetadata = async ({ params }: Props) => {
//   const result = await getTVData(parseInt(params.id.split('-')[0]))
//   return {
//     title: `${result.name}`,
//   }
// }

type Props = {
  params: {
    id: string
  }
}

async function getTVData(id: number) {
  const data = await fetch(`http://localhost:3030/api/tv/${id}`, {
    cache: 'no-store',
    credentials: 'include',
  })
  const result = await data.json()
  return result
}

async function getsimilarmovies(id: number) {
  const data = await fetch(`http://localhost:8080/api/gettvsimilar/${id}`)
  const result = await data.json()
  return result
}

export default async function TVShow({ params }: { params: { id: string } }) {
  const tv = await getTVData(parseInt(params.id))
  const similar = await getsimilarmovies(parseInt(params.id))

  return (
    <div className="flex flex-col gap-y-6">
      <Suspense fallback={<Skeleton className="h-[288px] w-full" />}>
        <Backdrop
          backdrop_path={`https://image.tmdb.org/t/p/original${tv.details.backdrop_path}`}
          title={tv.details.title}
          logo_path={`https://image.tmdb.org/t/p/w300${tv.details.logo_path}`}
        />
      </Suspense>
      <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8 xl:px-40">
        <div className="flex justify-center">
            <Suspense
              fallback={
                <Skeleton className="mb-6 h-[186px] w-[124px] rounded-sm border border-muted object-cover sm:h-[273px] sm:w-[182px] md:h-[336px] md:min-w-[224px]" />
              }
            >
              <Poster
                poster_path={tv.details.poster_path}
                title={tv.details.title}
                itemId={params.id}
              />
            </Suspense>
          </div>
          <div className="flex basis-4/5 flex-col">
            <div className="flex justify-center sm:justify-between">
              <Suspense fallback={<Skeleton className="mt-6 h-6" />}>
                <Title title={tv.details.title} />
              </Suspense>
            </div>
            <div className="flex justify-center sm:justify-start">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[24px] w-[80%]" />}
              >
                <Tagline tagline={tv.details.tagline} />
              </Suspense>
            </div>
            <div className="flex justify-center">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[94px] w-full" />}
              >
                <MovieInfo
                  vote_average={tv.details.vote_average}
                  release_date={tv.details.first_air_date.split('-')[0]}
                  language={tv.details.original_language}
                  certification={tv.details.content_rating}
                  networks={tv.details.networks}
                />
              </Suspense>
            </div>
            <div className="mt-6 flex justify-center sm:hidden">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[168px] w-full" />}
              >
                <MobileButtons itemId={params.id} />
              </Suspense>
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Details</div>
              <Suspense
                fallback={<Skeleton className="mt-6 h-[253px] w-full" />}
              >
                <Details
                  type={tv.details.type}
                  status={tv.details.status}
                  creators={tv.details.created_by}
                  production_companies={tv.details.production_companies}
                  seasons={tv.details.number_of_seasons}
                  episodes={tv.details.number_of_episodes}
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
                <Overview overview={tv.details.overview} />
              </Suspense>
            </div>

            <div className="mt-6">
              <div className="contentpagedetailtitle" id="seasons">
                Seasons
              </div>

              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <Seasons seasons={tv.seasons} />
              </Suspense>
            </div>

            <div className="mt-6">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <CastAndCrew cast={tv.credits.cast} crew={tv.credits.crew} />
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
                <Videos videos={tv.videos} />
              </Suspense>
            </div> */}
          </div>
        </div>
      </div>
  )
}
