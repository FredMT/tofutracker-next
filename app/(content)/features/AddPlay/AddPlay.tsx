'use client'

import { addPlayActionMovie } from '@/app/(content)/features/AddPlay/actions'
import { Button } from '@/components/ui/button'
import { DateTimePicker } from '@/components/ui/datetimepicker'
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
import { Plus } from 'lucide-react'
import React from 'react'
import { useServerAction } from 'zsa-react'

export default function AddPlay({ mediaId }: { mediaId: string }) {
  const [selectedDateTime, setSelectedDateTime] = React.useState(new Date())
  const { execute, isPending } = useServerAction(addPlayActionMovie)
  const handleSubmit = () => {
    execute({
      mediaId,
      datetime: selectedDateTime.toISOString(),
    })
  }
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <Popover>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <Button>Another time</Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto"
                    align="start"
                    side="bottom"
                  >
                    <div className="flex flex-col gap-y-2">
                      <DateTimePicker onDateTimeChange={setSelectedDateTime} />
                      <Button onClick={handleSubmit} disabled={isPending}>
                        Submit
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Button disabled={isPending} onClick={handleSubmit}>
                  Now
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </Tooltip>
    </TooltipProvider>
  )
}
