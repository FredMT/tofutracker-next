'use server'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { RedirectType, redirect } from 'next/navigation'
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

export const updateUsername = async (state: any, formData: FormData) => {
  const supabase = createClient()
  const newUsername = formData.get('newUsername') as string
  const user_id = formData.get('user_id') as string

  const { data: existingUsername, error: existingUsernameError } =
    await supabase
      .from('profile')
      .select('username')
      .eq('username', newUsername)
      .maybeSingle()

  if (existingUsernameError) {
    return {
      success: false,
      error: existingUsernameError.message,
    }
  }

  const usernameSchema = z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(16, 'Username must not exceed 16 characters')
    .refine(() => existingUsername === null, {
      message: 'Username already exists',
    })

  const result = usernameSchema.safeParse(newUsername)

  if (result.success) {
    const { error: updateUsernameError } = await supabase
      .from('profile')
      .update({ username: newUsername })
      .eq('id', user_id)

    if (updateUsernameError) {
      return {
        success: false,
        error: updateUsernameError.message,
      }
    }

    const { error: updateUsernameUserMetadataError } =
      await supabase.auth.updateUser({
        data: {
          username: newUsername,
        },
      })

    if (updateUsernameUserMetadataError) {
      return {
        success: false,
        error: updateUsernameUserMetadataError.message,
      }
    }

    redirect(`/profile/${newUsername}/settings?success=true`)
  } else {
    return {
      success: false,
      error: result.error.message,
    }
  }
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

export const uploadAvatar = async (formData: FormData) => {
  'use server'
  const supabase = createClient()
  const user_id = formData.get('user_id') as string
  const avatarFile = formData.get('avatarFile') as File
  const username = formData.get('username') as string

  const { error } = await supabase.storage
    .from('avatars')
    .upload(`${user_id}/avatar.png`, avatarFile, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    console.error('Error uploading avatar:', error.message)
    return null
  }

  const { error: updateUserMetadataError } = await supabase.auth.updateUser({
    data: {
      profile_picture: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${user_id}/avatar.png`,
    },
  })

  if (updateUserMetadataError) {
    console.error(
      'Error updating user metadata:',
      updateUserMetadataError.message
    )
    return null
  }

  revalidatePath(`/profile/${username}`)
}

export const updateBannerFromLibraryItems = async (
  state: any,
  formData: FormData
) => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const file_path = formData.get('file_path') as string

  if (user) {
    const username = user.user_metadata.username
    const { error } = await supabase.auth.updateUser({
      data: {
        profile_banner_picture: `https://image.tmdb.org/t/p/w1280${file_path}`,
      },
    })

    if (error) {
      console.error('Error updating banner:', error.message)
      return {
        error: error.message,
      }
    }

    const { error: updateUserProfileBannerPictureError } = await supabase
      .from('profile')
      .update({
        profile_banner_picture: `https://image.tmdb.org/t/p/w1280${file_path}`,
      })
      .eq('id', user.id)

    if (updateUserProfileBannerPictureError) {
      console.error(
        'Error updating user profile banner picture:',
        updateUserProfileBannerPictureError.message
      )
      return {
        error: updateUserProfileBannerPictureError.message,
      }
    }

    revalidatePath(`/profile/${username}`)

    return {
      success: true,
      message: 'Banner updated',
      redirectUrl: `/profile/${username}`,
    }
  }
}
