'use client'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { validateRequest } from '@/lib/auth'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { Form } from '@/components/ui/form'
import { revalidateTag } from 'next/cache'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Session, User } from 'lucia'
import { toggleLike } from './actionts'

export default function PosterAndActivitySummary({
  posterImage,
  username,
  title,
  likes,
  hasLiked = false,
  activityId,
  session,
}: {
  posterImage: string
  username: string
  title: string
  likes: number
  hasLiked?: boolean
  activityId: string
  session:
    | {
        user: User
        session: Session
      }
    | {
        user: null
        session: null
      }
}) {
  const [isPending, startTransition] = useTransition()
  const form = useForm()

  const onSubmit = () => {
    if (session.session?.id) {
      startTransition(() => toggleLike(activityId, session.session!.id))
    }
  }

  return (
    <div className="sm:sticky sm:top-6">
      <div className="flex w-full flex-col space-y-6 sm:max-w-[300px]">
        <div className="flex h-[350px] min-w-[230px] justify-center sm:justify-start">
          <img
            src={`https://image.tmdb.org/t/p/w500${posterImage}`}
            alt={`Poster of ${title} by ${username}`}
            className="rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col sm:max-w-[300px]">
          <div className="flex w-full space-x-2">
            <div className="basis-10/12">
              {username} added {title} to their library
            </div>
            <div className="flex basis-2/12 items-center justify-center">
              {session.user && session.session?.id ? (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Button
                      type="submit"
                      variant="ghost"
                      className="flex h-4 p-0 hover:bg-transparent"
                      disabled={isPending}
                    >
                      <Heart
                        className={`size-5 ${hasLiked ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </Button>
                  </form>
                </Form>
              ) : (
                <Link href="/sign-in">
                  <Button
                    variant="ghost"
                    className="flex h-4 p-0 hover:bg-transparent"
                  >
                    <Heart className="size-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
          {Boolean(likes) ? (
            <p>
              {likes} {likes > 1 ? 'likes' : 'like'}
            </p>
          ) : null}
          <Separator className="sm:hidden" />
        </div>
      </div>
    </div>
  )
}
