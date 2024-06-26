'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function addOrRemoveFromLibrary(formData: FormData) {
  const user_id = formData.get('user_id')
  const item_id = formData.get('item_id')
  const list_type = formData.get('list_type')
  const item_type = formData.get('item_type')
  const isInLibrary = formData.get('isInLibrary')

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && isInLibrary === 'true') {
    const { error } = await supabase
      .from('item_lists')
      .delete()
      .eq('user_id', user_id)
      .eq('item_id', item_id)
      .eq('list_type', 'Library')

    if (error) {
      console.error('Failed to remove from library:', error.message)
    }
    revalidatePath(`/${item_type}/${item_id}`)
  } else if (user && isInLibrary === 'false') {
    const { error } = await supabase
      .from('item_lists')
      .insert([{ user_id, item_id, list_type, item_type }])

    if (error) {
      console.error('Failed to add to library:', error.message)
    }
    revalidatePath(`/${item_type}/${item_id}`)
  } else {
    redirect(`/login?from=${item_type}/${item_id}`)
  }
}

export async function addOrRemoveFromWatchlist(formData: FormData) {
  const user_id = formData.get('user_id')
  const item_id = formData.get('item_id')
  const item_type = formData.get('item_type')
  const isInWatchlist = formData.get('isInWatchlist')

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  if (isInWatchlist === 'true') {
    const { error } = await supabase
      .from('item_lists')
      .delete()
      .eq('user_id', user_id)
      .eq('item_id', item_id)
      .eq('item_type', item_type)
      .eq('list_type', 'Watchlist')

    if (error) {
      console.error('Failed to remove from watchlist:', error.message)
    }

    revalidatePath(`/${item_type}/${item_id}`)
    return
  }

  const { error } = await supabase
    .from('item_lists')
    .insert([{ user_id, item_id, list_type: 'Watchlist', item_type }])

  if (error) {
    console.error('Failed to add to watchlist:', error.message)
  }
  revalidatePath(`/${item_type}/${item_id}`)
  return
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
