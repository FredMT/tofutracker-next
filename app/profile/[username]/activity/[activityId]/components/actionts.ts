'use server'
import { revalidateTag } from 'next/cache'

export async function toggleLike(activityId: string, sessionId: string) {
  await fetch(
    `${process.env.BACKEND_BASE_URL}user-media-like/toggle/${activityId}?session_id=${sessionId}`,
    {
      method: 'POST',
    }
  )

  revalidateTag('activity')
}
