'use client'
import CommentCard from './CommentCard'

interface CommentsListProps {
  activityId: string
  onReply: () => void
}

export default function CommentsList({
  activityId,
  onReply,
}: CommentsListProps) {
  // In a real implementation, you'd fetch comments based on the activityId
  // For now, we'll use dummy data
  const comments = [
    {
      username: 'fulsome_kazoo_35',
      timeAgo: '2h',
      commentText: 'I love this movie',
      avatarUrl: 'https://github.com/shadcn.png',
      likes: 12,
    },
    // Add more dummy comments here
  ]

  return (
    <>
      <div className="h-full pb-[1000px]">
        {[...Array(5)].map((_, i) =>
          comments.map((comment, index) => (
            <CommentCard
              key={`${i}-${index}`}
              username={comment.username}
              timeAgo={comment.timeAgo}
              commentText={comment.commentText}
              avatarUrl={comment.avatarUrl}
              likes={comment.likes}
              onReply={onReply}
            />
          ))
        )}
      </div>
    </>
  )
}
