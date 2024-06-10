'use client'

import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNowStrict, set } from 'date-fns'
import { Reply } from 'lucide-react'
import CommentInputBox from './CommentInputBox'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { useRef, useState } from 'react'
import CommentLikeButton from './CommentLikeButton'

type Comment = {
  id: string
  user_id: string
  username: string
  content: string
  created_at: string
  likes: number
  parent_comment_id: string
  hasLiked: boolean
  activity_id: string
}

type User = {
  id: string
}

export default function CommentList({
  activity_id,
  user,
  username,
  likeComment,
  createComment,
}: {
  activity_id: string
  user: User
  username: string
  likeComment: (data: any) => void
  createComment: (data: any) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [targetUserId, setTargetUserId] = useState<string>('')
  const [parentCommentId, setParentCommentId] = useState<string>('')
  const [targetUsername, setTargetUsername] = useState<string>('')

  const handleClick = (
    target_user_id: string,
    comment_id: string,
    target_username: string
  ) => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
    setTargetUserId('')
    setParentCommentId('')
    setTargetUsername('')
    setTargetUserId(target_user_id)
    setParentCommentId(comment_id)
    setTargetUsername(target_username)
  }
  const {
    data: comments,
    error,
    isLoading,
  } = useSWR(
    `https://tofutracker-3pt5y.ondigitalocean.app/api/comments/${activity_id}${
      user ? `/${user.id}` : ''
    }`,
    fetcher,
    { refreshInterval: 1000 }
  )

  if (error) {
    console.error(error)
    return
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const organizeComments = (comments: Comment[]) => {
    const commentsByParentId: { [key: string]: Comment[] } = {}
    comments.forEach((comment) => {
      const parentId = comment.parent_comment_id || 'root'
      if (!commentsByParentId[parentId]) {
        commentsByParentId[parentId] = []
      }
      commentsByParentId[parentId].push(comment)
    })
    return commentsByParentId
  }

  const renderComments = (
    commentsByParentId: { [key: string]: Comment[] },
    parentId: string
  ) => {
    if (!commentsByParentId[parentId]) {
      return null
    }

    return commentsByParentId[parentId].map((comment) => (
      <div key={comment.id} className="flex flex-col gap-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="text-sm font-medium">{comment.username}</div>
            <div className="text-sm text-muted-foreground">
              {formatDistanceToNowStrict(new Date(comment.created_at))}
            </div>
          </div>
          {user && (
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  handleClick(comment.user_id, comment.id, comment.username)
                }
              >
                <Reply className="size-6" />
              </button>
              <div className="relative">
                <CommentLikeButton
                  comment={comment}
                  likeComment={likeComment}
                />
              </div>
            </div>
          )}
        </div>
        <p className="text-sm">{comment.content}</p>
        <div className="mb-2 ml-4 border-l border-muted-foreground pl-2">
          {renderComments(commentsByParentId, comment.id)}
        </div>
      </div>
    ))
  }

  return (
    <>
      <div className="flex grow flex-col gap-2">
        {comments && renderComments(organizeComments(comments), 'root')}
      </div>
      {user && (
        <CommentInputBox
          ref={inputRef}
          user={user}
          activity_id={activity_id}
          username={username}
          target_user_id={targetUserId}
          parent_comment_id={parentCommentId}
          setTargetUserId={setTargetUserId}
          setParentCommentId={setParentCommentId}
          targetUsername={targetUsername}
          setTargetUsername={setTargetUsername}
          createComment={createComment}
        />
      )}
    </>
  )
}
