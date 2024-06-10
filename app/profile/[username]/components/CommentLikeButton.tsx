'use client'

import { Heart } from 'lucide-react'
import { startTransition, useState } from 'react'
import { useOptimistic } from 'react' // Ensure you import useOptimistic

type Comment = {
  id: string
  activity_id: string
  user_id: string
  username: string
  content: string
  created_at: string
  likes: number
  parent_comment_id: string
  hasLiked: boolean
}

export default function CommentLikeButton({
  comment,
  likeComment,
}: {
  comment: Comment
  likeComment: (data: any) => void
}) {
  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(
    comment.hasLiked,
    (isLiked) => !isLiked
  )
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    comment.likes,
    (currentLikes, action: 'INCREMENT' | 'DECREMENT') => {
      return action === 'INCREMENT' ? currentLikes + 1 : currentLikes - 1
    }
  )

  const handleLike = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData()
    formData.append('user_id', comment.user_id)
    formData.append('comment_id', comment.id)
    formData.append('username', comment.username)
    formData.append('activity_id', comment.activity_id)

    try {
      likeComment({ formData })

      startTransition(() => {
        setOptimisticIsLiked('TOGGLE')
        setOptimisticLikes(optimisticIsLiked ? 'DECREMENT' : 'INCREMENT')
      })
    } catch (error) {
      console.error('Error submitting like:', error)
    }
  }

  return (
    <form onSubmit={handleLike}>
      <button className="self-baseline" type="submit">
        <Heart
          className={`size-6 ${
            optimisticIsLiked ? 'fill-red-500 text-red-500' : ''
          }`}
        />
        <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 transform text-sm">
          {optimisticLikes}
        </div>
      </button>
    </form>
  )
}
