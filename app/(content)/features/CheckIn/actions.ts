'use server'
import { revalidateTag } from 'next/cache'

export async function checkInAction(prevState: any, formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')
  const autocomplete = formData.get('autocomplete') === 'true'

  const response = await fetch(`${process.env.BACKEND_BASE_URL}check-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user_id: userId,
      media_id: mediaId,
      autocomplete: autocomplete,
    }),
  })

  const data = await response.json()
  revalidateTag('is-in-library')
  return data
}

export async function cancelCheckInAction(prevState: any, formData: FormData) {
  const userId = formData.get('userId')
  const mediaId = formData.get('mediaId')

  const res = await fetch(
    `${process.env.BACKEND_BASE_URL}check-in/${userId}/${mediaId}`,
    {
      method: 'DELETE',
      credentials: 'include',
    }
  )

  const data = await res.json()
  revalidateTag('is-in-library')
  return data
}
