import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import UseFormStatusPendingButton from '@/app/components/UseFormStatusPendingButton'

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
      profile_picture: `${process.env.NEXT_PUBLIC_SUPABASE_URL}storage/v1/object/public/avatars/${user_id}/avatar.png`,
    },
  })

  if (updateUserMetadataError) {
    console.error(
      'Error updating user metadata:',
      updateUserMetadataError.message
    )
    return null
  }

  const { error: updateUserProfileError } = await supabase
    .from('profile')
    .update({
      profile_picture_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}storage/v1/object/public/avatars/${user_id}/avatar.png`,
    })
    .eq('id', user_id)

  if (updateUserProfileError) {
    console.error(
      'Error updating user profile:',
      updateUserProfileError.message
    )
    return null
  }

  revalidatePath(`/profile/${username}/settings`)
}

export default async function UpdateAvatar() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col">
      <div className="text-xl">Update Avatar</div>
      <p className="mb-2 text-sm text-muted-foreground">
        Personalize your profile by updating your avatar!
      </p>
      <div className="flex gap-10">
        <div className="flex-col gap-1">
          <div className="text-sm">Current Avatar</div>
          <Image
            src={user?.user_metadata.profile_picture}
            alt="avatar"
            width={200}
            height={300}
          />
        </div>
      </div>

      <form action={uploadAvatar}>
        <input type="hidden" name="user_id" value={user?.id} />
        <input
          type="hidden"
          name="username"
          value={user?.user_metadata.username}
        />
        <Input
          type="file"
          name="avatarFile"
          className="mb-2 mt-2 w-fit cursor-pointer"
          accept="image/*"
          required
        />
        <UseFormStatusPendingButton text="Update" style="w-20" />
      </form>
    </div>
  )
}
