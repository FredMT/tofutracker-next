import {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ProfileBannerChosenItemDialog from './ProfileBannerChosenItemDialog'
import { updateBannerFromLibraryItems } from '../settings/components/actions'

export default async function ProfileBannerButtonContent({
  activityData,
}: {
  activityData: any
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return (
      <>
        <DropdownMenuContent className="w-fit">
          <DialogTrigger asChild>
            <DropdownMenuItem>
              Choose a Banner Picture from your Library
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>Search for a Banner Picture </DropdownMenuItem>
          <DropdownMenuItem>Upload Banner Picture </DropdownMenuItem>
        </DropdownMenuContent>
        <DialogContent className="flex flex-col gap-4 max-sm:h-screen max-sm:min-w-[100vw] sm:min-h-[450px] sm:min-w-[90vw]">
          <DialogHeader className="mb-6">
            <DialogTitle>Choose from an item in your Library</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Dialog>
              <ProfileBannerChosenItemDialog
                activityData={activityData}
                updateBannerFromLibraryItems={updateBannerFromLibraryItems}
              />
            </Dialog>
          </DialogFooter>
        </DialogContent>
      </>
    )
  } else {
    return notFound()
  }
}
