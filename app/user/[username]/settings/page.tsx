import SettingsTabs from '@/app/user/[username]/settings/components/SettingsTabs'
import { getProfileByUserId } from '@/data-access/profiles'
import { db } from '@/db'
import { getCurrentUser } from '@/lib/session'
import { notFound } from 'next/navigation'

async function getAccountType(username: string) {
  const profile = await db.profile.findFirst({
    where: { username },
    select: { user_id: true },
  })

  if (!profile) {
    throw new Error('Profile not found')
  }

  const account = await db.account.findFirst({
    where: { user_id: profile.user_id },
    select: { account_type: true },
  })

  if (!account) {
    throw new Error('Account not found')
  }

  return account.account_type
}

export default async function Settings({
  params,
}: {
  params: { username: string }
}) {
  const user = await getCurrentUser()
  if (!user) notFound()
  const profile = await getProfileByUserId(user.id)
  if (!profile || params.username !== profile.username) notFound()
  const accountType = await getAccountType(profile.username)

  return (
    <div className="container mx-auto mt-[72px] max-w-[1676px] p-5 xl:px-40">
      <h1 className="mb-6 text-3xl font-bold">Settings</h1>
      <SettingsTabs profile={profile} accountType={accountType} />
    </div>
  )
}
