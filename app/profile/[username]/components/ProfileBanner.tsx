import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ProfileBannerChosenItemDialog from './ProfileBannerChosenItemDialog'
import { updateBannerFromLibraryItems } from '../settings/components/actions'

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
            <DialogTrigger className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
              Choose a Banner from an item in your Library
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-4 max-sm:h-screen max-sm:min-w-[100vw] sm:min-h-[450px] sm:min-w-[90vw]">
              <DialogHeader className="mb-6 sm:text-center">
                <DialogTitle>Choose from an item in your Library</DialogTitle>
              </DialogHeader>
              <DialogFooter className="sm:justify-normal">
                <Dialog>
                  <ProfileBannerChosenItemDialog
                    activityData={activityData}
                    updateBannerFromLibraryItems={updateBannerFromLibraryItems}
                  />
                </Dialog>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )
    }
    return (
      <img
        src={user.user_metadata.profile_banner_picture}
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
