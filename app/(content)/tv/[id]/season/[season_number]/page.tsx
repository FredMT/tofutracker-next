import Backdrop from '@/app/(content)/components/movie/Backdrop'
import MovieInfo from '@/app/(content)/components/movie/MovieInfo'
import Overview from '@/app/(content)/components/movie/Overview'
import Tagline from '@/app/(content)/components/movie/Tagline'
import Title from '@/app/(content)/components/movie/Title'
import MobileButtons from '@/app/(content)/components/shared/MobileButtons'
import Poster from '@/app/(content)/components/shared/Poster'
import Details from '@/app/(content)/components/tv/Details'
import Episodes from '@/app/(content)/components/tv/Episodes'

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
      <Backdrop
        backdrop_path={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
        title={data.show_title}
      />
      <div className="mx-auto">
        <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8">
          <div className="flex justify-center">
            <Poster
              poster_path={data.season_poster_path}
              title={data.show_title}
              itemId={params.id.toString() + '2'}
              type="season"
              seasonId={data.season_id}
            />
          </div>
          <div className="flex max-w-[1100px] basis-4/5 flex-col">
            <div className="flex justify-center sm:justify-between">
              <Title
                title={`${data.show_title} - Season ${params.season_number}`}
              />
            </div>
            <div className="flex justify-center sm:justify-start">
              <Tagline tagline={data.show_tagline} />z
            </div>
            <div className="flex justify-center">
              <MovieInfo
                vote_average={data.season_vote_average}
                release_date={data.first_air_date}
                language={data.languages}
                certification={data.content_rating}
                networks={data.networks}
                runtime={data.average_episode_runtime}
                country={data.production_countries}
              />
            </div>
            <div className="mt-6 flex justify-center sm:hidden">
              <MobileButtons
                itemId={params.id.toString() + '2'}
                title={data.show_title}
                type="season"
                seasonId={data.season_id}
              />
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle">Details</div>
              <Details
                type={data.show_type}
                status={data.show_status}
                creators={data.creators}
                production_companies={data.production_companies}
                data={data}
              />
            </div>
            <div className="mt-6">
              <div className="contentpagedetailtitle" id="overview">
                Overview
              </div>

              <Overview overview={data.season_overview} />
            </div>
            <div className="mt-6 pb-[200px]">
              <div className="contentpagedetailtitle" id="overview">
                Episodes
              </div>
              <Episodes
                episodes={data.episodes}
                backdrop_path={data.backdrop_path}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
