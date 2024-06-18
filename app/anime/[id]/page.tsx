import { Skeleton } from '@/components/ui/skeleton'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import Title from '@/app/movie/components/Title'
import AnimeInfo from '../components/AnimeInfo'
import MobileButtons from '@/app/components/MobileButtons'
import AnimeDetails from '../components/AnimeDetails'
import AnimeBackdrop from '../components/AnimeBackdrop'
import AnimePoster from '../components/AnimePoster'
import Overview from '@/app/movie/components/Overview'
import AnimeSeasonsAndEpisodes from '../components/AnimeSeasonsAndEpisodes'
import SimilarAnime from '../components/SimilarAnime'
import RelatedAnime from '../components/RelatedAnime'

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

export default async function Anime({ params }: Props) {
  const result = await fetch(
    'http://209.38.190.143:8080/api/getanime/' + params.id.split('-')[0]
  )
  const data = await result.json()

  if (data.message === 'Anime not found.') {
    return notFound()
  }

  const anime = data[0].anime[0]

  return (
    <div className="flex flex-col gap-y-6">
      <Suspense
        fallback={<Skeleton className="h-[288px] w-full sm:h-[576px]" />}
      >
        <AnimeBackdrop title={anime.title} type={anime.type} id={anime.id} />
      </Suspense>
      <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8 xl:px-10 2xl:px-[168px]">
        <div className="flex justify-center">
          <Suspense
            fallback={
              <Skeleton className="mt-2 h-[186px] w-[124px] sm:h-[full] sm:min-w-[182px] md:min-w-[224px]" />
            }
          >
            <AnimePoster
              title={anime.title}
              type={anime.type}
              id={anime.id}
              poster={anime.poster}
            />
          </Suspense>
        </div>
        <div className="flex basis-4/5 flex-col">
          <div className="flex justify-center sm:justify-start">
            <Suspense fallback={<Skeleton className="mt-6 h-6 w-[60vw]" />}>
              <Title title={anime.title} />
            </Suspense>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<Skeleton className="mt-6 h-[94px] w-full" />}>
              <AnimeInfo
                externalLinks={data[0]?.external_links[0]}
                anime={anime}
                creators={data[0]?.creators}
              />
            </Suspense>
          </div>
          <div className="mt-6 flex justify-center sm:hidden">
            <Suspense fallback={<Skeleton className="mt-6 h-[168px] w-full" />}>
              <MobileButtons item_id={anime.id} item_type="anime" />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Details</div>
            <Suspense fallback={<Skeleton className="mt-6 h-[253px] w-full" />}>
              <AnimeDetails anime={anime} creators={data[0]?.creators} />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Overview</div>

            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <Overview overview={anime.description} />
            </Suspense>
          </div>
          {anime.type !== 'Movie' && (
            <div className="mt-6">
              <AnimeSeasonsAndEpisodes
                start_date={anime.start_date}
                end_date={anime.end_date}
              />
            </div>
          )}
          <div>
            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <RelatedAnime id={anime.id} />
            </Suspense>
          </div>
          <div className="mt-6 pb-6 sm:pb-20">
            <div className="contentpagedetailtitle">Similar Anime</div>
            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <SimilarAnime type={anime.type} id={anime.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
