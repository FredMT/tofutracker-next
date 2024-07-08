'use server'

import { createClient } from '@/utils/supabase/server'

type State = {
  success: boolean
  error: string | null
}

export async function addMovieToLibrary(
  prevState: State,
  formData: FormData
): Promise<State> {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: 'User not authenticated' }
  }

  const mediaId = formData.get('media_id') as string
  if (!mediaId) {
    return { success: false, error: 'Media ID is required' }
  }

  const now = new Date().toISOString()
  try {
    const { data: existingEntry, error: checkError } = await supabase
      .from('user_media_status')
      .select('id, watch_count')
      .eq('user_id', user.id)
      .eq('media_id', mediaId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    if (existingEntry) {
      // Update existing entry
      const { error: updateError } = await supabase
        .from('user_media_status')
        .update({
          watch_status: 'COMPLETED',
          progress: 100,
          watch_count: existingEntry.watch_count + 1,
          last_watched_date: now,
          finish_date: now,
          updated_at: now,
        })
        .eq('id', existingEntry.id)

      if (updateError) throw updateError
    } else {
      // Insert new entry
      const { error: insertError } = await supabase
        .from('user_media_status')
        .insert({
          user_id: user.id,
          media_id: mediaId,
          watch_status: 'COMPLETED',
          progress: 100,
          watch_count: 1,
          last_watched_date: now,
          start_date: now,
          finish_date: now,
        })

      if (insertError) throw insertError
    }

    return { success: true, error: null }
  } catch (error) {
    console.error('Error adding movie to library:', error)
    return { success: false, error: 'Failed to add movie to library' }
  }
}
