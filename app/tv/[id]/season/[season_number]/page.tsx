import MobileButtons from '@/app/components/MobileButtons'
import Poster from '@/app/components/Poster'
import Backdrop from '@/app/movie/components/Backdrop'
import MovieInfo from '@/app/movie/components/MovieInfo'
import Overview from '@/app/movie/components/Overview'
import Tagline from '@/app/movie/components/Tagline'
import Title from '@/app/movie/components/Title'
import Details from '@/app/tv/components/Details'
import Episodes from '@/app/tv/components/Episodes'
import { Skeleton } from '@/components/ui/skeleton'
import { Suspense } from 'react'

type Props = {
  params: {
    id: number
    season_number: number
  }
}

async function getTVSeasonData(id: number, season_number: number) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}tv/${id}/season/${season_number}`,
    { cache: 'no-store', credentials: 'include' }
  )
  const result = await data.json()
  return result
}

export default async function TVSeason({ params }: Props) {
  const data = await getTVSeasonData(params.id, params.season_number)

  return (
    <div className="flex flex-col gap-y-6">
      <Suspense fallback={<Skeleton className="h-[288px] w-full" />}>
        <Backdrop
          backdrop_path={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
          title={data.show_title}
        />
      </Suspense>
      <div className="mx-auto">
        <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8">
          <div className="flex justify-center">
            <Suspense
              fallback={
                <Skeleton className="mb-6 h-[186px] w-[124px] rounded-sm border border-muted object-cover sm:h-[273px] sm:w-[182px] md:h-[336px] md:min-w-[224px]" />
              }
            >
              <Poster
                poster_path={data.season_poster_path}
                title={data.show_title}
                itemId={params.id.toString()}
                type="season"
                seasonId={data.season_id}
              />
            </Suspense>
          </div>
          <div className="flex max-w-[1100px] basis-4/5 flex-col">
            <div className="flex justify-center sm:justify-between">
              <Suspense fallback={<Skeleton className="mt-6 h-6" />}>
                <Title
                  title={`${data.show_title} - Season ${params.season_number}`}
                />
              </Suspense>
            </div>
            <div className="flex justify-center sm:justify-start">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[24px] w-[80%]" />}
              >
                <Tagline tagline={data.show_tagline} />
              </Suspense>
            </div>
            <div className="flex justify-center">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[94px] w-full" />}
              >
                <MovieInfo
                  vote_average={data.season_vote_average}
                  release_date={data.first_air_date}
                  language={data.languages}
                  certification={data.content_rating}
                  networks={data.networks}
                  runtime={data.average_episode_runtime}
                  country={data.production_countries}
                />
              </Suspense>
            </div>
            <div className="mt-6 flex justify-center sm:hidden">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[168px] w-full" />}
              >
                <MobileButtons
                  itemId={params.id.toString() + '2'}
                  title={data.show_title}
                  type="season"
                  seasonId={data.season_id}
                />
              </Suspense>
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Details</div>
              <Suspense
                fallback={<Skeleton className="mt-6 h-[253px] w-full" />}
              >
                <Details
                  type={data.show_type}
                  status={data.show_status}
                  creators={data.creators}
                  production_companies={data.production_companies}
                  data={data}
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
                <Overview overview={data.season_overview} />
              </Suspense>
            </div>
            <div className="mt-6 pb-[200px]">
              <div className="contentpagedetailtitle" id="overview">
                Episodes
              </div>

              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <Episodes
                  episodes={data.episodes}
                  backdrop_path={data.backdrop_path}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
