'use client'
import { User } from 'lucia'
import { addToLibrary, addToLibraryTv, addToLibraryTvSeason } from './actions'
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
          : type === 'season'
            ? addToLibraryTvSeason
            : addToLibraryTv
      }
    >
      <input type="hidden" name="userId" value={user.id} />
      <input type="hidden" name="mediaId" value={itemId} />
      {type === 'season' && seasonId && (
        <input type="hidden" name="seasonId" value={seasonId} />
      )}
      <UseFormStatusPendingButton
        style="w-full"
        text="Add to Library"
        variant="default"
      />
    </form>
  )
}
