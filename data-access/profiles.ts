import { db } from '@/db'
import { UserId } from '@/use-cases/types'
import { Profile } from '@prisma/client'

export async function createProfile(
  userId: UserId,
  displayName: string,
  image?: string
) {
  const profile = await db.profile.upsert({
    where: { user_id: userId },
    update: {},
    create: {
      user_id: userId,
      image,
      username: displayName,
      created_at: new Date(),
    },
  })
  return profile
}

export async function updateProfile(
  userId: UserId,
  updateProfile: Partial<Profile>
) {
  const profile = await db.profile.update({
    where: {
      user_id: userId,
    },
    data: updateProfile,
  })
  return profile
}

export async function getProfileByUserId(userId: UserId) {
  const profile = await db.profile.findFirst({
    where: {
      user_id: userId,
    },
  })

  return profile
}

export async function getProfileByUsername(username: string) {
  const profile = await db.profile.findFirst({
    where: {
      username,
    },
  })

  return profile
}
