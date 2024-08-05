'use client'
import React from 'react'
import { useFormState } from 'react-dom'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Library } from 'lucide-react'
import Link from 'next/link'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'
import { addMovieToLibrary } from './actions' // Ensure this path is correct
import { toast } from '@/components/ui/use-toast'
import { UserOrNull } from '@/types/commonTypes'

export default function AddToLibraryButton({
  user,
  isInLibrary,
}: {
  user: UserOrNull
  isInLibrary: boolean
}) {
  const pathname = usePathname()
  const initialState = { success: false, error: null }
  const isMovie = pathname.split('/')[1] === 'movie'
  const [state, formAction] = useFormState(addMovieToLibrary, initialState)

  React.useEffect(() => {
    if (state.error) {
      toast({ title: state.error, variant: 'destructive' })
    } else if (state.success) {
      toast({ title: 'Movie added to library', variant: 'success' })
    }
  }, [state])

  if (!user) {
    return (
      <Button className="w-full" asChild>
        <Link
          href={`/login?from=${pathname.split('/')[1]}/${pathname.split('/')[2]}`}
        >
          <Library className="mr-2 size-6" /> Add to Library
        </Link>
      </Button>
    )
  }

  return (
    <form action={formAction} className="w-full sm:w-5/6">
      <input
        type="hidden"
        name="media_id"
        value={isMovie ? pathname.split('/')[2] + '1' : pathname.split('/')[2]}
      />
      <UseFormStatusPendingButton
        text={`${isInLibrary ? 'Add another play' : 'Add to Library'} `}
        style="w-full"
        variant="default"
        component={<Library className="mr-2 min-w-6 max-w-6 sm:mr-1" />}
      />
    </form>
  )
}
