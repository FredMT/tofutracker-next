'use client'
import React from 'react'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'
import { addOrRemoveFromLibrary } from '../movie/components/actions'
import { useFormState } from 'react-dom'
import { Library } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useToast } from '@/components/ui/use-toast'
import { User } from 'lucia'
const initialState = { success: false, message: null }

export default function AddToLibraryButtonHoverCard({
  user,
  item,
  style,
}: {
  user: User | undefined
  item: any
  style?: string
}) {
  const { toast } = useToast()

  const [state, formAction] = useFormState(addOrRemoveFromLibrary, initialState)

  React.useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'success' : 'destructive',
      })
    }
  }, [state, toast])

  return user ? (
    <form action={formAction}>
      <input type="hidden" name="user_id" value={user.id} />
      <input type="hidden" name="media_id" value={item.media_id} />
      <UseFormStatusPendingButton
        text={item.is_in_library ? 'Remove from Library' : 'Add to Library'}
        variant="default"
        style={style}
        component={<Library className="mr-2 size-4" />}
      />
    </form>
  ) : (
    <Button asChild>
      <Link href={`/sign-in`}>
        <Library className="mr-2 size-4" />
        Add to Library
      </Link>
    </Button>
  )
}
