'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { db } from '@/db'

export async function addOrRemoveFromLibrary(
  prevState: any,
  formData: FormData
) {
  const user_id = formData.get('user_id') as string
  const media_id = formData.get('media_id') as string

  // Check if userMedia row exists
  const existingUserMedia = await db.userMedia.findUnique({
    where: {
      user_id_media_id: {
        user_id: parseInt(user_id),
        media_id: parseInt(media_id + '1'),
      },
    },
  })

  let response
  try {
    if (!existingUserMedia) {
      // Add to library
      response = await fetch('http://localhost:3030/api/user-media/add-movie', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: parseInt(user_id),
          media_id: parseInt(media_id + '1'),
          watch_status: 'COMPLETED',
        }),
      })
    } else {
      // Remove from library
      response = await fetch(
        'http://localhost:3030/api/user-media/delete-movie',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: parseInt(user_id),
            media_id: parseInt(media_id + '1'),
          }),
        }
      )
    }

    const result = await response.json()

    revalidateTag('trending')

    return {
      success: result.success,
      message:
        result.message ||
        (result.success ? 'Operation successful' : 'Operation failed'),
    }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred',
    }
  }
}

export async function setRating(
  rating: number,
  item_id: number,
  item_type: string
) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    const { data: itemIsInLibrary, error: itemIsInLibraryError } =
      await supabase
        .from('item_lists')
        .select('*')
        .eq('user_id', user.id)
        .eq('item_id', item_id)
        .eq('list_type', 'Library')
        .eq('item_type', item_type)
        .maybeSingle()

    if (itemIsInLibraryError) {
      console.error('Failed to set rating:', itemIsInLibraryError.message)
    }

    if (itemIsInLibrary) {
      const { error } = await supabase
        .from('item_lists')
        .update({ rating })
        .eq('user_id', user.id)
        .eq('item_id', item_id)
        .eq('list_type', 'Library')
        .eq('item_type', item_type)

      if (error) {
        console.error('Failed to set rating:', error.message)
      }
    } else {
      const { error } = await supabase.from('item_lists').insert({
        user_id: user.id,
        item_id,
        rating,
        item_type,
        list_type: 'Library',
      })

      if (error) {
        console.error('Failed to set rating:', error.message)
      }
    }

    revalidatePath(`/${item_type}/${item_id}`)
  } else {
    redirect('/login')
  }
}
