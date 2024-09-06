'use client'

import {
  cancelCheckInAction,
  checkInAction,
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
import React, { SyntheticEvent } from 'react'
import { useFormState } from 'react-dom'

export default function CheckInButton({
  userId,
  mediaId,
  data,
}: {
  userId: number
  mediaId: string
  data: any
}) {
  const { toast } = useToast()
  const [checkInState, checkInFormAction] = useFormState(checkInAction, null)
  const [cancelCheckInState, cancelCheckInFormAction] = useFormState(
    cancelCheckInAction,
    null
  )

  React.useEffect(() => {
    if (checkInState) {
      toast({
        variant: checkInState.success ? 'success' : 'destructive',
        title: 'Check-in Status',
        description: checkInState.message,
      })
    }
  }, [checkInState, toast])

  React.useEffect(() => {
    if (cancelCheckInState) {
      toast({
        variant: cancelCheckInState.success ? 'success' : 'destructive',
        title: 'Check-in Status',
        description: cancelCheckInState.message,
      })
    }
  }, [cancelCheckInState, toast])

  const handleSubmit = (
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const submitter = event.nativeEvent.submitter as HTMLButtonElement
    const autocomplete = submitter.value === 'false'
    formData.set('autocomplete', autocomplete.toString())
    checkInFormAction(formData)
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
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="mediaId" value={mediaId} />
            <div className="space-y-4">
              <div className="flex justify-end gap-x-4">
                <div className="mt-2 space-x-4">
                  {
                    <Button type="submit" name="autocomplete" value="false">
                      Set as {data ? 'Rewatching' : 'Watching'}
                    </Button>
                  }
                  <Button type="submit" name="autocomplete" value="true">
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
  } else {
    return (
      <form action={cancelCheckInFormAction}>
        <input type="hidden" name="userId" value={userId} />
        <input type="hidden" name="mediaId" value={mediaId} />
        <Button variant="secondary" type="submit" className="w-full">
          Cancel Check-in
        </Button>
      </form>
    )
  }
}
