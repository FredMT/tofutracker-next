import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/utils/supabase/server'
import ProfileBannerButtonContent from './ProfileBannerButtonContent'
import { Dialog } from '@/components/ui/dialog'

type Props = {
  viewedUserUsername: string
  viewedUserBannerPicture: string
  activityData: {
    success: boolean
    posters: {
      item_id: number
      item_type: string
      item_poster: string
      item_title: string
      activity_id: string
      item_created_at: string
      hasLiked?: boolean
      likes: number
    }[]
  }
}

export default async function ProfileBanner({
  viewedUserUsername,
  viewedUserBannerPicture,
  activityData,
}: Props) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && user.user_metadata.username === viewedUserUsername) {
    if (!user.user_metadata.profile_banner_picture) {
      return (
        <div className="flex h-full flex-col items-center justify-center">
          <Dialog>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger>
                <Button variant="secondary">
                  Choose/Upload Banner Picture
                </Button>
              </DropdownMenuTrigger>
              <ProfileBannerButtonContent activityData={activityData} />
            </DropdownMenu>
          </Dialog>
        </div>
      )
    }
    return (
      <img
        src={viewedUserBannerPicture}
        alt="Profile banner"
        width={1280}
        height={720}
        className="min-h-[288px] w-full object-cover sm:max-h-[360px]"
      />
    )
  }

  return (
    <img
      src={viewedUserBannerPicture}
      alt="Profile banner"
      width={1280}
      height={720}
      className="min-h-[288px] w-full object-cover sm:max-h-[360px]"
    />
  )
}
