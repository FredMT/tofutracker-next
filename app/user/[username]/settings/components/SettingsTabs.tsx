'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

import AccountSettings from '@/app/user/[username]/settings/features/account/AccountSettings'
import PrivacySettings from '@/app/user/[username]/settings/features/privacy/PrivacySettings'
import ProfileSettings from '@/app/user/[username]/settings/features/profile/ProfileSettings'
import { useRouter } from '@/hooks/useRouter'
import { Profile } from '@prisma/client'
import { Eye, ImageIcon, User } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

export default function SettingsTabs({
  profile,
  accountType,
}: {
  profile: Profile
  accountType: string
}) {
  const searchParams = useSearchParams()
  const tab = searchParams.get('t')
  const router = useRouter()
  return (
    <Tabs defaultValue={tab ?? 'profile'} className="space-y-4">
      <TabsList className="flex h-full flex-wrap">
        <TabsTrigger
          value="profile"
          className="flex-grow"
          onClick={() =>
            router.push(`/user/${profile.username}/settings?t=profile`)
          }
        >
          <ImageIcon className="mr-2 h-4 w-4" /> Profile
        </TabsTrigger>
        <TabsTrigger
          value="account"
          className="flex-grow"
          onClick={() =>
            router.push(`/user/${profile.username}/settings?t=account`)
          }
        >
          <User className="mr-2 h-4 w-4" /> Account
        </TabsTrigger>
        <TabsTrigger
          value="privacy"
          className="flex-grow"
          onClick={() =>
            router.push(`/user/${profile.username}/settings?t=privacy`)
          }
        >
          <Eye className="mr-2 h-4 w-4" /> Privacy
        </TabsTrigger>
      </TabsList>
      <ProfileSettings profile={profile} />
      <AccountSettings profile={profile} accountType={accountType} />
      <PrivacySettings profile={profile} />
    </Tabs>
  )
}
