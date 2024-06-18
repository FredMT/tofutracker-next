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
import CastAndCrew from '../components/CastAndCrew'
import SimilarTVShows from '../components/SimilarTVShows'
import { redirect } from 'next/navigation'

export const generateMetadata = ({ params }: Props): Metadata => {
  const title = params.id.split('-').slice(1).join(' ').replace(/%20/g, ' ')
  const decoded_title = decodeURIComponent(title)
  return {
    title: `${decoded_title}`,
  }
}

type Props = {
  params: {
    id: string
  }
}

async function getTVData(id: number) {
  const data = await fetch(`http://209.38.190.143:8080/api/gettv/${id}`)
  const result = await data.json()
  if (result?.data?.message === 'This is an anime.') {
    redirect(`/anime/${result.data.data.anidb_id}`)
  }
  return result
}

export default async function TVShow({ params }: { params: { id: string } }) {
  const tv = await getTVData(parseInt(params.id.split('-')[0]))

  let logo_path = ''

  if (tv.images.logos) {
    const highestVotedEnLogo = tv.images.logos.find(
      (logo: { iso_639_1: string }) => logo.iso_639_1 === 'en'
    )

    if (highestVotedEnLogo) {
      logo_path = `https://image.tmdb.org/t/p/original${highestVotedEnLogo.file_path}`
    }

    logo_path = `https://image.tmdb.org/t/p/original${logo_path}`
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Suspense fallback={<Skeleton className="h-[288px] w-full" />}>
        <Backdrop
          backdrop_path={tv.backdrop_path}
          title={tv.name}
          logo_path={logo_path}
        />
      </Suspense>
      <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8 xl:px-10 2xl:px-[168px]">
        <div className="flex justify-center">
          <Suspense
            fallback={
              <Skeleton className="mt-2 h-[186px] w-[124px] sm:h-[full] sm:w-full" />
            }
          >
            <Poster
              poster_path={tv.poster_path}
              title={tv.name}
              id={tv.id}
              item_type="tv"
            />
          </Suspense>
        </div>
        <div className="flex basis-4/5 flex-col">
          <div className="flex justify-center sm:justify-start">
            <Suspense fallback={<Skeleton className="mt-6 h-6 w-[60vw]" />}>
              <Title title={tv.name} />
            </Suspense>
          </div>
          <div className="flex justify-center sm:justify-start">
            <Suspense fallback={<Skeleton className="mt-6 h-[24px] w-[80%]" />}>
              <Tagline tagline={tv.tagline} />
            </Suspense>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<Skeleton className="mt-6 h-[94px] w-full" />}>
              <MovieInfo
                vote_average={tv.vote_average}
                release_date={tv.first_air_date.split('-')[0]}
                runtime={tv.episode_run_time[0]}
                language={tv.original_language}
                certification={tv.content_ratings}
              />
            </Suspense>
          </div>
          <div className="mt-6 flex justify-center sm:hidden">
            <Suspense fallback={<Skeleton className="mt-6 h-[168px] w-full" />}>
              <MobileButtons item_id={tv.id} item_type="tv" />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Details</div>
            <Suspense fallback={<Skeleton className="mt-6 h-[253px] w-full" />}>
              <Details
                type={tv.type}
                status={tv.status}
                creators={tv.created_by}
                production_companies={tv.networks}
                seasons={tv.number_of_seasons}
                episodes={tv.number_of_episodes}
              />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Overview</div>

            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <Overview overview={tv.overview} />
            </Suspense>
          </div>
          <div className="mt-6">
            <SeasonsAndEpisodes />
          </div>
          <div className="mt-6">
            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <CastAndCrew credits={tv.aggregate_credits} />
            </Suspense>
          </div>
          <div className="mt-6 pb-6 sm:pb-20">
            <div className="contentpagedetailtitle">Similar TV Shows</div>
            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <SimilarTVShows similar={tv.recommendations.results} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
