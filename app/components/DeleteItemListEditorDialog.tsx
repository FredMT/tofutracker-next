import React from 'react'
import { useFormState } from 'react-dom'
import { usePathname } from 'next/navigation'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'
import { deleteItemFromLibrary } from './actions' // Ensure this path is correct
import { toast } from '@/components/ui/use-toast'

export default function DeleteItemListEditorDialog({
  isInLibrary,
}: {
  isInLibrary: boolean
}) {
  const pathname = usePathname()
  const initialState = { error: undefined, success: false }
  const isMovie = pathname.split('/')[1] === 'movie'
  const [state, formAction] = useFormState(deleteItemFromLibrary, initialState)

  React.useEffect(() => {
    state.error && toast({ title: state.error, variant: 'destructive' })
    state.success &&
      toast({ title: 'Item deleted from library', variant: 'success' })
  }, [state])

  return (
    <form action={formAction}>
      <input
        type="hidden"
        name="itemId"
        value={
          isMovie ? pathname.split('/')[2] + '1' : pathname.split('/')[2] + '2'
        }
      />
      <UseFormStatusPendingButton
        text="Delete item from library"
        style=" w-fit max-sm:w-fit "
        variant="destructive"
        disabled={!isInLibrary}
      />
    </form>
  )
}
