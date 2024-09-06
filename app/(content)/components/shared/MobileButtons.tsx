import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getCurrentUser } from '@/lib/session'
import { Season } from '@/types/tv'
import Link from 'next/link'
import {
  getLibraryAnimeData,
  getLibraryAnimeMovieData,
  getLibraryAnimeSeasonData,
  getLibraryData,
  getLibraryTvData,
  getLibraryTvSeasonData,
} from '@/use-cases/user-library'
import AddToLibraryButton, {
  AddToLibraryType,
} from '@/app/(content)/features/AddToLibrary/AddToLibraryButton'
import AddPlay from '@/app/(content)/features/AddPlay/AddPlay'
import CheckInButton from '@/app/(content)/features/CheckIn/CheckInButton'
import { QuickTrack } from '@/app/(content)/features/QuickTrack/QuickTrack'
import RateButton from '@/app/(content)/features/Rate/RateButton'
import WatchRemainingButton from '@/app/(content)/features/WatchRemaining/WatchRemainingButton'
import RemoveFromLibrary from '@/app/(content)/features/RemoveFromLibrary/RemoveFromLibrary'
import { WatchStatusSelect } from '@/app/(content)/features/WatchStatus/WatchStatusSelect'
import { EpisodeProgress } from '@/app/(content)/components/shared/EpisodeProgress'

export default async function MobileButtons({
  itemId,
  title,
  seasons,
  type,
  seasonId,
  isAnime = false,
}: {
  itemId: string
  title: string
  seasons?: Season[]
  type: AddToLibraryType
  seasonId?: number
  isAnime?: boolean
}) {
  const user = await getCurrentUser()

  if (!user) {
    return (
      <div className="flex w-full flex-col gap-y-2">
        <Button className="w-full" asChild>
          <Link href="/sign-in">Add to Library</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/sign-in">Check In</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/sign-in">Rate</Link>
        </Button>
      </div>
    )
  }
  const libraryDataFetchers = {
    movie: () => getLibraryData(user.id, itemId),
    season: () => getLibraryTvSeasonData(itemId, seasonId!),
    animetv: () => getLibraryAnimeData(itemId),
    animetvseason: () => getLibraryAnimeSeasonData(itemId, seasonId!),
    animemovie: () => getLibraryAnimeMovieData(itemId),
    default: () => getLibraryTvData(user.id, itemId),
  }

  const fetchLibraryData =
    libraryDataFetchers[type as keyof typeof libraryDataFetchers] ||
    libraryDataFetchers.default
  const library = await fetchLibraryData()

  const isMovie = type === 'movie'

  return (
    <div className="flex w-full flex-col gap-y-2">
      {!library.data ? (
        <AddToLibraryButton itemId={itemId} type={type} seasonId={seasonId} />
      ) : (
        <div className="flex flex-col">
          <div className="flex w-full">
            <RemoveFromLibrary
              userId={user.id}
              mediaId={itemId}
              isMovie={isMovie}
              type={type}
              seasonId={seasonId}
            />
            {isMovie && <AddPlay userId={user.id} mediaId={itemId} />}
          </div>
          {!isMovie && type !== 'animemovie' && (
            <EpisodeProgress
              watched_episodes={library.data.watched_episodes}
              aired_episodes={library.data.aired_episodes}
            />
          )}
        </div>
      )}

      {!isMovie &&
        type !== 'season' &&
        type !== 'animetvseason' &&
        type !== 'animemovie' &&
        library.data && (
          <QuickTrack
            seasons={seasons!}
            watchedEpisodeIds={library.data.watched_episode_ids}
            showId={itemId}
            isAnime={isAnime ? true : false}
            type={type}
          />
        )}
      {!isMovie &&
        library.data &&
        library.data.watched_episodes < library.data.aired_episodes && (
          <WatchRemainingButton
            userId={user.id}
            mediaId={+itemId}
            type={type}
            seasonId={seasonId}
          />
        )}

      {isMovie && (
        <CheckInButton userId={user.id} mediaId={itemId} data={library.data} />
      )}
      <Separator />

      <RateButton
        userId={user.id}
        mediaId={itemId}
        data={library.data}
        title={title}
        isMovie={isMovie}
        type={type}
        seasonId={seasonId}
      />
      <WatchStatusSelect
        userId={user.id}
        mediaId={itemId}
        data={library.data}
        isMovie={isMovie}
        type={type}
        seasonId={seasonId}
      />
    </div>
  )
}
