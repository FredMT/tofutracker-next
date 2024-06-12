'use client'

import { startTransition, useOptimistic } from 'react'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import { likeActivity } from './actions'

export default function MobileActivityLike({
  hasLiked,
  likes,
  username,
  title,
  activity_id,
  userId,
  item_type,
  item_id,
}: {
  userId: string
  hasLiked: boolean
  likes: number
  username: string
  title: string
  activity_id: string
  item_type: string
  item_id: number
}) {
  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(
    hasLiked,
    (optimisticIsLiked) => {
      return !optimisticIsLiked
    }
  )

  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (likes, action: 'LIKE' | 'DISLIKE') => {
      if (action === 'LIKE') {
        return likes + 1
      } else {
        return likes - 1
      }
    }
  )

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('user_id', userId)
    formData.append('activity_id', activity_id)

    likeActivity({ formData })

    startTransition(() => {
      setOptimisticLikes(optimisticIsLiked ? 'DISLIKE' : 'LIKE')
      setOptimisticIsLiked(!optimisticIsLiked)
    })
  }

  return (
    <div className="flex justify-between text-sm leading-6">
      <div className="flex">
        <div>
          <Link href={`/profile/${username}`}>
            <span>{username}</span>
          </Link>
          <span> added </span>
          <Link href={`/${item_type}/${item_id}`}>
            <span>{title}</span>
          </Link>
          <span> to their Library</span>
        </div>
        <div className="text-sm text-muted-foreground">
          {optimisticLikes ? `${optimisticLikes} likes` : ''}
        </div>
      </div>

      {userId && (
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <Heart
              className={`size-6 ${
                optimisticIsLiked ? 'fill-red-500 text-red-500' : ''
              }`}
            />
          </button>
        </form>
      )}
    </div>
  )
}
