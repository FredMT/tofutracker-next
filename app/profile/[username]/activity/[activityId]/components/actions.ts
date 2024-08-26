'use server'
import { validateRequest } from '@/lib/auth'
import { revalidateTag } from 'next/cache'

export async function toggleLike(activityId: string) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  await fetch(
    `${process.env.BACKEND_BASE_URL}user-media-like/toggle/${activityId}?session_id=${sessionId}`,
    {
      method: 'POST',
    }
  )

  revalidateTag('activity')
}

export async function toggleCommentLike(commentId: number) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}comments/toggle-like?id=${commentId}&session_id=${sessionId}`,
      {
        method: 'POST',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to toggle like')
    }

    revalidateTag('comments')
    return { success: true }
  } catch (error) {
    console.error('Error toggling like:', error)
    return { success: false, message: 'Failed to toggle like' }
  }
}
