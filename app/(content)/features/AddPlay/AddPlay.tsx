'use client'

import { addPlayAction } from '@/app/(content)/features/AddPlay/actions'
import { Button } from '@/components/ui/button'
import DatetimePickerForm from '@/components/ui/datetime-picker-form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { toast } from '@/components/ui/use-toast'
import { Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormState } from 'react-dom'

export default function AddPlay({
  userId,
  mediaId,
}: {
  userId: number
  mediaId: string
}) {
  const [state, formAction] = useFormState(addPlayAction, null)
  const [mainPopoverOpen, setMainPopoverOpen] = useState(false)
  const [datePopoverOpen, setDatePopoverOpen] = useState(false)

  useEffect(() => {
    if (state) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'success' : 'destructive',
      })
      if (state.success) {
        setMainPopoverOpen(false)
        setDatePopoverOpen(false)
      }
    }
  }, [state])

  const handleNowClick = () => {
    const formData = new FormData()
    formData.append('userId', userId.toString())
    formData.append('mediaId', mediaId)
    formAction(formData)
  }

  const handleDatetimeSubmit = (formData: FormData) => {
    formAction(formData)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <Popover open={mainPopoverOpen} onOpenChange={setMainPopoverOpen}>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button className="basis-1/6 rounded-l-none rounded-br-none rounded-tr-md px-2">
                <Plus />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add another play</p>
          </TooltipContent>
          <PopoverContent className="w-auto" align="end">
            <div className="flex flex-col gap-y-2">
              <div className="flex justify-center">
                When did you watch this?
              </div>
              <div className="flex gap-x-2">
                <Popover
                  open={datePopoverOpen}
                  onOpenChange={setDatePopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button>Another time</Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto"
                    align="start"
                    side="bottom"
                  >
                    <DatetimePickerForm
                      serverAction={handleDatetimeSubmit}
                      userId={userId.toString()}
                      mediaId={mediaId}
                      onSuccess={() => {
                        setMainPopoverOpen(false)
                        setDatePopoverOpen(false)
                      }}
                    />
                  </PopoverContent>
                </Popover>
                <Button onClick={handleNowClick}>Now</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  )
}
