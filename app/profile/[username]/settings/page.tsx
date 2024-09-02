'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Lock, Eye, Image as ImageIcon, PaintBucket } from 'lucide-react'

export default function Settings() {
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [selectedTheme, setSelectedTheme] = useState('light')

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

  const themes = ['light', 'dark', 'blue', 'green', 'purple']

  return (
    <div className="container mx-auto mt-[72px] max-w-[1676px] p-5 xl:px-40">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="flex h-full flex-wrap">
          <TabsTrigger value="account" className="flex-grow">
            <User className="mr-2 h-4 w-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex-grow">
            <Eye className="mr-2 h-4 w-4" /> Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex-grow">
            <ImageIcon className="mr-2 h-4 w-4" /> Appearance
          </TabsTrigger>
          {/* <TabsTrigger value="themes" className="flex-grow">
            <PaintBucket className="mr-2 h-4 w-4" /> Themes
          </TabsTrigger> */}
        </TabsList>
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter new username" />
              </div>
              <Button variant="outline">
                <Lock className="mr-2 h-4 w-4" /> Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="privacy">
          <Card>
            <CardHeader>
              <CardTitle>Privacy Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="activity-privacy">Activity Privacy</Label>
                <div className="flex items-center space-x-4">
                  <p>Public</p>
                  <Switch id="activity-privacy" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
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
        {/* <TabsContent value="themes">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {themes.map((theme) => (
                  <Button
                    key={theme}
                    variant={selectedTheme === theme ? 'default' : 'outline'}
                    onClick={() => setSelectedTheme(theme)}
                    className="h-20 capitalize"
                  >
                    {theme}
                  </Button>
                ))}
                <Button variant="outline" className="h-20">
                  Create Custom Theme
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
