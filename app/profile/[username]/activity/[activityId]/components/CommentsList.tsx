import React from 'react'
import CommentCard from './CommentCard'
import { formatDistanceToNow } from 'date-fns'

interface User {
  id: number
  Profile: {
    username: string
    image: string
  }
}

interface Comment {
  id: number
  content: string | null
  created_at: string
  user_id: number | null
  user_media_id: number
  parent_id: number | null
  user: User | null
  replyingTo: string | null
  _count: {
    likes: number
  }
  hasLiked: boolean
  replies: Comment[]
}

interface Comments {
  success: boolean
  data: Comment[]
}

interface CommentsListProps {
  activityId: string
  comments: Comments
  onReply: (commentId: number, username: string) => void
  user: User | undefined
}

const CommentWithReplies: React.FC<{
  comment: Comment
  onReply: (commentId: number, username: string) => void
  user: User | undefined
}> = ({ comment, onReply, user }) => {
  const flattenReplies = (
    replies: Comment[],
    parentUsername: string | null = null
  ): Comment[] => {
    return replies.flatMap((reply) => {
      const flatReply = { ...reply, replyingTo: parentUsername }
      return [
        flatReply,
        ...flattenReplies(
          reply.replies,
          reply.user?.Profile.username ?? 'Unknown'
        ),
      ]
    })
  }

  const allReplies = flattenReplies(comment.replies)

  return (
    <div className="mb-4">
      <CommentCard
        id={comment.id}
        username={comment.user?.Profile.username ?? 'TTUser'}
        createdAt={comment.created_at}
        commentText={comment.content ?? 'Deleted'}
        avatarUrl={comment.user?.Profile.image ?? '/default-avatar.png'}
        likes={comment._count.likes}
        user_media_id={comment.user_media_id}
        hasLiked={comment.hasLiked}
        onReply={() =>
          onReply(comment.id, comment.user?.Profile.username ?? 'TTUser')
        }
        user={user}
      />
      {allReplies.length > 0 && (
        <div className="ml-8 mt-2 space-y-2">
          {allReplies.map((reply) => (
            <CommentCard
              key={reply.id}
              id={reply.id}
              username={reply.user?.Profile.username ?? 'TTUser'}
              createdAt={comment.created_at}
              commentText={
                reply.replyingTo
                  ? `@${reply.replyingTo} ${reply.content ?? 'Deleted'}`
                  : reply.content ?? 'Deleted'
              }
              avatarUrl={
                reply.user?.Profile.image ?? 'https://github.com/shadcn.png'
              }
              likes={reply._count.likes}
              user_media_id={comment.user_media_id}
              hasLiked={reply.hasLiked}
              onReply={() =>
                onReply(reply.id, reply.user?.Profile.username ?? 'TTUser')
              }
              isReply
              user={user}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default function CommentsList({
  activityId,
  onReply,
  comments,
  user,
}: CommentsListProps) {
  return (
    <div className="space-y-4">
      {comments.data.map((comment) => (
        <CommentWithReplies
          key={comment.id}
          comment={comment}
          onReply={onReply}
          user={user}
        />
      ))}
    </div>
  )
}
