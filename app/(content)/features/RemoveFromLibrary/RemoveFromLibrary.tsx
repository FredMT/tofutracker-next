'use client'
import { removeFromLibraryAction } from '@/app/(content)/features/RemoveFromLibrary/controller'
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
import { useServerAction } from 'zsa-react'

export type RemoveFromLibraryType =
  | 'movie'
  | 'tv'
  | 'season'
  | 'animetv'
  | 'animemovie'
  | 'animetvseason'

export default function RemoveFromLibrary({
  mediaId,
  type,
  seasonId,
}: {
  mediaId: string
  type: RemoveFromLibraryType
  seasonId?: number
}) {
  const { execute, isPending } = useServerAction(removeFromLibraryAction)
  const { toast } = useToast()

  const handleRemove = async () => {
    const [data, err] = await execute({
      type,
      mediaId,
      seasonId: seasonId?.toString(),
    })

    if (err) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      })
    } else if (data) {
      toast({
        title: 'Success',
        description: 'Removed from library',
        variant: 'success',
      })
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`${type === 'movie' ? 'basis-5/6' : 'w-full'} ${type === 'movie' ? 'rounded-r-none' : 'rounded-br-none rounded-tr-md'} rounded-bl-none rounded-tl-md`}
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
            {type === 'movie' || type === 'animemovie' ? ' movie' : ' show'} and
            all its plays from your library.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
            <Button
              variant="destructive"
              onClick={handleRemove}
              disabled={isPending}
            >
              {isPending ? 'Removing...' : 'Remove'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
