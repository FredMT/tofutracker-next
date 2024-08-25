'use client'
import { Heart, Reply } from 'lucide-react'
import Image from 'next/image'

interface CommentCardProps {
  username: string
  timeAgo: string
  commentText: string
  avatarUrl: string
  likes: number
  onReply: () => void
}

export default function CommentCard({
  username,
  timeAgo,
  commentText,
  avatarUrl,
  likes,
  onReply,
}: CommentCardProps) {
  const reply = true

  return (
    <div
      className={`relative ${reply ? 'border-l-2 border-muted-foreground pl-2' : ''}`}
    >
      <div className="mb-2 flex items-center">
        <Image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
          width={24}
          height={24}
          className="mr-3 rounded-full md:size-8"
        />
        <div className="flex items-center space-x-2">
          <span className="detail md:text-base">{username}</span>
          <span className="detail text-muted-foreground md:text-sm">
            {timeAgo}
          </span>
        </div>
        <div className="absolute right-4 top-1 flex items-center space-x-4">
          <button className="" onClick={onReply}>
            <Reply size={20} />
          </button>
          <button className="">
            <Heart size={20} />
          </button>
        </div>
      </div>
      <p className="mb-4">{commentText}</p>
    </div>
  )
}
