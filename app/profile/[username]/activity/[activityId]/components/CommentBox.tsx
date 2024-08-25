'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Send } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

interface CommentFormValues {
  comment: string
}

interface CommentBoxProps {
  inputRef: React.RefObject<HTMLInputElement>
}

export default function CommentBox({ inputRef }: CommentBoxProps) {
  const form = useForm<CommentFormValues>({
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit = (data: CommentFormValues) => {
    console.log(data)
    // TODO: Implement comment submission logic
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2 sm:p-2"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  placeholder="Add a comment"
                  {...field}
                  className="rounded-none"
                  ref={inputRef}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </Form>
  )
}
