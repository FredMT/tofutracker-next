'use client'
import { useRef } from 'react'
import CommentBox from './CommentBox'
import CommentsList from './CommentsList'

export default function CommentSection({ activityId }: { activityId: string }) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleReply = () => {
    inputRef.current?.focus()
  }

  return (
    <>
      <div className="flex-grow overflow-y-scroll pb-[1000px]">
        <CommentsList activityId={activityId} onReply={handleReply} />
      </div>
      <div className="sticky bottom-0">
        <CommentBox inputRef={inputRef} />
      </div>
    </>
  )
}
