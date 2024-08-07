import { db } from "@/db";
import { UserId } from "@/use-cases/types";
import { Profile } from "@prisma/client";

export async function createProfile(
  userId: UserId,
  displayName: string,
  image?: string,
) {
  const profile = await db.profile.upsert({
    where: { user_id: userId },
    update: {},
    create: {
      user_id: userId,
      image,
      username: displayName,
    },
  });
  return profile;
}

export async function updateProfile(
  userId: UserId,
  updateProfile: Partial<Profile>,
) {
  await db.profile.update({
    where: {
      user_id: userId,
    },
    data: updateProfile,
  });
}

export async function getProfile(userId: UserId) {
  const profile = await db.profile.findFirst({
    where: {
      user_id: userId,
    },
  });

  return profile;
}
