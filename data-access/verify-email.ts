import { generateRandomToken } from "@/data-access/utils";
import { db } from "@/db";
import { UserId } from "@/use-cases/types";
import { TOKEN_LENGTH, TOKEN_TTL } from "./magic-links";

export async function createVerifyEmailToken(userId: UserId) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const token_expires_at = new Date(Date.now() + TOKEN_TTL);

  await db.verifyEmailToken.upsert({
    where: { user_id: userId },
    update: {
      token,
      token_expires_at,
    },
    create: {
      user_id: userId,
      token,
      token_expires_at,
    },
  });

  return token;
}

export async function getVerifyEmailToken(token: string) {
  const existingToken = await db.verifyEmailToken.findFirst({
    where: {
      token,
    },
  });

  return existingToken;
}

export async function deleteVerifyEmailToken(token: string) {
  await db.verifyEmailToken.deleteMany({
    where: {
      token,
    },
  });
}
