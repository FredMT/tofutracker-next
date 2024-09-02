'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { useToast } from '@/components/ui/use-toast'
import React, { useState } from 'react'

export default function ProfileSettings() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [bannerImage, setBannerImage] = useState<string | null>(null)

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: (value: string | null) => void
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <TabsContent value="appearance">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
              <div className="w-full max-w-[200px]">
                <Input
                  type="file"
                  onChange={(e) => handleImageUpload(e, setProfileImage)}
                  accept="image/*"
                  className="w-full"
                />
              </div>
              {profileImage && (
                <div className="h-32 w-32 overflow-hidden rounded-lg">
                  <img
                    src={profileImage}
                    alt="Profile Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label>Banner Picture</Label>
            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
              <div className="w-full max-w-[200px]">
                <Input
                  type="file"
                  onChange={(e) => handleImageUpload(e, setBannerImage)}
                  accept="image/*"
                  className="w-full"
                />
              </div>
              {bannerImage && (
                <div className="h-[100px] w-full max-w-[300px] overflow-hidden rounded-lg">
                  <img
                    src={bannerImage}
                    alt="Banner Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
