import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'

export default function DatePicker({
  label,
  date,
  onDateChange,
  isStartDate,
  isMovie,
  startDate,
}: {
  label: string
  date: Date | undefined
  onDateChange: (date: Date | undefined) => void
  isStartDate: boolean
  isMovie: boolean
  startDate?: Date | undefined
}) {
  return (
    <div className="flex w-full flex-col space-y-2 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
      <Label
        htmlFor={isStartDate ? 'start-date' : 'finish-date'}
        className="mt-2"
      >
        {label}
      </Label>
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant={'outline'}
            className={cn(
              'w-fit justify-start text-left font-normal',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            captionLayout="dropdown-buttons"
            fromYear={1950}
            toYear={new Date().getFullYear()}
            selected={date}
            onSelect={onDateChange}
            disabled={(date: Date) => {
              const isAfterToday = date > new Date()
              const isBeforeMinDate = date < new Date('1900-01-01')
              const isBeforeStartDate =
                !isMovie && !isStartDate && startDate ? date < startDate : false
              return isAfterToday || isBeforeMinDate || isBeforeStartDate
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
