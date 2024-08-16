'use client'
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
import { Button } from '@/components/ui/button'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'
import { useFormState } from 'react-dom'
import { useToast } from '@/components/ui/use-toast'
import { useEffect } from 'react'
import { removeFromLibrary } from './actions'

export default function RemoveFromLibrary({
  userId,
  mediaId,
}: {
  userId: number
  mediaId: string
}) {
  const [state, formAction] = useFormState(removeFromLibrary, null)
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
          className="basis-5/6 rounded-l-md rounded-r-none"
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
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <form action={formAction}>
            <input type="hidden" name="userId" value={userId.toString()} />
            <input type="hidden" name="mediaId" value={mediaId} />
            <UseFormStatusPendingButton text="Remove" variant="destructive" />
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
