import { Input } from '@/components/ui/input'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import UseFormStatusPendingButton from '@/app/components/UseFormStatusPendingButton'

import { z } from 'zod'
import DeleteBanner from './DeleteBanner'
import Image from 'next/image'

export const updateBanner = async (formData: FormData) => {
  'use server'
  const supabase = createClient()
  const user_id = formData.get('user_id') as string
  const bannerFile = formData.get('bannerFile') as File
  const username = formData.get('username') as string

  const id = crypto.randomUUID()

  const fileSchema = z.object({
    size: z
      .number()
      .max(5 * 1024 * 1024, 'File size must be less than or equal to 5MB'),
    type: z
      .string()
      .regex(
        /(jpg|jpeg|png|webp)$/,
        'File type must be jpg, jpeg, png, or webp'
      ),
  })

  const validationResult = fileSchema.safeParse({
    size: bannerFile.size,
    type: bannerFile.type,
  })

  if (!validationResult.success) {
    console.error(
      'Validation error:',
      JSON.stringify(validationResult.error.errors[0].message)
    )
    return null
  }

  const { data: list, error: listError } = await supabase.storage
    .from('banners')
    .list(`${user_id}`)

  if (listError) {
    console.error('Error listing old banner:', listError.message)
    return null
  }

  if (list.length > 0) {
    const filesToRemove = list?.map((x) => `${user_id}/${x.name}`)

    if (filesToRemove.length > 0) {
      const { error: removeError } = await supabase.storage
        .from('banners')
        .remove(filesToRemove)

      if (removeError) {
        console.error('Error removing old banner:', removeError.message)
        return null
      }
    }
  }

  const { error } = await supabase.storage
    .from('banners')
    .upload(`${user_id}/${id}.png`, bannerFile, {
      cacheControl: '3600',
      upsert: true,
    })

  if (error) {
    console.error('Error uploading banner:', error.message)
    return null
  }

  const { error: updateUserMetadataError } = await supabase.auth.updateUser({
    data: {
      profile_banner_picture: `${process.env.NEXT_PUBLIC_SUPABASE_URL}storage/v1/object/public/banners/${user_id}/${id}.png`,
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
      profile_banner_picture: `${process.env.NEXT_PUBLIC_SUPABASE_URL}storage/v1/object/public/banners/${user_id}/${id}.png`,
    })
    .eq('id', user_id)

  if (updateUserProfileError) {
    console.error(
      'Error updating user profile:',
      updateUserProfileError.message
    )
    return null
  }

  supabase.auth.refreshSession()
  revalidatePath(`/profile/${username}/settings`)
}

export default async function UpdateBanner() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex flex-col">
      <div className="text-xl">Update Banner</div>
      <p className="mb-2 text-sm text-muted-foreground">
        Personalize your profile by updating your banner!
      </p>
      <div className="flex gap-10">
        <div className="flex-col gap-1">
          <div className="text-sm">Current Banner</div>
          <Image
            src={
              user?.user_metadata.profile_banner_picture
                ? user?.user_metadata.profile_banner_picture
                : 'https://placehold.co/800x300?text=Upload+a+banner!'
            }
            alt="banner"
            width={3840}
            height={2160}
            className="max-h-[300px] max-w-[800px] bg-center object-cover"
          />
        </div>
      </div>

      <form action={updateBanner}>
        <input type="hidden" name="user_id" value={user?.id} />
        <input
          type="hidden"
          name="username"
          value={user?.user_metadata.username}
        />
        <Input
          type="file"
          name="bannerFile"
          className="mb-2 mt-2 w-fit cursor-pointer"
          accept="image/*"
          required
        />
        <div className="flex gap-2">
          <UseFormStatusPendingButton text="Update" style="w-20" />
        </div>
      </form>
      {user?.user_metadata.profile_banner_picture && (
        <DeleteBanner
          userId={user?.id!}
          username={user?.user_metadata.username}
        />
      )}
    </div>
  )
}
