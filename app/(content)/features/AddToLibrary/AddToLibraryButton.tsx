'use client'
import { addToLibraryAction } from '@/app/(content)/features/AddToLibrary/controller'
import UseFormStatusPendingButton from '@/app/components/UseFormStatusPendingButton'
import { useToast } from '@/components/ui/use-toast'
import { useServerAction } from 'zsa-react'

export type AddToLibraryType =
  | 'movie'
  | 'tv'
  | 'season'
  | 'animetv'
  | 'animemovie'
  | 'animetvseason'

export default function AddToLibraryButton({
  itemId,
  type,
  seasonId,
}: {
  itemId: string
  type: AddToLibraryType
  seasonId?: number
}) {
  const { execute, isPending } = useServerAction(addToLibraryAction)
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const [data, err] = await execute({
      type,
      mediaId: itemId,
      seasonId: seasonId?.toString(),
    })

    if (err) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      })
      return
    }

    if (data) {
      toast({
        title: 'Success',
        description: 'Added to library',
        variant: 'success',
      })
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <UseFormStatusPendingButton
        style="w-full"
        text={`${isPending ? 'Adding...' : 'Add to Library'}`}
        variant="default"
        disabled={isPending}
      />
    </form>
  )
}
