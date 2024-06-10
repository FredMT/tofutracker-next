import { createClient } from '@/utils/supabase/server'
import {
  addOrRemoveFromLibrary,
  addOrRemoveFromWatchlist,
} from '../movie/components/actions'
import AddToLibraryAndRate from '../movie/components/AddToLibraryAndRate'

export default async function MobileButtons({
  item_id,
  item_type,
}: {
  item_id: number
  item_type: string
}) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let isInLibrary = false
  let currentRating = -1
  let isInWatchlist = false

  if (user) {
    const { data, error } = await supabase
      .from('item_lists')
      .select('*')
      .eq('item_id', item_id)
      .eq('user_id', user.id)
    if (error) {
      console.error('Failed to fetch library:', error.message)
    } else {
      data.forEach((item) => {
        if (item.list_type === 'Library') {
          isInLibrary = true
          currentRating = item.rating || -1
        } else if (item.list_type === 'Watchlist') {
          isInWatchlist = true
        }
      })
    }
  }

  return (
    <div className="flex w-full flex-col gap-y-4">
      <AddToLibraryAndRate
        addOrRemoveFromLibrary={addOrRemoveFromLibrary}
        userId={user?.id!}
        itemId={item_id}
        itemType={item_type}
        isInLibrary={isInLibrary}
        currentRating={currentRating}
        isInWatchlist={isInWatchlist}
        addOrRemoveFromWatchlist={addOrRemoveFromWatchlist}
      />
    </div>
  )
}
