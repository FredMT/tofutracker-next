import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { getCurrentUser } from '@/lib/session'
import { Season } from '@/types/tv'
import Link from 'next/link'
import AddPlay from './AddPlay'
import AddToLibraryButton from './AddToLibraryButton'
import CheckInButton from './CheckInButton'
import { EpisodeProgress } from './EpisodeProgress'
import { QuickTrack } from './QuickTrack'
import RateButton from './RateButton'
import RemoveFromLibrary from './RemoveFromLibrary'
import WatchRemainingButton from './WatchRemainingButton'
import { WatchStatusSelect } from './WatchStatusSelect'
import { validateRequest } from '@/lib/auth'
import { getAccountByUserId } from '@/data-access/accounts'
import { getProfile } from '@/data-access/profiles'

type EpisodeData = {
  name: string
  id: number
  episode_number: number
  air_date: string
  runtime: string
  overview: string
  still_path: string
}

async function getLibraryData(userId: number, itemId: string) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}user-media/movie/details`,
    {
      next: { tags: ['is-in-library'] },
      cache: 'no-cache',
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id: userId, media_id: itemId }),
    }
  )
  const result = await data.json()
  return result
}

async function getLibraryTvData(userId: number, itemId: string) {
  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}user-media/tv/details?userId=${userId}&showId=${itemId.slice(0, -1)}`,
    {
      next: { tags: ['is-in-library'] },
      cache: 'no-cache',
      credentials: 'include',
      method: 'GET',
    }
  )
  const result = await data.json()
  return result
}

async function getLibraryTvSeasonData(itemId: string, seasonId: number) {
  const session = await validateRequest()
  if (!session.session || !session) return null

  const data = await fetch(
    `${process.env.BACKEND_BASE_URL}user-media/season/details?session_id=${session.session.id}&showId=${itemId}&seasonId=${seasonId}`,
    {
      next: { tags: ['is-in-library'] },
      cache: 'no-cache',
      credentials: 'include',
      method: 'GET',
    }
  )
  const result = await data.json()
  return result
}

export default async function MobileButtons({
  itemId,
  title,
  seasons,
  type,
  seasonId,
}: {
  itemId: string
  title: string
  seasons?: Season[]
  type: string
  seasonId?: number
}) {
  const user = await getCurrentUser()

  const isMovie = type === 'movie'

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

  const library = isMovie
    ? await getLibraryData(user.id, itemId)
    : type === 'season'
      ? await getLibraryTvSeasonData(itemId, seasonId!)
      : await getLibraryTvData(user.id, itemId)

  return (
    <div className="flex w-full flex-col gap-y-2">
      {!library.data ? (
        <AddToLibraryButton
          itemId={itemId}
          user={user}
          type={type}
          seasonId={seasonId}
        />
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
          {!isMovie && (
            <EpisodeProgress
              watched_episodes={library.data.watched_episodes}
              aired_episodes={library.data.aired_episodes}
            />
          )}
        </div>
      )}

      {!isMovie && type !== 'season' && library.data && (
        <QuickTrack
          seasons={seasons!}
          watchedEpisodeIds={library.data.watched_episode_ids}
          showId={itemId}
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
