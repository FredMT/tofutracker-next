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
import { notFound, redirect } from 'next/navigation'
import Seasons from '@/app/tv/components/Seasons'
// import Videos from '@/app/components/Videos'
import AnimeSeasons from '@/app/components/AnimeSeasons'
import MovieDetails from '@/app/movie/components/MovieDetails'
import RecommendedMovies from '@/app/movie/components/RecommendedMovies'

// export const generateMetadata = async ({ params }: Props) => {
//   const result = await getTVData(parseInt(params.id.split('-')[0]))
//   return {
//     title: `${result.name}`,
//   }
// }

async function getTVData(id: number) {
  const data = await fetch(`${process.env.BACKEND_BASE_URL}tv/${id}`, {
    cache: 'no-store',
    credentials: 'include',
  })
  const result = await data.json()
  return result
}

async function getAnimeSeasons(tvdb_id: number) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}anime/seasons/${tvdb_id}`,
    {
      cache: 'no-store',
      credentials: 'include',
    }
  )
  const result = await data.json()
  return result
}

async function getMovieData(id: number) {
  const data = await fetch(`${process.env.BACKEND_BASE_URL}movie/${id}`, {
    cache: 'no-cache',
    credentials: 'include',
  })
  const result = await data.json()
  if (result.message === 'Is an anime') {
    redirect(`/anime/${result.data.anidb_id}`)
  }
  return result
}

async function getRecommendedMovies(id: number) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}anime/recommendations/${id}?type=movie`,
    {
      cache: 'no-store',
      credentials: 'include',
    }
  )
  const result = await data.json()
  return result
}

async function getRecommendedTV(id: number) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}anime/recommendations/${id}?type=tv`,
    {
      cache: 'no-store',
      credentials: 'include',
    }
  )
  const result = await data.json()
  return result
}

async function getAnimeType(id: number) {
  const data = await fetch(`${process.env.BACKEND_BASE_URL}anime/type/${id}`, {
    credentials: 'include',
  })
  const result = await data.json()
  if (result.statusCode === 500) return notFound()
  return result.type
}

export default async function Anime({ params }: { params: { id: string } }) {
  const type = await getAnimeType(parseInt(params.id))

  if (type === 'movie') {
    const { data: movie } = await getMovieData(parseInt(params.id))
    const recommendedMovies = await getRecommendedMovies(parseInt(params.id))

    return (
      <div className="flex flex-col gap-y-6">
        <Suspense fallback={<Skeleton className="h-[70vh] w-full" />}>
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
                type="movie"
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
              <Suspense
                fallback={<Skeleton className="mt-6 h-[24px] w-[80%]" />}
              >
                <Tagline tagline={movie.details.tagline} />
              </Suspense>
            </div>
            <div className="flex justify-center">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[94px] w-full" />}
              >
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
              <Suspense
                fallback={<Skeleton className="mt-6 h-[168px] w-full" />}
              >
                <MobileButtons
                  itemId={movie.details.id}
                  title={movie.details.title}
                  type="movie"
                />
              </Suspense>
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Details</div>
              <Suspense
                fallback={<Skeleton className="mt-6 h-[253px] w-full" />}
              >
                <MovieDetails
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

              <Suspense
                fallback={<Skeleton className="mt-6 h-[350px] w-full" />}
              >
                <Overview overview={movie.details.overview} />
              </Suspense>
            </div>
            <div className="mt-6">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <CastAndCrew
                  cast={movie.credits.cast}
                  crew={movie.credits.crew}
                />
              </Suspense>
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Recommended Anime</div>
              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                {!recommendedMovies ? (
                  <p>No recommendations found</p>
                ) : (
                  <RecommendedMovies
                    recommended={recommendedMovies}
                    type="anime"
                  />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    const tv = await getTVData(parseInt(params.id))
    const recommendedTV = await getRecommendedTV(parseInt(params.id))
    const seasons = await getAnimeSeasons(tv.details.tvdb_id)

    return (
      <div className="flex flex-col gap-y-6">
        <Suspense fallback={<Skeleton className="h-[288px] w-full" />}>
          <Backdrop
            backdrop_path={`https://image.tmdb.org/t/p/original${tv.details.backdrop_path}`}
            title={tv.details.title}
            logo_path={`https://image.tmdb.org/t/p/w300${tv.details.logo_path}`}
          />
        </Suspense>
        <div className="mx-auto flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8 xl:px-40">
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
                type="animetv"
                seasons={seasons.main}
                isAnime={true}
              />
            </Suspense>
          </div>
          <div className="flex max-w-[1100px] basis-4/5 flex-col">
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
                <MobileButtons
                  itemId={params.id + '2'}
                  title={tv.details.title}
                  type="animetv"
                  seasons={seasons.main}
                  isAnime={true}
                />
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
                <AnimeSeasons data={seasons} showId={params.id} />
              </Suspense>
            </div>

            <div className="mt-6">
              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <CastAndCrew cast={tv.credits.cast} crew={tv.credits.crew} />
              </Suspense>
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Recommended Anime</div>
              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                {!recommendedTV ? (
                  <p>No recommendations found</p>
                ) : (
                  <RecommendedMovies recommended={recommendedTV} type="anime" />
                )}
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
