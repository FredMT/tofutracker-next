'use client'
import { Badge } from './ui/badge'
import { format } from 'date-fns'
import { Button } from './ui/button'
import { BookmarkPlus, Library } from 'lucide-react'
import { HoverCardContent, HoverCardPortal } from './ui/hover-card'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'
import { startTransition, useMemo, useOptimistic } from 'react'
import {
  addOrRemoveFromLibrary,
  addOrRemoveFromWatchlist,
} from '@/app/movie/components/actions'
import { User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import Link from 'next/link'

function getSeasonYear(startDate: string) {
  const [year, month] = startDate.split('-').map(Number)
  const seasons = ['Winter', 'Spring', 'Summer', 'Fall']
  const seasonIndex = Math.floor((month - 1) / 3)
  return `${seasons[seasonIndex]} ${year}`
}

export default function MovieCardHoverCard({
  item,
  user,
}: {
  item: any
  user: User | null
}) {
  const [isInLibraryOptimistic, setIsInLibraryOptimistic] = useOptimistic(
    item.isInLibrary,
    (isInLibrary) => {
      return !isInLibrary
    }
  )

  const [isInWatchlistOptimistic, setIsInWatchlistOptimistic] = useOptimistic(
    item.isInWatchlist,
    (isInWatchlist) => {
      return !isInWatchlist
    }
  )

  const regionNamesInEnglish = useMemo(
    () =>
      new Intl.DisplayNames(['en'], {
        type: 'language',
      }),
    []
  )

  async function handleLibrarySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    addOrRemoveFromLibrary(new FormData(event.currentTarget))
    startTransition(() => {
      setIsInLibraryOptimistic(!isInLibraryOptimistic)
    })
  }

  async function handleWatchlistSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault()
    addOrRemoveFromWatchlist(new FormData(event.currentTarget))
    startTransition(() => {
      setIsInWatchlistOptimistic(!isInWatchlistOptimistic)
    })
  }

  return (
    <HoverCardPortal container={document.body}>
      <HoverCardContent
        className="h-[300px] w-[450px] border-0 bg-[#7C3AED] bg-opacity-30 text-opacity-100 backdrop-blur-lg"
        sideOffset={0}
        avoidCollisions={false}
        side="top"
      >
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{item.title}</div>
              {item.origin_country && (
                <div className="flex flex-row items-center justify-center gap-2">
                  {item.origin_country.map((country: string) => (
                    <img
                      key={country}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                      alt={country}
                      className="size-6"
                    />
                  ))}
                </div>
              )}
            </div>
            {item.tagline && (
              <div className="text-sm font-medium">{item.tagline}</div>
            )}
          </div>
          <div className="flex items-center justify-evenly">
            {item.rating && (
              <Badge variant="outline" className="border-[#7C3AED] px-2">
                {item.rating}
              </Badge>
            )}
            <p className="text-sm">
              {item.media_type === 'movie'
                ? format(item.release_date, 'MMMM d, yyyy')
                : item.media_type === 'anime'
                  ? getSeasonYear(item.start_date)
                  : item.year}
            </p>
            {item.runtime && (
              <p className="text-sm">
                {Math.floor(item.runtime / 60)}h {item.runtime % 60}m
              </p>
            )}
            {item.language && (
              <p className="text-sm">
                {regionNamesInEnglish.of(item.language)}
              </p>
            )}
            {item.certification && (
              <p className="text-sm">{item.certification}</p>
            )}
            {item.type && <p className="text-sm">{item.type}</p>}
            {item.episode_count && (
              <p className="text-sm">{item.episode_count} episodes</p>
            )}
          </div>

          {(item.overview || item.description) && (
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Overview</p>
              <p className="line-clamp-3 text-sm">
                {item.overview || item.description}
              </p>
            </div>
          )}

          <div className="flex flex-row justify-center gap-x-2">
            <form onSubmit={handleLibrarySubmit}>
              <input type="hidden" name="user_id" value={user?.id} />
              <input type="hidden" name="item_id" value={item.id} />
              <input type="hidden" name="list_type" value="Library" />
              <input type="hidden" name="item_type" value={item.media_type} />
              <input
                type="hidden"
                name="isInLibrary"
                value={isInLibraryOptimistic?.toString()}
              />

              {user ? (
                <UseFormStatusPendingButton
                  text={
                    isInLibraryOptimistic
                      ? 'Remove from Library'
                      : 'Add to Library'
                  }
                  variant="default"
                  style="basis-1/2 min-w-[200px]"
                  component={<Library className="mr-2 size-4" />}
                />
              ) : (
                <Link href={`/login?from=${item.media_type}/${item.id}`}>
                  <Button>
                    <Library className="mr-2 size-4" />
                    Add to Library
                  </Button>
                </Link>
              )}
            </form>
            <form onSubmit={handleWatchlistSubmit}>
              <input type="hidden" name="user_id" value={user?.id} />
              <input type="hidden" name="item_id" value={item.id} />
              <input type="hidden" name="list_type" value="Watchlist" />
              <input type="hidden" name="item_type" value={item.media_type} />
              <input
                type="hidden"
                name="isInWatchlist"
                value={isInWatchlistOptimistic?.toString()}
              />

              {user ? (
                <UseFormStatusPendingButton
                  text={
                    isInWatchlistOptimistic
                      ? 'Remove from Watchlist'
                      : 'Add to Watchlist'
                  }
                  variant="secondary"
                  style="basis-1/2 min-w-[200px]"
                  component={<BookmarkPlus className="mr-2 size-4" />}
                />
              ) : (
                <Link href={`/login?from=${item.media_type}/${item.id}`}>
                  <Button variant="secondary">
                    <BookmarkPlus className="mr-2 size-4" />
                    Add to Watchlist
                  </Button>
                </Link>
              )}
            </form>
          </div>
        </div>
      </HoverCardContent>
    </HoverCardPortal>
  )
}
