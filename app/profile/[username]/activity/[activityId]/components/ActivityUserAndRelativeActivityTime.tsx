import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNowStrict } from 'date-fns'
import React from 'react'

export default async function ActivityUserAndRelativeActivityTime({
  image,
  username,
  activityTime,
}: {
  image: string
  username: string
  activityTime: Date
}) {
  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt={`${username}'s avatar`}
          />
        </Avatar>
        <p>{username}</p>
      </div>
      <p className="text-sm text-gray-500">
        {formatDistanceToNowStrict(new Date(activityTime))} ago
      </p>
    </div>
  )
}
