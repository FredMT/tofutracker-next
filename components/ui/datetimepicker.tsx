'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { format, isSameDay, startOfDay } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
  datetime: z.date({
    required_error: 'Date & time is required!.',
  }),
})

export function DateTimePicker({
  onDateTimeChange,
}: {
  onDateTimeChange: (date: Date) => void
}) {
  const [isOpen, setIsOpen] = React.useState(false)

  const getRoundedCurrentTime = () => {
    const now = new Date()
    const minutes = now.getMinutes()
    const roundedMinutes = Math.floor(minutes / 15) * 15
    now.setMinutes(roundedMinutes, 0, 0)
    return now
  }

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      datetime: getRoundedCurrentTime(),
    },
  })

  React.useEffect(() => {
    onDateTimeChange(form.getValues().datetime)
  }, [form, onDateTimeChange])

  const getLatestAllowedTime = (selectedDate: Date) => {
    const now = new Date()
    if (isSameDay(selectedDate, now)) {
      return getRoundedCurrentTime()
    }
    return new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      23,
      45
    )
  }

  const handleDateTimeChange = (newDateTime: Date) => {
    const latestAllowedTime = getLatestAllowedTime(newDateTime)
    if (newDateTime > latestAllowedTime) {
      newDateTime = latestAllowedTime
    }
    form.setValue('datetime', newDateTime)
    onDateTimeChange(newDateTime)
  }

  const generateTimeOptions = (selectedDate: Date) => {
    const latestAllowedTime = getLatestAllowedTime(selectedDate)
    const options = []
    for (let i = 0; i < 96; i++) {
      const hour = Math.floor(i / 4)
        .toString()
        .padStart(2, '0')
      const minute = ((i % 4) * 15).toString().padStart(2, '0')
      const timeString = `${hour}:${minute}`
      const optionDate = new Date(selectedDate)
      optionDate.setHours(parseInt(hour), parseInt(minute))
      if (optionDate <= latestAllowedTime) {
        options.push(
          <SelectItem key={i} value={timeString}>
            {timeString}
          </SelectItem>
        )
      }
    }
    return options
  }

  return (
    <Form {...form}>
      <form className="space-y-8">
        <div className="flex w-full gap-4">
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Date</FormLabel>
                <Popover open={isOpen} onOpenChange={setIsOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP, HH:mm')
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown"
                      selected={field.value}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          const newDateTime = new Date(selectedDate)
                          newDateTime.setHours(
                            field.value.getHours(),
                            field.value.getMinutes()
                          )
                          handleDateTimeChange(newDateTime)
                          setIsOpen(false)
                        }
                      }}
                      fromYear={1970}
                      toYear={new Date().getFullYear() + 1}
                      disabled={(date) => date > startOfDay(new Date())}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Set your date and time.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="datetime"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Time</FormLabel>
                <FormControl>
                  <Select
                    value={format(field.value, 'HH:mm')}
                    onValueChange={(time) => {
                      const [hours, minutes] = time.split(':')
                      const newDateTime = new Date(field.value)
                      newDateTime.setHours(parseInt(hours), parseInt(minutes))
                      handleDateTimeChange(newDateTime)
                    }}
                  >
                    <SelectTrigger className="w-[120px] font-normal focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <ScrollArea className="h-[15rem]">
                        {generateTimeOptions(field.value)}
                      </ScrollArea>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  )
}
