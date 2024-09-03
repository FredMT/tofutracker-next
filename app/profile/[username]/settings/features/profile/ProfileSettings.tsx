'use client'
import { useState } from 'react'
import BannerPictureUpload from '@/app/profile/[username]/settings/features/profile/components/BannerPictureUpload'
import ProfilePictureUpload from '@/app/profile/[username]/settings/features/profile/components/ProfilePictureUpload'
import { UpdateBioForm } from '@/app/profile/[username]/settings/features/profile/components/UpdateBioForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'
import { Profile } from '@prisma/client'

export default function ProfileSettings({ profile }: { profile: Profile }) {
  return (
    <TabsContent value="profile">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <UpdateBioForm profile={profile} />
          <ProfilePictureUpload profile={profile} />
          <BannerPictureUpload profile={profile} />
        </CardContent>
      </Card>
    </TabsContent>
  )
}
