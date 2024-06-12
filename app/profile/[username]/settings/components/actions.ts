'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

type ActivityPrivacyData = {
  activity_privacy: boolean
}

export const getActivityPrivacySetting = async (
  user_id: string,
  username: string
) => {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('profile')
    .select('activity_is_private')
    .eq('id', user_id)
    .single()

  if (error) {
    console.error(error.message)
    return
  }
  revalidatePath(`/profile/${username}/settings`)
  return data.activity_is_private
}

export const updateActivityPrivacySetting = async (
  data: ActivityPrivacyData,
  user_id: string,
  username: string
) => {
  const supabase = createClient()

  const { error } = await supabase
    .from('profile')
    .update({ activity_is_private: data.activity_privacy })
    .eq('id', user_id)

  if (!error) {
    revalidatePath(`/profile/${username}/settings`)
  }
}

export const updateUsername = async (formData: FormData) => {
  const supabase = createClient()
  const newUsername = formData.get('newUsername')
  const user_id = formData.get('user_id')

  const { error } = await supabase
    .from('profile')
    .update({ username: newUsername })
    .eq('id', user_id)

  if (error) {
    console.error(error.message)
    return false
  }

  redirect(`/profile/${newUsername}/settings`)
}

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')

export const changePassword = async (state: any, formData: FormData) => {
  const newPassword = formData.get('newPassword') as string
  const result = passwordSchema.safeParse(newPassword)

  if (result.success) {
    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } else {
    return {
      success: false,
      error: result.error.message,
    }
  }
}
