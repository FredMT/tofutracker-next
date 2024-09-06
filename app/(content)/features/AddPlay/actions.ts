'use server'
import { validateRequest } from '@/lib/auth'
import { revalidateTag } from 'next/cache'

export async function addPlayAction(prevState: any, formData: FormData) {
  const datetime = formData.get('datetime')
  const session = await validateRequest()
  if (!session || !session.session) {
    return { success: false, message: 'Unauthorized' }
  }

  const mediaId = formData.get('mediaId')
  let watchDate = new Date().toISOString()

  if (datetime) {
    watchDate = new Date(datetime as string).toISOString()
  }

  try {
    const res = await fetch(
      `${process.env.BACKEND_BASE_URL}user-media/movies/add-play?session_id=${session.session.id}&mediaId=${mediaId}&watchDate=${watchDate}`,
      {
        method: 'POST',
      }
    )

    const data = await res.json()

    revalidateTag('user-media')

    return { success: data.success, message: data.message }
  } catch (error) {
    console.error('Error adding play:', error)
    return {
      success: false,
      message: 'An error occurred while adding a play for this movie',
    }
  }
}
