'use client'
import { watchRemainingController } from '@/app/(content)/features/WatchRemaining/controller'
import { Button } from '@/components/ui/button'
import { DateTimePicker } from '@/components/ui/datetimepicker'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useToast } from '@/components/ui/use-toast'
import React from 'react'
import { useServerAction } from 'zsa-react'

type WatchRemainingButtonProps = {
  mediaId: number
  type: string
  seasonId?: number
}

export default function WatchRemainingButton({
  mediaId,
  type,
  seasonId,
}: WatchRemainingButtonProps) {
  const { execute, isPending } = useServerAction(watchRemainingController)
  const [selectedDateTime, setSelectedDateTime] = React.useState(new Date())
  const { toast } = useToast()
  const [isOpen, setIsOpen] = React.useState(false)

  const handleWatchRemaining = async (useSelectedDate: boolean) => {
    const datetime = useSelectedDate
      ? selectedDateTime.toISOString()
      : new Date().toISOString()

    try {
      const [data, error] = await execute({
        type,
        mediaId,
        seasonId: seasonId?.toString(),
        datetime,
      })

      if (error) {
        toast({
          title: 'Error',
          description: error.message || 'An error occurred',
          variant: 'destructive',
        })
      }

      if (data) {
        toast({
          title: 'Success',
          description: 'Episodes marked as watched',
          variant: 'success',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'destructive',
      })
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button className="w-full justify-center" variant="outline">
          Watch Remaining
        </Button>
      </PopoverTrigger>
      <PopoverContent className="max-sm: max-h-[var(--radix-popover-content-available-height)] max-sm:w-[var(--radix-popover-trigger-width)]">
        <div className="flex justify-evenly space-x-4 p-4">
          {type !== 'animetv' && type !== 'animetvseason' && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-1/2">
                  Choose date
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="flex w-auto flex-col gap-y-2"
                align="start"
                side="bottom"
              >
                <DateTimePicker onDateTimeChange={setSelectedDateTime} />
                <Button
                  onClick={() => handleWatchRemaining(true)}
                  disabled={isPending}
                >
                  Submit
                </Button>
              </PopoverContent>
            </Popover>
          )}
          <Button
            className="w-1/2 justify-center"
            variant="outline"
            onClick={() => handleWatchRemaining(false)}
            disabled={isPending}
          >
            Now
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
