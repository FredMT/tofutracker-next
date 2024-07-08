'use client'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '@/components/ui/select'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { format, startOfDay } from 'date-fns'
import { cn } from '@/lib/utils'
import DeleteItemListEditorDialog from './DeleteItemListEditorDialog'

export default function ListEditorDialogContent() {
  const [startDate, setStartDate] = useState<Date | undefined>(new Date())
  const [status, setStatus] = useState<string>('completed')
  const [rate, setRate] = useState<number | null>(null)
  const [finishDate, setFinishDate] = useState<Date | undefined>(new Date())
  const [totalRewatches, setTotalRewatches] = useState<number>(0)

  const pathname = usePathname()
  const isMovie = pathname.split('/')[1] === 'movie'

  const handleRateChange = (value: string) => {
    if (value === 'no-rating') {
      setRate(null)
    } else {
      const newRate = parseInt(value, 10)
      if (newRate >= 1 && newRate <= 10) {
        setRate(newRate)
      }
    }
  }

  const handleTotalRewatchesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = parseInt(event.target.value, 10)
    setTotalRewatches(isNaN(newValue) ? 0 : Math.max(0, newValue))
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <div className="w-full space-y-2 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger id="status" className="max-sm:w-[50vw]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed" className="cursor-pointer">
                Completed
              </SelectItem>
              <SelectItem value="watching" className="cursor-pointer">
                Watching
              </SelectItem>
              <SelectItem value="dropped" className="cursor-pointer">
                Dropped
              </SelectItem>
              <SelectItem value="plan-to-watch" className="cursor-pointer">
                Plan to Watch
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full space-y-2 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
          <Label htmlFor="rate">Rate</Label>
          <Select
            value={rate?.toString() ?? 'no-rating'}
            onValueChange={handleRateChange}
          >
            <SelectTrigger id="rate" className="max-sm:w-[50vw]">
              <SelectValue placeholder="Select a rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-rating" className="cursor-pointer">
                No rating
              </SelectItem>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((rate) => (
                <SelectItem
                  key={rate}
                  value={rate.toString()}
                  className="cursor-pointer"
                >
                  {rate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {!isMovie && (
          <div className="flex w-full flex-col space-y-2 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
            <Label htmlFor="start-date" className="mt-2">
              Start Date
            </Label>
            <Popover modal={true}>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'justify-start text-left font-normal',
                    !startDate && 'text-muted-foreground'
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, 'PPP')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        <div className="flex w-full flex-col space-y-2 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
          <Label htmlFor="finish-date" className="mt-2">
            {isMovie ? 'Watch Date' : 'Finish Date'}
          </Label>
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'justify-start text-left font-normal',
                  !finishDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {finishDate ? (
                  format(finishDate, 'PPP')
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={finishDate}
                onSelect={setFinishDate}
                disabled={(date: Date) => {
                  const today = startOfDay(new Date())
                  const minDate = new Date('1900-01-01')
                  const isAfterToday = date > today
                  const isBeforeMinDate = date < minDate
                  const isBeforeStartDate = startDate
                    ? date < startOfDay(startDate)
                    : false
                  return isAfterToday || isBeforeMinDate || isBeforeStartDate
                }}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full space-y-2 sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]">
          <Label htmlFor="total-rewatches">Total Rewatches</Label>
          <Input
            type="number"
            id="total-rewatches"
            className="max-sm:w-[50vw]"
            placeholder="0"
            value={totalRewatches}
            onChange={handleTotalRewatchesChange}
            min="0"
          />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Label htmlFor="notes">Notes</Label>
        <Input
          id="notes"
          className="max-sm:w-[50vw]"
          placeholder="Enter your notes here"
        />
      </div>

      <div className="flex justify-between">
        <Button className="mt-4 w-fit max-sm:w-[50vw]">Save</Button>
        <DeleteItemListEditorDialog />
      </div>
    </div>
  )
}
