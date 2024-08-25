import { notFound } from 'next/navigation'
import React from 'react'
import ActivityUserAndRelativeActivityTime from './components/ActivityUserAndRelativeActivityTime'
import PosterAndActivitySummary from './components/PosterAndActivitySummary'
import { Separator } from '@/components/ui/separator'
import CommentsList from './components/CommentsList'
import CommentBox from './components/CommentBox'
import CommentSection from './components/CommentSection'
import { validateRequest } from '@/lib/auth'

async function getActivity(activityId: number) {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}user-media/activity/${activityId}`,
    {
      method: 'GET',
      cache: 'no-store',
      next: { tags: ['activity'] },
    }
  )
  const data = await res.json()
  return data
}

async function getActivityLoggedInUser(activityId: number, sessionId: string) {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}user-media/activity/loggedinuser/with-like-status?activityId=${activityId}&session_id=${sessionId}`,
    {
      method: 'GET',
      cache: 'no-store',
      next: { tags: ['activity'] },
    }
  )
  const data = await res.json()

  return data
}

export default async function ActivityPage({
  params,
}: {
  params: { activityId: string }
}) {
  const session = await validateRequest()
  let success, data

  if (session && session.session) {
    ;({ success, data } = await getActivityLoggedInUser(
      +params.activityId,
      session.session.id
    ))
  } else {
    ;({ success, data } = await getActivity(+params.activityId))
  }

  if (!success) return notFound()

  return (
    <div className="mt-[72px] overflow-y-clip sm:h-[calc(100vh-250px)]">
      <div className="flex h-full px-6 pb-6 max-sm:flex-col sm:flex-row sm:space-x-6">
        <div className="space-y-4 sm:flex-shrink-0">
          <div className="sm:hidden">
            <ActivityUserAndRelativeActivityTime
              image={data.profile.image}
              username={data.profile.username}
              activityTime={data.created_at}
            />
          </div>
          <PosterAndActivitySummary
            posterImage={data.media.poster_path}
            username={data.profile.username}
            title={data.media.title}
            likes={data.like_count}
            hasLiked={data.hasLiked}
            activityId={params.activityId}
            session={session}
          />
          <div className="sm:hidden">
            <CommentSection activityId={params.activityId} />
          </div>
        </div>

        <div className="w-full max-sm:hidden sm:flex sm:flex-col">
          <div className="sticky top-6">
            <ActivityUserAndRelativeActivityTime
              image={data.profile.image}
              username={data.profile.username}
              activityTime={data.created_at}
            />
            <Separator className="my-4 max-sm:hidden" />
          </div>
          <div className="flex-grow overflow-y-auto">
            <CommentSection activityId={params.activityId} />
          </div>
        </div>
      </div>
    </div>
  )
}
