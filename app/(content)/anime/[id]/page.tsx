import React, { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import Details from '@/app/(content)/components/tv/Details'
import { notFound, redirect } from 'next/navigation'
import Seasons from '@/app/(content)/components/tv/Seasons'
// import Videos from '@/app/components/Videos'
import Title from '@/app/(content)/components/movie/Title'
import Tagline from '@/app/(content)/components/movie/Tagline'
import MovieDetails from '@/app/(content)/components/movie/MovieDetails'
import Overview from '@/app/(content)/components/movie/Overview'
import CastAndCrew from '@/app/(content)/components/movie/CastAndCrew'
import RecommendedMovies from '@/app/(content)/components/movie/RecommendedMovies'
import Backdrop from '@/app/(content)/components/movie/Backdrop'
import MovieInfo from '@/app/(content)/components/movie/MovieInfo'
import AnimeSeasons from '@/app/(content)/anime/components/AnimeSeasons'
import MobileButtons from '@/app/(content)/components/shared/MobileButtons'
import Poster from '@/app/(content)/components/shared/Poster'

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
    cache: 'force-cache',
    method: 'GET',
  })
  const result = await data.json()
  if (result.statusCode === 500 || result.statusCode === 404) return notFound()

  return result.type
}

export default async function Anime({ params }: { params: { id: string } }) {
  const type = await getAnimeType(parseInt(params.id))

  if (type === 'movie') {
    const { data: movie } = await getMovieData(parseInt(params.id))
    const recommendedMovies = await getRecommendedMovies(parseInt(params.id))

    return (
      <div className="flex flex-col gap-y-6">
        <Backdrop
          backdrop_path={`https://image.tmdb.org/t/p/original${movie.details.backdrop_path}`}
          title={movie.details.title}
          logo_path={`https://image.tmdb.org/t/p/w300${movie.details.logo_path}`}
        />
        <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8 xl:px-40">
          <div className="flex justify-center">
            <Poster
              poster_path={movie.details.poster_path}
              title={movie.details.title}
              itemId={movie.details.id}
              type="animemovie"
            />
          </div>
          <div className="flex basis-4/5 flex-col">
            <div className="flex justify-center sm:justify-start">
              <Title title={movie.details.title} />
            </div>
            <div className="flex justify-center sm:justify-start">
              <Tagline tagline={movie.details.tagline} />
            </div>
            <div className="flex justify-center">
              <MovieInfo
                vote_average={movie.details.vote_average}
                release_date={movie.details.release_date}
                runtime={movie.details.runtime}
                language={movie.details.original_language}
                certification={movie.details.certification}
              />
            </div>
            <div className="mt-6 flex justify-center sm:hidden">
              <MobileButtons
                itemId={movie.details.id}
                title={movie.details.title}
                type="animemovie"
              />
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Details</div>
              <MovieDetails
                budget={movie.details.budget}
                revenue={movie.details.revenue}
                crew={movie.details.main_staff}
              />
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle" id="overview">
                Overview
              </div>

              <Overview overview={movie.details.overview} />
            </div>
            <div className="mt-6">
              <CastAndCrew
                cast={movie.credits.cast}
                crew={movie.credits.crew}
              />
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Recommended Anime</div>
              {!recommendedMovies ? (
                <p>No recommendations found</p>
              ) : (
                <RecommendedMovies
                  recommended={recommendedMovies}
                  type="anime"
                />
              )}
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
        <Backdrop
          backdrop_path={`https://image.tmdb.org/t/p/original${tv.details.backdrop_path}`}
          title={tv.details.title}
          logo_path={`https://image.tmdb.org/t/p/w300${tv.details.logo_path}`}
        />
        <div className="mx-auto flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8 xl:px-40">
          <div className="flex justify-center">
            <Poster
              poster_path={tv.details.poster_path}
              title={tv.details.title}
              itemId={params.id}
              type="animetv"
              seasons={seasons.main}
              isAnime={true}
            />
          </div>
          <div className="flex max-w-[1100px] basis-4/5 flex-col">
            <div className="flex justify-center sm:justify-between">
              <Title title={tv.details.title} />
            </div>
            <div className="flex justify-center sm:justify-start">
              <Tagline tagline={tv.details.tagline} />
            </div>
            <div className="flex justify-center">
              <MovieInfo
                vote_average={tv.details.vote_average}
                release_date={tv.details.first_air_date.split('-')[0]}
                language={tv.details.original_language}
                certification={tv.details.content_rating}
                networks={tv.details.networks}
              />
            </div>
            <div className="mt-6 flex justify-center sm:hidden">
              <MobileButtons
                itemId={params.id}
                title={tv.details.title}
                type="animetv"
                seasons={seasons.main}
                isAnime={true}
              />
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Details</div>
              <Details
                type={tv.details.type}
                status={tv.details.status}
                creators={tv.details.created_by}
                production_companies={tv.details.production_companies}
                seasons={tv.details.number_of_seasons}
                episodes={tv.details.number_of_episodes}
              />
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle" id="overview">
                Overview
              </div>

              <Overview overview={tv.details.overview} />
            </div>

            <div className="mt-6">
              <div className="contentpagedetailtitle" id="seasons">
                Seasons
              </div>

              <AnimeSeasons data={seasons} showId={params.id} />
            </div>

            <div className="mt-6">
              <CastAndCrew cast={tv.credits.cast} crew={tv.credits.crew} />
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Recommended Anime</div>
              {!recommendedTV ? (
                <p>No recommendations found</p>
              ) : (
                <RecommendedMovies recommended={recommendedTV} type="anime" />
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
