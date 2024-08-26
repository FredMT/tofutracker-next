import React, { useEffect, useState, useTransition } from 'react'
import { Heart, Reply } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { User } from 'lucia'
import { formatDistanceToNow } from 'date-fns'
import { toggleCommentLike } from './actions'

interface CommentCardProps {
  id: number
  username: string
  createdAt: string
  commentText: string
  avatarUrl: string
  likes: number
  hasLiked: boolean
  onReply: (commentId: number) => void
  isReply?: boolean
  user: User | undefined
}

export default function CommentCard({
  id,
  username,
  createdAt,
  commentText,
  avatarUrl,
  likes,
  hasLiked,
  onReply,
  isReply = false,
  user,
}: CommentCardProps) {
  const router = useRouter()
  const [timeAgo, setTimeAgo] = useState<string>('')
  const [optimisticLikes, setOptimisticLikes] = useState({
    count: likes,
    hasLiked: hasLiked,
  })
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const updateTimeAgo = () => {
      setTimeAgo(formatDistanceToNow(new Date(createdAt), { addSuffix: true }))
    }

    updateTimeAgo()
    const timer = setInterval(updateTimeAgo, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [createdAt])

  const handleLikeClick = () => {
    if (!user) {
      router.push('/sign-in')
      return
    }

    startTransition(() => {
      setOptimisticLikes((prev) => ({
        count: prev.hasLiked ? prev.count - 1 : prev.count + 1,
        hasLiked: !prev.hasLiked,
      }))

      toggleCommentLike(id)
    })
  }

  return (
    <div
      className={`relative flex ${isReply ? 'border-l-2 border-muted-foreground pl-2' : ''}`}
    >
      <div className="basis-10/12">
        <div className="mb-2 flex items-center">
          <Image
            src={avatarUrl}
            alt={`@${username}`}
            width={24}
            height={24}
            className="mr-3 rounded-full md:size-8"
          />
          <div className="flex items-center space-x-2">
            <span className="detail md:text-base">{username}</span>
            <span className="detail text-muted-foreground md:text-sm">
              {timeAgo.replace('about', '')}
            </span>
          </div>
        </div>
        <p className="mb-4">{commentText}</p>
      </div>
      <div className="flex basis-2/12 items-start justify-center space-x-2">
        <div className="flex flex-col items-center">
          <button onClick={() => onReply(id)}>
            <Reply size={20} />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <button onClick={handleLikeClick} disabled={isPending}>
            <Heart
              size={20}
              className={
                optimisticLikes.hasLiked ? 'fill-red-500 text-red-500' : 'none'
              }
            />
          </button>
          <div className="mt-1">
            {optimisticLikes.count > 0 ? optimisticLikes.count : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
