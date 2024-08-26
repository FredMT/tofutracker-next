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
  const [replyToUsername, setReplyToUsername] = useState<string | null>(null)

  const handleReply = (commentId: number, username: string) => {
    setReplyToId(commentId)
    setReplyToUsername(username)
    inputRef.current?.focus()
  }

  return (
    <>
      <div className="h-full flex-grow overflow-y-auto">
        <CommentsList
          activityId={activityId}
          onReply={handleReply}
          comments={comments}
          user={user as any}
        />
      </div>
      <div className="sticky bottom-0">
        <CommentBox
          inputRef={inputRef}
          parentId={replyToId}
          replyToUsername={replyToUsername}
          user={user}
          setParentId={setReplyToId}
          setReplyToUsername={setReplyToUsername}
        />
      </div>
    </>
  )
}
