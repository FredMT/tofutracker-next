'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import * as React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { LoadingButton } from '@/components/ui/loader-button'
import { DateTimePicker } from '@/components/ui/datetime-picker'

const FormSchema = z.object({
  datetime: z.date().refine((date) => date <= new Date(), {
    message: 'Date and time cannot be in the future',
  }),
})

const DEFAULT_VALUE = {
  datetime: undefined,
}

interface DatetimePickerFormProps {
  serverAction: (formData: FormData) => void
  userId: string
  mediaId: string
  onSuccess: () => void
}

const DatetimePickerForm: React.FC<DatetimePickerFormProps> = ({
  serverAction,
  userId,
  mediaId,
  onSuccess,
}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    defaultValues: DEFAULT_VALUE,
    resolver: zodResolver(FormSchema),
  })

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const formData = new FormData()
    formData.append('datetime', data.datetime?.toISOString() || '')
    formData.append('userId', userId)
    formData.append('mediaId', mediaId)
    await serverAction(formData)
    onSuccess()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2">
              <FormLabel htmlFor="datetime">Date time</FormLabel>
              <FormControl>
                <DateTimePicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LoadingButton loading={form.formState.isSubmitting} type="submit">
          Submit
        </LoadingButton>
      </form>
    </Form>
  )
}

export default DatetimePickerForm
