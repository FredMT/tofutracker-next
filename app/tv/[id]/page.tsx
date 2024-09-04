import MobileButtons from '@/app/components/MobileButtons'
import Poster from '@/app/components/Poster'
import Backdrop from '@/app/movie/components/Backdrop'
import CastAndCrew from '@/app/movie/components/CastAndCrew'
import MovieInfo from '@/app/movie/components/MovieInfo'
import Overview from '@/app/movie/components/Overview'
import Tagline from '@/app/movie/components/Tagline'
import Title from '@/app/movie/components/Title'
import Details from '@/app/tv/components/Details'
import Seasons from '@/app/tv/components/Seasons'
import { notFound, redirect } from 'next/navigation'
import RecommendedTVShows from '../components/RecommendedTVShows'

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
  const data = await fetch(`${process.env.BACKEND_BASE_URL}tv/${id}`, {
    cache: 'no-store',
    credentials: 'include',
  })
  const result = await data.json()

  if (result.statusCode === 500) return notFound()
  return result
}

async function getRecommendedTvShows(id: number) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}tv/${id}/recommendations`,
    {
      cache: 'no-store',
      credentials: 'include',
    }
  )
  const result = await data.json()
  return result
}

async function checkIfAnime(id: number) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}anime/is-anime/${id}`,
    {
      cache: 'no-cache',
      credentials: 'include',
    }
  )
  const result = await data.json()
  return result
}

export default async function TVShow({ params }: { params: { id: string } }) {
  const { is_anime } = await checkIfAnime(parseInt(params.id))
  if (is_anime) {
    redirect(`/anime/${params.id}`)
  }
  const tv = await getTVData(parseInt(params.id))
  const recommended = await getRecommendedTvShows(parseInt(params.id))

  return (
    <div className="flex flex-col gap-y-6">
      <Backdrop
        backdrop_path={`https://image.tmdb.org/t/p/original${tv.details.backdrop_path}`}
        title={tv.details.title}
        logo_path={`https://image.tmdb.org/t/p/w300${tv.details.logo_path}`}
      />
      <div className="mx-auto">
        <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8 xl:px-40">
          <div className="flex justify-center">
            <Poster
              poster_path={tv.details.poster_path}
              title={tv.details.title}
              seasons={tv.seasons}
              itemId={params.id}
              type="tv"
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
                itemId={params.id + '2'}
                title={tv.details.title}
                seasons={tv.seasons}
                type="tv"
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

              <Seasons seasons={tv.seasons} />
            </div>

            <div className="mt-6">
              <CastAndCrew cast={tv.credits.cast} crew={tv.credits.crew} />
            </div>
            <div className="mt-6 pb-6 sm:pb-20">
              <div className="contentpagedetailtitle">Recommended TV Shows</div>
              {!recommended.success ? (
                <div>No recommended tv shows found</div>
              ) : (
                <RecommendedTVShows recommended={recommended.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
