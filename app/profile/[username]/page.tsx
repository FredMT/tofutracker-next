'use server'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import ActivityDialog from './components/ActivityDialog'
import { notFound } from 'next/navigation'

type PosterItem = {
  item_id: number
  item_type: string
  item_poster: string
  item_title: string
  activity_id: string
  item_created_at: string
  hasLiked?: boolean
  likes: number
}

async function getActivityData(user_id: string) {
  const data = await fetch(
    `https://tofutracker-3pt5y.ondigitalocean.app/api/getposters/${user_id}`,
    { next: { tags: ['activities'] } }
  ).then((res) => res.json())
  return data
}

async function getActivityDataLoggedInUser(
  viewed_user_id: string,
  logged_in_user_id: string
) {
  const data = await fetch(
    `https://tofutracker-3pt5y.ondigitalocean.app/api/getposters/${viewed_user_id}/${logged_in_user_id}`,
    { next: { tags: ['activities'] } }
  ).then((res) => res.json())
  return data
}

export default async function Profile({
  params,
}: {
  params: { username: string }
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('profile')
    .select('bio')
    .eq('username', params.username)
    .single()

  if (error) console.log(error.message)

  const { data: userData, error: userError } = await supabase
    .from('profile')
    .select('id')
    .eq('username', params.username)
    .maybeSingle()

  if (userError) {
    console.error(userError.message)
    return
  }

  if (!userData) {
    return notFound()
  }

  const viewedUserId = userData.id

  let activityData
  if (user) {
    activityData = await getActivityDataLoggedInUser(viewedUserId, user.id)
  } else {
    activityData = await getActivityData(viewedUserId)
  }

  return (
    <div className="mx-6 mt-20">
      <div className="flex max-md:flex-col md:gap-20">
        <div className="flex max-md:gap-6 md:max-w-[240px] md:flex-col md:gap-2">
          <div className="flex justify-center">
            <Avatar className="size-12 md:size-24">
              <AvatarImage
                src={user?.user_metadata.profile_picture}
                alt="Profile picture"
              />
            </Avatar>
          </div>
          <div className="flex flex-col">
            <div className="font-syne text-lg font-semibold">
              {params.username}
            </div>
            <div className="text-sm text-gray-500">{data?.bio}</div>
          </div>
        </div>

        <div className="flex w-full flex-col">
          <div className="text-xl max-md:mt-6">Activity</div>
          <Separator className="mt-2" />

          <div className="mb-6 mt-6 grid grid-cols-3 gap-4 sm:grid-cols-4">
            {activityData.success === false &&
              activityData.message === 'Unauthorized' && (
                <div className="flex flex-col">
                  <p className="text-lg text-muted-foreground">
                    This user has their activity hidden
                  </p>
                </div>
              )}

            {activityData.success === false &&
              activityData.message !== 'Unauthorized' && (
                <div className="flex flex-col">
                  <p className="text-lg text-muted-foreground">
                    Error retrieving user activity
                  </p>
                </div>
              )}
            {activityData.success === true &&
              activityData.posters.length === 0 && (
                <div className="flex flex-col">
                  <p className="text-lg text-muted-foreground">
                    This user has no activity yet :(
                  </p>
                </div>
              )}

            {activityData.success === true &&
              activityData.posters.map((item: PosterItem) => (
                <Dialog key={item.item_id}>
                  <DialogTrigger>
                    <Image
                      key={item.item_id}
                      className="min-h-[132px] min-w-[88px] rounded-md sm:h-[228px] sm:w-[152px] lg:h-[264px] lg:w-[176px] xl:h-[300px] xl:w-[200px]"
                      src={item.item_poster}
                      alt={item.item_title}
                      width="1080"
                      height="1920"
                      priority
                    />
                  </DialogTrigger>
                  <ActivityDialog
                    item={item}
                    username={params.username}
                    hasLiked={item.hasLiked || false}
                  />
                </Dialog>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
