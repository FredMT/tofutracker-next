import { Separator } from '@/components/ui/separator'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'
import ActivityUserAndRelativeActivityTime from '@/app/user/[username]/activity/[activityId]/components/ActivityUserAndRelativeActivityTime'
import CommentSection from '@/app/user/[username]/activity/[activityId]/components/CommentSection'
import PosterAndActivitySummary from '@/app/user/[username]/activity/[activityId]/components/PosterAndActivitySummary'
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

async function getActivityLoggedInUser(activityId: number) {
  'use server'
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id

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

async function getComments(activityId: number) {
  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}comments/no-user?user_media_id=${activityId}`,
    {
      method: 'GET',
      cache: 'no-store',
      next: { tags: ['comments'] },
    }
  )
  const result = await res.json()
  return result
}

async function getCommentsLoggedInUser(activityId: number) {
  'use server'
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id

  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}comments/with-user?user_media_id=${activityId}&session_id=${sessionId}`,
    {
      method: 'GET',
      cache: 'no-store',
      next: { tags: ['comments'] },
    }
  )
  const result = await res.json()
  return result
}

export default async function ActivityPage({
  params,
}: {
  params: { activityId: string }
}) {
  const user = await getCurrentUser()
  let success, data, comments

  if (user) {
    try {
      const result = await getActivityLoggedInUser(+params.activityId)
      success = result.success
      data = result.data
      comments = await getCommentsLoggedInUser(+params.activityId)
    } catch (error) {
      console.error('Error fetching activity for logged-in user:', error)
      return notFound()
    }
  } else {
    ;({ success, data } = await getActivity(+params.activityId))
    comments = await getComments(+params.activityId)
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
            user={user}
          />
          <div className="sm:hidden">
            <CommentSection
              activityId={params.activityId}
              comments={comments}
              user={user}
            />
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
            <CommentSection
              activityId={params.activityId}
              comments={comments}
              user={user}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
