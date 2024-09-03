'use client'
import { ImageUploader } from '@/app/profile/[username]/settings/features/profile/components/ImageUpload'
import { Label } from '@/components/ui/label'
import { Profile } from '@prisma/client'

export default function BannerPictureUpload({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-2">
      <Label>
        <h3>Banner Picture</h3>
      </Label>
      <ImageUploader type="banner" profile={profile} />
    </div>
  )
}
