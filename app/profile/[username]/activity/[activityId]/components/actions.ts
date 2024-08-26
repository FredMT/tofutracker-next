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

interface CommentFormData {
  content: string
  user_media_id: number
  parent_id?: number
}

export async function createComment(formData: CommentFormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id

  const requestBody = {
    ...formData,
    session_id: sessionId,
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}comments/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    )

    if (!response.ok) {
      throw new Error('Failed to create comment')
    }

    const result = await response.json()

    revalidateTag('comments')

    return { success: true, data: result }
  } catch (error) {
    console.error('Error creating comment:', error)
    return { success: false, message: 'Failed to create comment' }
  }
}
