import type { Metadata } from 'next'
import { Suspense } from 'react'
import Title from '../components/Title'
import Backdrop from '../components/Backdrop'
import Poster from '../../components/Poster'
import { Skeleton } from '@/components/ui/skeleton'
import Tagline from '../components/Tagline'
import MovieInfo from '../components/MovieInfo'
import MobileButtons from '../../components/MobileButtons'
import Details from '../components/Details'
import Overview from '../components/Overview'
import CastAndCrew from '../components/CastAndCrew'
import SimilarMovies from '../components/SimilarMovies'
import { redirect } from 'next/navigation'

type Props = {
  params: {
    id: string
  }
}

export const generateMetadata = ({ params }: Props): Metadata => {
  const title = params.id.split('-').slice(1).join(' ').replace(/%20/g, ' ')
  const decoded_title = decodeURIComponent(title)
  return {
    title: `${decoded_title}`,
  }
}

async function getMovieData(id: number) {
  const data = await fetch(`http://localhost:8080/api/getmovie/${id}`)
  const result = await data.json()
  if (result.message === 'This is an anime.') {
    redirect(`/anime/${result.data.anidb_id}`)
  }
  return result
}

export default async function Movie({ params }: { params: { id: string } }) {
  const movie = await getMovieData(parseInt(params.id.split('-')[0]))
  const {
    title,
    backdrop_path,
    poster_path,
    tagline,
    credits,
    budget,
    revenue,
    overview,
    similar,
  } = movie
  const highestVotedEnLogo = movie.images.logos.find(
    (logo: { iso_639_1: string }) => logo.iso_639_1 === 'en'
  )
  const selectedLogo = highestVotedEnLogo || movie.images.logos[0]
  const logo_path = `https://image.tmdb.org/t/p/original${selectedLogo.file_path}`
  const certification =
    movie.release_dates.results
      .find((result: any) => result.iso_3166_1 === 'US')
      .release_dates.map((release: any) => {
        if (release.certification) {
          return release.certification
        }
        return ''
      })[0] || ''

  const crew = credits.crew
  const similarMovies = similar.results

  return (
    <div className="flex flex-col gap-y-6">
      <Suspense
        fallback={<Skeleton className="h-[288px] w-full sm:h-[576px]" />}
      >
        <Backdrop
          backdrop_path={backdrop_path}
          title={title}
          logo_path={logo_path}
        />
      </Suspense>
      <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8 xl:px-10 2xl:px-[168px]">
        <div className="flex justify-center">
          <Suspense
            fallback={
              <Skeleton className="mt-2 h-[186px] w-[124px] sm:h-[273px] sm:w-[182px] md:h-[336px] md:w-[224px]" />
            }
          >
            <Poster
              poster_path={poster_path}
              title={title}
              id={movie.id}
              item_type="movie"
            />
          </Suspense>
        </div>
        <div className="flex basis-4/5 flex-col">
          <div className="flex justify-center sm:justify-start">
            <Suspense fallback={<Skeleton className="mt-6 h-6 w-[60vw]" />}>
              <Title title={title} />
            </Suspense>
          </div>
          <div className="flex justify-center sm:justify-start">
            <Suspense fallback={<Skeleton className="mt-6 h-[24px] w-[80%]" />}>
              <Tagline tagline={tagline} />
            </Suspense>
          </div>
          <div className="flex justify-center">
            <Suspense fallback={<Skeleton className="mt-6 h-[94px] w-full" />}>
              <MovieInfo
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                runtime={movie.runtime}
                language={movie.original_language}
                certification={certification}
              />
            </Suspense>
          </div>
          <div className="mt-6 flex justify-center sm:hidden">
            <Suspense fallback={<Skeleton className="mt-6 h-[168px] w-full" />}>
              <MobileButtons item_id={movie.id} item_type="movie" />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Details</div>
            <Suspense fallback={<Skeleton className="mt-6 h-[253px] w-full" />}>
              <Details crew={crew} budget={budget} revenue={revenue} />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle" id="overview">
              Overview
            </div>

            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <Overview overview={overview} />
            </Suspense>
          </div>
          <div className="mt-6">
            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <CastAndCrew credits={credits} />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Similar Movies</div>
            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <SimilarMovies similar={similarMovies} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
