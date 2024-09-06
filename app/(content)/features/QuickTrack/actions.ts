'use server'
import { validateRequest } from '@/lib/auth'
import { revalidateTag } from 'next/cache'

export async function quickTrackAction(formData: FormData) {
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const sessionId = session.session.id
  const updates = formData.get('updates')
  const type = formData.get('media_type')
  try {
    const response = await fetch(
      `${process.env.BACKEND_BASE_URL}quick-track/${type === 'animetv' ? 'anime' : 'tv'}?session_id=${sessionId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: updates,
        credentials: 'include',
      }
    )

    const data = await response.json()

    if (data.success) {
      revalidateTag('is-in-library')
      return { success: true, message: 'Show progress updated successfully' }
    } else {
      return {
        success: false,
        message: data.message || 'Failed to update show progress',
      }
    }
  } catch (error) {
    console.error('Error updating show progress:', error)
    return {
      success: false,
      message: 'An error occurred while updating show progress',
    }
  }
}
