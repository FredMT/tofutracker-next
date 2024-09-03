'use client'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { User } from 'lucia'
import { LogIn, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createComment } from '@/app/profile/[username]/activity/[activityId]/components/actions'

interface CommentFormValues {
  comment: string
}

interface CommentBoxProps {
  inputRef: React.RefObject<HTMLInputElement>
  parentId: number | null
  replyToUsername: string | null
  user: User | undefined
  setParentId: React.Dispatch<React.SetStateAction<number | null>>
  setReplyToUsername: React.Dispatch<React.SetStateAction<string | null>>
}

export default function CommentBox({
  inputRef,
  parentId,
  replyToUsername,
  user,
  setParentId,
  setReplyToUsername,
}: CommentBoxProps) {
  const pathname = usePathname()
  const router = useRouter()
  const form = useForm<CommentFormValues>({
    defaultValues: {
      comment: '',
    },
  })

  const [isReplyMode, setIsReplyMode] = useState(false)

  useEffect(() => {
    if (replyToUsername) {
      form.setValue('comment', `@${replyToUsername} `)
      setIsReplyMode(true)
    } else {
      setIsReplyMode(false)
    }
  }, [replyToUsername, form])

  const onSubmit = async (data: CommentFormValues) => {
    if (!user) {
      router.push('/sign-in')
      return
    }

    let commentContent = data.comment

    // Remove the '@username ' prefix if it exists
    if (replyToUsername && commentContent.startsWith(`@${replyToUsername} `)) {
      commentContent = commentContent
        .substring(`@${replyToUsername} `.length)
        .trim()
    }

    // Extract user_media_id from pathname
    const user_media_id = parseInt(pathname.split('/').pop() || '0', 10)

    // Create the base commentData object
    const commentData: {
      content: string
      user_media_id: number
      parent_id?: number
    } = {
      content: commentContent,
      user_media_id: user_media_id,
    }

    // Only add parent_id if it exists and is not null
    if (parentId !== null) {
      commentData.parent_id = parentId
    }

    try {
      const result = await createComment(commentData)
      if (result.success) {
        form.reset()
        setParentId(null)
        setReplyToUsername(null)
        setIsReplyMode(false)
      } else {
        console.error('Failed to create comment:', result.message)
      }
    } catch (error) {
      console.error('Error creating comment:', error)
    }
  }

  const handleInputClick = () => {
    if (!user) {
      router.push('/sign-in')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value
    if (isReplyMode && replyToUsername) {
      const expectedPrefix = `@${replyToUsername} `
      if (!currentValue.startsWith(expectedPrefix)) {
        // User has deleted part of or the entire @username
        setParentId(null)
        setReplyToUsername(null)
        setIsReplyMode(false)

        // Remove the entire @username from the input
        const newValue = currentValue.replace(
          new RegExp(`@${replyToUsername}\\s*`),
          ''
        )
        form.setValue('comment', newValue)
      } else {
        // User is typing after the @username, allow it
        form.setValue('comment', currentValue)
      }
    } else {
      // Normal typing, just update the form value
      form.setValue('comment', currentValue)
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
                      ? parentId
                        ? `Reply to ${replyToUsername}`
                        : 'Add a comment'
                      : 'Sign in to comment'
                  }
                  {...field}
                  className="rounded-none disabled:cursor-not-allowed disabled:opacity-100"
                  ref={inputRef}
                  disabled={!user}
                  onClick={handleInputClick}
                  onChange={handleInputChange}
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
