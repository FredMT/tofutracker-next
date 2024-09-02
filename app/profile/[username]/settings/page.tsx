import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Lock, Eye, Image as ImageIcon, PaintBucket } from 'lucide-react'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'
import { getProfile } from '@/data-access/profiles'
import ProfileSettings from '@/app/profile/[username]/settings/features/profile/ProfileSettings'

export default async function Settings({ params }: { params: any }) {
  const user = await getCurrentUser()
  if (!user) notFound()
  const profile = await getProfile(user.id)
  if (!profile) notFound()
  if (params.username !== profile?.username) notFound()

  return (
    <div className="container mx-auto mt-[72px] max-w-[1676px] p-5 xl:px-40">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="flex h-full flex-wrap">
          <TabsTrigger value="appearance" className="flex-grow">
            <ImageIcon className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="flex-grow">
            <User className="mr-2 h-4 w-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex-grow">
            <Eye className="mr-2 h-4 w-4" /> Privacy
          </TabsTrigger>
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
        <ProfileSettings />
      </Tabs>
    </div>
  )
}
