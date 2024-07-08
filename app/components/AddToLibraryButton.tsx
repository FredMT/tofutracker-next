'use client'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import { Library } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'
import { addMovieToLibrary } from './actions'
import { useFormState } from 'react-dom'
import { useToast } from '@/components/ui/use-toast'

export default function AddToLibraryButton({ user }: { user: User | null }) {
  const pathname = usePathname()
  const mediaId = pathname.split('/')[2]
  const initialState = { success: false, error: null }
  const [state, formAction] = useFormState(addMovieToLibrary, initialState)
  const { toast } = useToast()

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Movie added to library',
        variant: 'success',
      })
    } else if (state.error) {
      toast({
        title: 'Movie was not added to library',
        variant: 'destructive',
      })
    }
  }, [state])

  return user ? (
    <form action={formAction} className="w-5/6">
      <input type="hidden" name="media_id" value={mediaId} />
      <UseFormStatusPendingButton
        text="Add to Library"
        style="w-full"
        variant="default"
        component={<Library className="mr-2 min-w-4 max-w-4" />}
      />
    </form>
  ) : (
    <Button className="w-5/6" asChild>
      <Link
        href={`/login?from=${pathname.split('/')[1]}/${pathname.split('/')[2]}`}
      >
        <Library className="mr-2 min-w-4 max-w-4" /> Add to Library
      </Link>
    </Button>
  )
}
