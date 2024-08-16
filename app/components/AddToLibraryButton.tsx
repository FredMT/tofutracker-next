'use client'
import { useToast } from '@/components/ui/use-toast'
import { User } from 'lucia'
import { useFormState } from 'react-dom'
import { addToLibrary } from './actions'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'

export default function AddToLibraryButton({
  itemId,
  user,
}: {
  itemId: string
  user: User
}) {
  const [state, formAction] = useFormState(addToLibrary, null)
  const { toast } = useToast()

  if (user.id && itemId) {
    return (
      <form action={formAction}>
        <input type="hidden" name="userId" value={user.id} />
        <input type="hidden" name="mediaId" value={itemId} />
        <UseFormStatusPendingButton
          style="w-full"
          text="Add to Library"
          variant="default"
        />
      </form>
    )
  }
}
