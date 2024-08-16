import { Button } from '@/components/ui/button'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import AddPlay from './AddPlay'
import AddToLibraryButton from './AddToLibraryButton'
import CheckInButton from './CheckInButton'
import RateButton from './RateButton'
import RemoveFromLibrary from './RemoveFromLibrary'
import { WatchStatusSelect } from './WatchStatusSelect'

async function getLibraryData(userId: number, itemId: string) {
  const data = await fetch(`http://localhost:3030/api/user-media/details`, {
    next: { tags: ['is-in-library'] },
    cache: 'no-cache',
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user_id: userId, media_id: itemId }),
  })
  const result = await data.json()
  return result
}

export default async function MobileButtons({
  itemId,
  title,
}: {
  itemId: string
  title: string
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

  const library = await getLibraryData(user.id, itemId)

  return (
    <div className="flex w-full flex-col gap-y-2">
      {!library.data ? (
        <AddToLibraryButton itemId={itemId} user={user} />
      ) : (
        <div className="flex w-full">
          <RemoveFromLibrary userId={user.id} mediaId={itemId} />
          <AddPlay userId={user.id} mediaId={itemId} />
        </div>
      )}

      <CheckInButton userId={user.id} mediaId={itemId} data={library.data} />

      <RateButton
        userId={user.id}
        mediaId={itemId}
        data={library.data}
        title={title}
      />
      <WatchStatusSelect
        userId={user.id}
        mediaId={itemId}
        data={library.data}
      />
    </div>
  )
}
