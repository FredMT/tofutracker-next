'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useEffect } from 'react'
import { useFormState } from 'react-dom'
import {
  removeFromLibrary,
  removeFromLibraryAnimeMovie,
  removeFromLibraryAnimeSeason,
  removeFromLibraryTv,
  removeFromLibraryTvAnime,
  removeFromLibraryTvSeason,
} from './actions'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'

export default function RemoveFromLibrary({
  userId,
  mediaId,
  isMovie,
  type,
  seasonId,
}: {
  userId: number
  mediaId: string
  isMovie: boolean
  type: string
  seasonId?: number
}) {
  const [state, formAction] = useFormState(
    isMovie
      ? removeFromLibrary
      : type === 'season'
        ? removeFromLibraryTvSeason
        : type === 'animetv'
          ? removeFromLibraryTvAnime
          : type === 'animetvseason'
            ? removeFromLibraryAnimeSeason
            : type === 'animemovie'
              ? removeFromLibraryAnimeMovie
              : removeFromLibraryTv,
    null
  )
  const { toast } = useToast()

  useEffect(() => {
    if (state) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'success' : 'destructive',
      })
    }
  }, [state, toast])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${isMovie ? 'basis-5/6' : 'w-full'} ${isMovie ? 'rounded-r-none' : 'rounded-br-none rounded-tr-md'} rounded-bl-none rounded-tl-md`}
          variant="destructive"
        >
          Remove from Library
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            movie and all its plays from your library.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <form action={formAction}>
              <input type="hidden" name="userId" value={userId} />
              <input type="hidden" name="mediaId" value={mediaId} />
              {type === 'season' ||
                (type === 'animetvseason' && seasonId && (
                  <input type="hidden" name="seasonId" value={seasonId} />
                ))}
              <UseFormStatusPendingButton text="Remove" variant="destructive" />
            </form>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
