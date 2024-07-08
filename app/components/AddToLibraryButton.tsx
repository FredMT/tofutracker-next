'use client'
import { Button } from '@/components/ui/button'
import { User } from '@supabase/supabase-js'
import { Library } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useTransition } from 'react'
import UseFormStatusPendingButton from './UseFormStatusPendingButton'
import { addMovieToLibrary } from './actions'
import { useFormState } from 'react-dom'
import { useToast } from '@/components/ui/use-toast'
import useSWR, { useSWRConfig } from 'swr'
import { fetcher } from '@/utils/fetcher'

const initialState = { success: false, error: null }

export default function AddToLibraryButton({ user }: { user: User | null }) {
  const pathname = usePathname()
  const mediaId = pathname.split('/')[2]
  const [state] = useFormState(addMovieToLibrary, initialState)
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  const { mutate } = useSWRConfig()
  const { data, error, isLoading } = useSWR(
    user
      ? `http://localhost:3030/api/users/status/media?userId=${user.id}&mediaId=${mediaId}`
      : null,
    fetcher
  )
  const buttonText = isLoading
    ? 'Loading...'
    : data?.ok && data.data.exists
      ? 'Add another play'
      : 'Add to Library'

  if (error) {
    toast({
      title: 'Error fetching user media status',
      variant: 'destructive',
    })
  }

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Movie added to library',
        variant: 'success',
      })
      // Revalidate the SWR cache
      user &&
        mutate(
          `http://localhost:3030/api/users/status/media?userId=${user.id}&mediaId=${mediaId}`
        )
    } else if (state.error) {
      toast({
        title: 'Movie was not added to library',
        variant: 'destructive',
      })
    }
  }, [state, user, mediaId, mutate, toast])

  const handleAddToLibrary = async (formData: FormData) => {
    startTransition(async () => {
      const result = await addMovieToLibrary(initialState, formData)
      if (result.success) {
        toast({
          title: 'Movie added to library',
          variant: 'success',
        })
        // Revalidate the SWR cache
        user &&
          mutate(
            `http://localhost:3030/api/users/status/media?userId=${user.id}&mediaId=${mediaId}`
          )
      } else if (result.error) {
        toast({
          title: 'Movie was not added to library',
          variant: 'destructive',
        })
      }
    })
  }

  return user ? (
    <form action={handleAddToLibrary} className="w-5/6">
      <input type="hidden" name="media_id" value={mediaId} />
      <UseFormStatusPendingButton
        text={buttonText}
        style="w-full"
        variant="default"
        component={<Library className="mr-2 min-w-4 max-w-4" />}
        disabled={isPending}
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
