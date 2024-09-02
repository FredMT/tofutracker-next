'use client'
import { User } from 'lucia'
import {
  addToLibrary,
  addToLibraryMovieAnime,
  addToLibraryTv,
  addToLibraryTvAnime,
  addToLibraryTvAnimeSeason,
  addToLibraryTvSeason,
} from './actions'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'

export default function AddToLibraryButton({
  itemId,
  user,
  type,
  seasonId,
}: {
  itemId: string
  user: User
  type: string
  seasonId?: number
}) {
  return (
    <form
      action={
        type === 'movie'
          ? addToLibrary
          : type === 'tv'
            ? addToLibraryTv
            : type === 'season'
              ? addToLibraryTvSeason
              : type === 'animetv'
                ? addToLibraryTvAnime
                : type === 'animetvseason'
                  ? addToLibraryTvAnimeSeason
                  : type === 'animemovie'
                    ? addToLibraryMovieAnime
                    : '#'
      }
    >
      <input type="hidden" name="userId" value={user.id} />
      <input type="hidden" name="mediaId" value={itemId} />
      {type === 'season' ||
        (type === 'animetvseason' && seasonId && (
          <input type="hidden" name="seasonId" value={seasonId} />
        ))}
      <UseFormStatusPendingButton
        style="w-full"
        text="Add to Library"
        variant="default"
      />
    </form>
  )
}
