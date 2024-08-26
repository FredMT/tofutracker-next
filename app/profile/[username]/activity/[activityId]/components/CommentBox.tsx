// CommentBox.tsx
'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { User } from 'lucia'
import { LogIn, Send } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface CommentFormValues {
  comment: string
}

interface CommentBoxProps {
  inputRef: React.RefObject<HTMLInputElement>
  replyToId: number | null
  user: User | undefined
}

export default function CommentBox({
  inputRef,
  replyToId,
  user,
}: CommentBoxProps) {
  const router = useRouter()
  const form = useForm<CommentFormValues>({
    defaultValues: {
      comment: '',
    },
  })

  const onSubmit = (data: CommentFormValues) => {
    if (!user) {
      router.push('/sign-in')
      return
    }
    console.log({ ...data, replyToId })
    // TODO: Implement comment submission logic
    form.reset()
  }

  const handleInputClick = () => {
    if (!user) {
      router.push('/sign-in')
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center space-x-2"
      >
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="flex-grow">
              <FormControl>
                <Input
                  placeholder={
                    user
                      ? replyToId
                        ? 'Reply to comment'
                        : 'Add a comment'
                      : 'Sign in to comment'
                  }
                  {...field}
                  className="rounded-none disabled:cursor-not-allowed disabled:opacity-100"
                  ref={inputRef}
                  disabled={!user}
                  onClick={handleInputClick}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {user ? (
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        ) : (
          <Button type="submit" size="icon" asChild>
            <Link href={'/sign-in'}>
              <LogIn className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </form>
    </Form>
  )
}
