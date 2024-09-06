import Episodes from '@/app/(content)/components/tv/Episodes'
import { Skeleton } from '@/components/ui/skeleton'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import AnimeBackdrop from '@/app/(content)/anime/components/AnimeBackdrop'
import AnimePoster from '@/app/(content)/anime/components/AnimePoster'
import Title from '@/app/(content)/components/movie/Title'
import AnimeInfo from '@/app/(content)/anime/components/AnimeInfo'
import AnimeDetails from '@/app/(content)/anime/components/AnimeDetails'
import Overview from '@/app/(content)/components/movie/Overview'
import RelatedAnime from '@/app/(content)/anime/components/RelatedAnime'
import MobileButtons from '@/app/(content)/components/shared/MobileButtons'

export const generateMetadata = async ({ params }: Props) => {
  const result = await fetch(
    `${process.env.BACKEND_BASE_URL}anime/details/${params.season_id.split('-')[0]}`
  )
  const data = await result.json()
  return {
    title: `${data.anime[0].title}`,
  }
}

type Props = {
  params: {
    season_id: string
    id: string
  }
}

async function getAnimeRelations(id: number) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}anime/relations/${id}`,
    {
      cache: 'no-store',
      credentials: 'include',
    }
  )
  const result = await data.json()
  return result
}

async function getAnimeDetails(id: number) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}anime/details/${id}`,
    {
      cache: 'no-store',
      credentials: 'include',
    }
  )
  const result = await data.json()
  return result
}

async function getAnimeEpisodes(id: number) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}anime/episodes/${id}`,
    {
      cache: 'no-store',
      credentials: 'include',
    }
  )
  const result = await data.json()
  return result
}

async function getAnimeImages(id: number) {
  const url = `${process.env.BACKEND_BASE_URL}anime/images/${id}`
  const data = await fetch(url)
  const result = await data.json()
  return result
}

export default async function Anime({ params }: Props) {
  const data = await getAnimeDetails(+params.season_id)
  const anime = data.anime[0]
  const episodes = await getAnimeEpisodes(+params.season_id)
  const related = await getAnimeRelations(+params.season_id)
  const images = await getAnimeImages(+params.season_id)

  if (data.message === 'Anime not found.') {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-y-6">
      <Suspense fallback={<Skeleton className="h-[70vh] w-full" />}>
        <AnimeBackdrop title={anime.title} id={anime.id} />
      </Suspense>
      <div className="flex basis-1/5 flex-col px-5 sm:flex sm:flex-row sm:gap-x-8 xl:px-40">
        <div className="flex justify-center">
          <Suspense
            fallback={
              <Skeleton className="mt-2 h-[186px] w-[124px] sm:h-[273px] sm:min-w-[182px] md:h-[336px] md:min-w-[224px]" />
            }
          >
            <AnimePoster
              title={anime.title}
              id={+(params.id + '2')}
              poster={anime.poster}
              seasonId={anime.id}
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
                externalLinks={data?.external_links[0]}
                anime={anime}
                creators={data?.creators}
              />
            </Suspense>
          </div>
          <div className="mt-6 flex justify-center sm:hidden">
            <Suspense fallback={<Skeleton className="mt-6 h-[168px] w-full" />}>
              <MobileButtons
                itemId={params.id + '2'}
                title={anime.title}
                type="animetvseason"
                seasonId={anime.id}
              />
            </Suspense>
          </div>
          <div className="mt-6">
            <div className="contentpagedetailtitle">Details</div>
            <Suspense fallback={<Skeleton className="mt-6 h-[430px] w-full" />}>
              <AnimeDetails anime={anime} creators={data?.creators} />
            </Suspense>
          </div>
          {anime?.description && (
            <div className="mt-6">
              <div className="contentpagedetailtitle" id="overview">
                Overview
              </div>

              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <Overview
                  overview={anime.description}
                  next_episode={data?.next_episode}
                  previous_episode={data?.previous_episode}
                />
              </Suspense>
            </div>
          )}

          {Boolean(episodes?.main?.length) && (
            <div className="mt-6">
              <div className="contentpagedetailtitle" id="overview">
                Main Episodes
              </div>

              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <Episodes
                  episodes={episodes.main}
                  backdrop_path={images.data.backdrop}
                />
              </Suspense>
            </div>
          )}

          {Boolean(episodes?.specials?.length) && (
            <div className="mt-6">
              <div className="contentpagedetailtitle" id="overview">
                Special Episodes
              </div>

              <Suspense
                fallback={<Skeleton className="mt-6 h-[300px] w-full" />}
              >
                <Episodes
                  episodes={episodes.specials}
                  backdrop_path={images.data.backdrop}
                />
              </Suspense>
            </div>
          )}

          <div>
            <Suspense fallback={<Skeleton className="mt-6 h-[300px] w-full" />}>
              <RelatedAnime showId={+params.id} related={related} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
