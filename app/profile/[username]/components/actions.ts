'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export const createComment = async ({ formData }: { formData: FormData }) => {
  const user_id = formData.get('user_id') as string
  const activity_id = formData.get('activity_id') as string
  const comment = formData.get('comment') as string
  const target_user_id = formData.get('target_user_id') as string
  const username = formData.get('username') as string
  const parent_comment_id = formData.get('parent_comment_id') as string
  const supabase = createClient()

  const { error } = await supabase.from('comments').insert({
    user_id,
    activity_id,
    content: comment,
    target_user_id: target_user_id || null,
    parent_comment_id: parent_comment_id || null,
  })

  if (error) {
    console.log(error)
  }
}

export const likeActivity = async ({ formData }: { formData: FormData }) => {
  'use server'
  const supabase = createClient()
  const user_id = formData.get('user_id') as string
  const activity_id = formData.get('activity_id') as string

  const { data: existingLike, error: fetchLikeError } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', user_id)
    .eq('reference_id', activity_id)
    .maybeSingle()

  if (fetchLikeError) {
    console.error(fetchLikeError)
    return { message: 'Error fetching like', error: fetchLikeError }
  }

  if (existingLike) {
    const { error: deleteError } = await supabase
      .from('likes')
      .delete()
      .match({ user_id: user_id, reference_id: activity_id })

    if (deleteError) {
      console.error(deleteError)
      return { message: 'Error deleting like', error: deleteError }
    }
  } else {
    const { error: insertError } = await supabase.from('likes').insert({
      user_id,
      activity_id,
      reference_id: activity_id,
    })

    if (insertError) {
      console.error(insertError)
      return { message: 'Error inserting like', error: insertError }
    }
  }

  revalidateTag('activities')
}

export const likeComment = async ({ formData }: { formData: FormData }) => {
  'use server'
  const supabase = createClient()
  const user_id = formData.get('user_id') as string
  const comment_id = formData.get('comment_id') as string
  const activity_id = formData.get('activity_id') as string
  const username = formData.get('username') as string

  const { data: existingLike, error: fetchLikeError } = await supabase
    .from('likes')
    .select('*')
    .eq('user_id', user_id)
    .eq('reference_id', comment_id)
    .maybeSingle()

  if (fetchLikeError) {
    console.error(fetchLikeError)
    return { message: 'Error fetching like', error: fetchLikeError }
  }

  if (existingLike) {
    const { error: deleteError } = await supabase
      .from('likes')
      .delete()
      .match({ user_id: user_id, reference_id: comment_id })

    if (deleteError) {
      console.error(deleteError)
      return { message: 'Error deleting like', error: deleteError }
    }
  } else {
    const { error: insertError } = await supabase.from('likes').insert({
      user_id,
      reference_id: comment_id,
      activity_id: activity_id,
    })

    if (insertError) {
      console.error(insertError)
      return { message: 'Error inserting like', error: insertError }
    }
  }

  revalidatePath(`/profile/${username}`)
}
