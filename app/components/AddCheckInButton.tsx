'use client'
import React from 'react'
import { Clock1, Ticket } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User } from 'lucia'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const initialState = { success: false, message: null }

export default function AddCheckInButton({
  user,
  item,
}: {
  user: User | undefined
  item: any
}) {
  //   const { toast } = useToast()
  //   const [state, formAction] = useFormState(addOrRemoveFromLibrary, initialState)

  //   React.useEffect(() => {
  //     if (state.message) {
  //       toast({
  //         title: state.success ? 'Success' : 'Error',
  //         description: state.message,
  //         variant: state.success ? 'success' : 'destructive',
  //       })
  //     }
  //   }, [state, toast])

  return user ? (
    <>
      {item.media_type === 'movie' ? (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <Ticket className="mr-2 size-4" />
              {item.watch_status === 'WATCHING' ||
              item.watch_status === 'REWATCHING'
                ? 'Check Out'
                : 'Check In'}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Check In to {item.title}?</AlertDialogTitle>
              <AlertDialogDescription>
                This action will set your watch status to{' '}
                {item.is_in_library ? 'REWATCHING' : 'WATCHING'}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-col gap-1 sm:flex-col">
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex basis-1/2 flex-col gap-1">
                  <AlertDialogAction>Check In</AlertDialogAction>
                  <p className="text-center text-muted-foreground">
                    Just set status
                  </p>
                </div>
                <div className="flex basis-1/2 flex-col gap-1">
                  <AlertDialogAction>Check In and Add</AlertDialogAction>
                  <p className="text-center text-muted-foreground">
                    Set status and automatically mark as Completed after
                  </p>
                  <p className="flex items-center justify-center text-center text-muted-foreground">
                    <Clock1 className="mr-1 h-4 w-4" />
                    {item.runtime ? item.runtime : '2h'}
                  </p>
                </div>
              </div>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        <Button>
          <Ticket className="mr-2 size-4" />
          {item.watch_status === 'WATCHING' ||
          item.watch_status === 'REWATCHING'
            ? 'Check Out'
            : 'Check In'}
        </Button>
      )}
    </>
  ) : (
    <Button asChild>
      <Link href={`/sign-in`}>
        <Ticket className="mr-2 size-4" />
        Check In
      </Link>
    </Button>
  )
}
