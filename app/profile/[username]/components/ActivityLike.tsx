'use client'

import { startTransition, useOptimistic } from 'react'
import { Heart } from 'lucide-react'
import { likeActivity } from './actions'

export default function ActivityLike({
  hasLiked,
  likes,
  username,
  title,
  activity_id,
  userId,
}: {
  userId: string
  hasLiked: boolean
  likes: number
  username: string
  title: string
  activity_id: string
}) {
  // Using useOptimistic to handle isLiked state optimistically
  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(
    hasLiked,
    (currentIsLiked, action: 'TOGGLE') => {
      return !currentIsLiked // Toggle the current state
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

    await likeActivity({ formData })

    startTransition(() => {
      setOptimisticLikes(optimisticIsLiked ? 'DISLIKE' : 'LIKE')
      setOptimisticIsLiked('TOGGLE')
    })
  }

  return (
    <div className="flex text-sm leading-6 max-md:hidden">
      <div className="flex flex-col">
        <div>{`${username} added ${title} to their Library`}</div>
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
