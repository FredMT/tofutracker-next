import SettingsTabs from '@/app/user/[username]/settings/components/SettingsTabs'
import { getProfile } from '@/data-access/profiles'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'

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
      <SettingsTabs profile={profile} />
    </div>
  )
}
