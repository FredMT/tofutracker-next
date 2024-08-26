// CommentSection.tsx
'use client'
import { useRef, useState } from 'react'
import CommentBox from './CommentBox'
import CommentsList from './CommentsList'
import { User } from 'lucia'

type ExtendedUser = User & {
  Profile?: {
    username: string
    image: string
  }
}

export default function CommentSection({
  activityId,
  comments,
  user,
}: {
  activityId: string
  comments?: any
  user: ExtendedUser | undefined
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [replyToId, setReplyToId] = useState<number | null>(null)

  const handleReply = (commentId: number) => {
    setReplyToId(commentId)
    inputRef.current?.focus()
  }

  return (
    <>
      <div className="flex-grow overflow-y-scroll pb-[1000px]">
        <CommentsList
          activityId={activityId}
          onReply={handleReply}
          comments={comments}
          user={user as any}
        />
      </div>
      <div className="sticky bottom-0">
        <CommentBox inputRef={inputRef} replyToId={replyToId} user={user} />
      </div>
    </>
  )
}
