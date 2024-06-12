'use client'
import ItemRating from '@/app/components/ItemRating'
import { Button } from '@/components/ui/button'
import { BookmarkPlus, Library } from 'lucide-react'
import { startTransition, useOptimistic } from 'react'
import { addOrRemoveFromLibrary, addOrRemoveFromWatchlist } from './actions'

export default function AddToLibraryAndRate({
  userId,
  itemId,
  itemType,
  isInLibrary,
  isInWatchlist,
  currentRating,
}: {
  userId: string
  itemId: number
  itemType: string
  isInLibrary: boolean
  currentRating: number
  isInWatchlist: boolean
}) {
  const [optimisticIsInLibrary, setOptimisticIsInLibrary] = useOptimistic(
    isInLibrary,
    (isInLibrary) => {
      return !isInLibrary
    }
  )

  const [optimisticIsInWatchlist, setOptimisticIsInWatchlist] = useOptimistic(
    isInWatchlist,
    (isInWatchlist) => {
      return !isInWatchlist
    }
  )

  const [optimisticCurrentRating, setOptimisticCurrentRating] = useOptimistic(
    currentRating,
    (newRating: number) => newRating
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addOrRemoveFromLibrary(new FormData(event.currentTarget))
    startTransition(() => {
      setOptimisticIsInLibrary(!optimisticIsInLibrary)
    })
  }

  const handleWatchlistSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()
    await addOrRemoveFromWatchlist(new FormData(event.currentTarget))
    startTransition(() => {
      setOptimisticIsInWatchlist(!optimisticIsInWatchlist)
    })
  }

  return (
    <>
      <div className="relative w-full">
        <form onSubmit={handleSubmit}>
          <input type="hidden" name="user_id" value={userId} />
          <input type="hidden" name="item_id" value={itemId} />
          <input type="hidden" name="list_type" value="Library" />
          <input type="hidden" name="item_type" value={itemType} />
          <input
            type="hidden"
            name="isInLibrary"
            value={optimisticIsInLibrary.toString()}
          />
          <Button className="flex w-full justify-between" type="submit">
            <div className="flex items-center gap-x-2">
              <Library />
              <span>
                {optimisticIsInLibrary
                  ? 'Remove from Library'
                  : 'Add to Library'}
              </span>
            </div>
          </Button>
        </form>
      </div>

      <ItemRating
        item_id={itemId}
        item_type={itemType}
        optimisticIsInLibrary={optimisticIsInLibrary}
        setOptimisticIsInLibrary={setOptimisticIsInLibrary}
        optimisticCurrentRating={optimisticCurrentRating}
        setOptimisticCurrentRating={setOptimisticCurrentRating}
      />

      <form onSubmit={handleWatchlistSubmit}>
        <input type="hidden" name="user_id" value={userId} />
        <input type="hidden" name="item_id" value={itemId} />
        <input type="hidden" name="item_type" value={itemType} />
        <input
          type="hidden"
          name="isInWatchlist"
          value={optimisticIsInWatchlist.toString()}
        />
        <Button
          variant="secondary"
          className="w-full justify-start"
          type="submit"
        >
          <BookmarkPlus className="mr-2" />{' '}
          {optimisticIsInWatchlist
            ? 'Remove from Watchlist'
            : 'Add to Watchlist'}
        </Button>
      </form>
    </>
  )
}
