import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'
import { getProfile } from '@/data-access/profiles'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { User, Eye, Image as ImageIcon } from 'lucide-react'
import ProfileSettings from './features/profile/ProfileSettings'
import AccountSettings from './features/account/AccountSettings'
import PrivacySettings from './features/privacy/PrivacySettings'

export default async function Settings({
  params,
}: {
  params: { username: string }
}) {
  const user = await getCurrentUser()
  if (!user) notFound()
  const profile = await getProfile(user.id)
  if (!profile || params.username !== profile.username) notFound()

  return (
    <div className="container mx-auto mt-[72px] max-w-[1676px] p-5 xl:px-40">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex h-full flex-wrap">
          <TabsTrigger value="profile" className="flex-grow">
            <ImageIcon className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="account" className="flex-grow">
            <User className="mr-2 h-4 w-4" /> Account
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex-grow">
            <Eye className="mr-2 h-4 w-4" /> Privacy
          </TabsTrigger>
        </TabsList>
        <ProfileSettings profile={profile} />
        <AccountSettings userId={user.id} />
        <PrivacySettings userId={user.id} />
      </Tabs>
    </div>
  )
}
