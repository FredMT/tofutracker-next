import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return new Response('Unauthorized', { status: 401 })
  }
  const { user_id: userId } = await request.json()

  if (user.id !== userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { data: list, error: listError } = await supabase.storage
    .from(`banners`)
    .list(`${userId}`)

  if (listError) {
    console.error('Error listing old banner:', listError.message)
    return new Response(listError.message, { status: 500 })
  }

  if (list.length > 0) {
    const filesToRemove = list
      .filter((x) => !x.name.includes('.emptyFolderPlaceholder'))
      .map((x) => `${userId}/${x.name}`)

    if (filesToRemove.length > 0) {
      const { error: removeError } = await supabase.storage
        .from('banners')
        .remove(filesToRemove)

      if (removeError) {
        console.error('Error removing old banner:', removeError.message)
        return new Response(removeError.message, { status: 500 })
      }
    }
  }

  const { error: updateError } = await supabase
    .from('profile')
    .update({
      profile_banner_picture: null,
    })
    .eq('id', userId)

  if (updateError) {
    console.error('Error updating banner:', updateError.message)
    return new Response(updateError.message, { status: 500 })
  }

  const { error: userMetadataError } = await supabase.auth.updateUser({
    data: {
      profile_banner_picture: '',
    },
  })

  if (userMetadataError) {
    console.error('Error updating user metadata:', userMetadataError.message)
    return new Response(userMetadataError.message, { status: 500 })
  }

  return new Response('Banners deleted', { status: 200 })
}
