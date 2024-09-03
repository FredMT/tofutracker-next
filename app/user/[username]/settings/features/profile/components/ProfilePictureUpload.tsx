'use client'
import { ImageUploader } from '@/app/user/[username]/settings/features/profile/components/ImageUpload'
import { Label } from '@/components/ui/label'
import { Profile } from '@prisma/client'

export default function ProfilePictureUpload({
  profile,
}: {
  profile: Profile
}) {
  return (
    <div className="space-y-2">
      <Label>
        <h3>Profile Picture</h3>
      </Label>
      <ImageUploader type="profile" profile={profile} />
    </div>
  )
}
