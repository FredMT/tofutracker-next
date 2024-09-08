'use client'

import {
  cancelCheckIn,
  checkIn,
} from '@/app/(content)/features/CheckIn/actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { useServerAction } from 'zsa-react'

export default function CheckInButton({
  mediaId,
  data,
}: {
  mediaId: string
  data: any
}) {
  const { toast } = useToast()
  const { execute: checkInAction, isPending: checkInActionIsPending } =
    useServerAction(checkIn)
  const {
    execute: cancelCheckInAction,
    isPending: cancelCheckInActionIsPending,
  } = useServerAction(cancelCheckIn)

  async function handleCheckInSubmit(mediaId: string, autocomplete: boolean) {
    const [data, err] = await checkInAction({ mediaId, autocomplete })

    if (err) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      })
    }

    if (data) {
      toast({
        title: 'Success',
        description: data.message,
        variant: 'success',
      })
    }
  }

  async function handleCancelCheckIn(mediaId: string) {
    const [data, err] = await cancelCheckInAction({ mediaId })

    if (err) {
      toast({
        title: 'Error',
        description: err.message,
        variant: 'destructive',
      })
    }

    if (data) {
      console.log(data)
      toast({
        title: 'Success',
        description: data.message,
        variant: 'success',
      })
    }
  }

  if (!data || !['WATCHING', 'REWATCHING'].includes(data.watch_status)) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="secondary" className="w-full">
            Check In
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Check In</DialogTitle>
            {
              <DialogDescription>
                Would you like to update the status of this movie to
                {data ? ' Rewatching' : ' Watching'} or continue watching
                without any changes?
              </DialogDescription>
            }
            <DialogDescription className="text-xs text-muted-foreground">
              Item will be added to library by default.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex justify-end gap-x-4">
              <div className="mt-2 space-x-4">
                <Button
                  onClick={() => handleCheckInSubmit(mediaId, false)}
                  disabled={checkInActionIsPending}
                >
                  Set as {data ? 'Rewatching' : 'Watching'}
                </Button>
                <Button
                  onClick={() => handleCheckInSubmit(mediaId, true)}
                  disabled={checkInActionIsPending}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <Button
        variant="secondary"
        className="w-full"
        disabled={cancelCheckInActionIsPending || checkInActionIsPending}
        onClick={() => handleCancelCheckIn(mediaId)}
      >
        Cancel Check-in
      </Button>
    )
  }
}
