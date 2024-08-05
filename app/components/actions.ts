'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { start } from 'nprogress'

type State = {
  success: boolean
  error: string | null
}

type UserMediaStatusInput = {
  mediaId: number
  watchStatus:
    | 'COMPLETED'
    | 'PLANTOWATCH'
    | 'WATCHING'
    | 'REWATCHING'
    | 'DROPPED'
  score: number | null
  startDate: string | null
  last_watched_date: string | null
  finishDate: string | null
  totalRewatches: number
  progress: number
}

const supabase = createClient()
export async function addMovieToLibrary(
  prevState: State,
  formData: FormData
): Promise<State> {
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

  // try {
  //   const { data: existingEntry, error: checkError } = await supabase
  //     .from('user_media_status')
  //     .select('id, watch_count')
  //     .eq('user_id', user.id)
  //     .eq('media_id', mediaId)
  //     .single()

  //   if (checkError && checkError.code !== 'PGRST116') {
  //     throw checkError
  //   }

  //   if (existingEntry) {
  //     // Update existing entry
  //     const { error: updateError } = await supabase
  //       .from('user_media_status')
  //       .update({
  //         watch_status: 'COMPLETED',
  //         progress: 100,
  //         watch_count: existingEntry.watch_count + 1,
  //         last_watched_date: now,
  //         finish_date: now,
  //         updated_at: now,
  //       })
  //       .eq('id', existingEntry.id)

  //     if (updateError) throw updateError
  //   } else {
  //     // Insert new entry
  //     const { error: insertError } = await supabase
  //       .from('user_media_status')
  //       .insert({
  //         user_id: user.id,
  //         media_id: mediaId,
  //         watch_status: 'COMPLETED',
  //         progress: 100,
  //         watch_count: 1,
  //         last_watched_date: now,
  //         start_date: now,
  //         finish_date: now,
  //       })

  //     if (insertError) throw insertError
  //   }

  //   revalidateTag('isInLibrary')
  //   return { success: true, error: null }
  // } catch (error) {
  //   console.error('Error adding movie to library:', error)
  //   return { success: false, error: 'Failed to add movie to library' }
  // }
  const url = `http://localhost:3030/api/user-shows/${user.id}/${mediaId}`
  const data = await fetch(
    `http://localhost:3030/api/user-shows/${user.id}/${mediaId}`,
    {
      method: 'POST',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }
  )
  const result = await data.json()

  revalidateTag('isInLibrary')
  return result.message
}

export async function deleteItemFromLibrary(
  prevState: { error?: string; success?: boolean },
  formData: FormData
) {
  const itemId = formData.get('itemId') as string

  if (!itemId) {
    return { error: 'Item ID is required' }
  }

  // Check if the there is a user and if user is authenticated
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    return { error: 'Unauthorized' }
  }

  // Check if the item is in the user's library
  const { data: libraryItem, error: libraryError } = await supabase
    .from('user_media_status')
    .select('id')
    .eq('user_id', user.id)
    .eq('media_id', itemId)
    .single()

  if (libraryError || !libraryItem) {
    return { error: 'Item not found in library' }
  }

  // Delete the item from the user's library
  const { error: deleteError } = await supabase
    .from('user_media_status')
    .delete()
    .eq('user_id', user.id)
    .eq('media_id', itemId)

  if (deleteError) {
    return { error: 'Failed to delete item' }
  }

  revalidateTag('isInLibrary')

  return { success: true }
}

export async function updateUserMediaStatus(
  prevState: any,
  formData: FormData
) {
  const supabase = createClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()
  if (userError || !user) {
    return { error: 'User not authenticated' }
  }

  const now = new Date().toISOString()
  const input: UserMediaStatusInput = {
    mediaId: parseInt(formData.get('mediaId') as string),
    watchStatus: formData.get(
      'watchStatus'
    ) as UserMediaStatusInput['watchStatus'],
    score: formData.get('score')
      ? parseInt(formData.get('score') as string)
      : null,
    startDate: formData.get('startDate') as string | null,
    finishDate: formData.get('finishDate') as string | null,
    totalRewatches: parseInt(formData.get('totalRewatches') as string),
    progress: parseInt(formData.get('progress') as string),
    last_watched_date: null,
  }

  const isMovie = input.mediaId.toString().endsWith('1') // Movie IDs end with 1

  try {
    const { data: existingEntry, error: checkError } = await supabase
      .from('user_media_status')
      .select('id, watch_count, watch_status, progress, last_watched_date')
      .eq('user_id', user.id)
      .eq('media_id', input.mediaId)
      .maybeSingle()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    let updatedProgress = input.progress
    let updatedLastWatchedDate: string | null = existingEntry
      ? existingEntry.last_watched_date
      : null

    const shouldUpdateLastWatchedDate = () => {
      if (!existingEntry) {
        // New entry
        return (
          input.watchStatus === 'COMPLETED' ||
          input.watchStatus === 'REWATCHING'
        )
      } else {
        // Existing entry
        const statusChanged = existingEntry.watch_status !== input.watchStatus
        const rewatchCountIncreased =
          input.totalRewatches > existingEntry.watch_count
        const updatedToCompletedOrRewatching =
          (input.watchStatus === 'COMPLETED' ||
            input.watchStatus === 'REWATCHING') &&
          existingEntry.watch_status !== 'COMPLETED' &&
          existingEntry.watch_status !== 'REWATCHING'
        const switchedBetweenCompletedAndRewatching =
          (input.watchStatus === 'COMPLETED' &&
            existingEntry.watch_status === 'REWATCHING') ||
          (input.watchStatus === 'REWATCHING' &&
            existingEntry.watch_status === 'COMPLETED')

        return (
          rewatchCountIncreased ||
          updatedToCompletedOrRewatching ||
          switchedBetweenCompletedAndRewatching ||
          (!statusChanged &&
            (input.watchStatus === 'COMPLETED' ||
              input.watchStatus === 'REWATCHING') &&
            rewatchCountIncreased)
        )
      }
    }

    if (shouldUpdateLastWatchedDate()) {
      updatedLastWatchedDate = now
    }

    if (existingEntry) {
      if (
        input.watchStatus === 'COMPLETED' ||
        input.watchStatus === 'REWATCHING'
      ) {
        updatedProgress = 100
      } else if (
        input.watchStatus === 'DROPPED' &&
        existingEntry.progress > 0
      ) {
        updatedProgress = existingEntry.progress
      }
    } else {
      if (
        input.watchStatus === 'COMPLETED' ||
        input.watchStatus === 'REWATCHING'
      ) {
        updatedProgress = 100
      }
    }

    const updateData = {
      watch_status: input.watchStatus,
      score: input.score,
      start_date: isMovie ? input.finishDate : input.startDate,
      finish_date: input.finishDate,
      watch_count: input.totalRewatches,
      updated_at: now,
      progress: updatedProgress,
      last_watched_date: updatedLastWatchedDate,
    }

    if (existingEntry) {
      const { error: updateError } = await supabase
        .from('user_media_status')
        .update(updateData)
        .eq('id', existingEntry.id)

      if (updateError) throw updateError
    } else {
      const { error: insertError } = await supabase
        .from('user_media_status')
        .insert({
          user_id: user.id,
          media_id: input.mediaId,
          ...updateData,
          created_at: now,
        })

      if (insertError) throw insertError
    }

    revalidateTag('isInLibrary')

    return { success: true }
  } catch (error) {
    console.error('Error updating user media status:', error)
    return { error: 'Failed to update media status' }
  }
}
