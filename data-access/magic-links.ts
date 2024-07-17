import { generateRandomToken } from "@/data-access/utils";
import { db } from "@/db";

export const TOKEN_LENGTH = 32;
export const TOKEN_TTL = 1000 * 60 * 5; // 5 min
export const VERIFY_EMAIL_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function upsertMagicLink(email: string) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const token_expires_at = new Date(Date.now() + TOKEN_TTL);

  await db.magicLink.upsert({
    where: {
      email,
    },
    update: {
      token,
      token_expires_at,
    },
    create: {
      email,
      token,
      token_expires_at,
    },
  });

  return token;
}

export async function getMagicLinkByToken(token: string) {
  const existingToken = await db.magicLink.findFirst({
    where: {
      token,
    },
  });

  return existingToken;
}

export async function deleteMagicToken(token: string) {
  await db.magicLink.deleteMany({
    where: {
      token,
    },
  });
}
