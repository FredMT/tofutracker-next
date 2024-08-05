import { generateRandomToken } from "@/data-access/utils";
import { UserId } from "@/use-cases/types";
import { TOKEN_LENGTH, TOKEN_TTL } from "./magic-links";
import { db } from "@/db";

export async function createPasswordResetToken(userId: UserId) {
  const token = await generateRandomToken(TOKEN_LENGTH);
  const token_expires_at = new Date(Date.now() + TOKEN_TTL);

  await db.resetToken.deleteMany({
    where: {
      user_id: userId,
    },
  });

  await db.resetToken.create({
    data: {
      user_id: userId,
      token,
      token_expires_at,
    },
  });

  return token;
}

export async function getPasswordResetToken(token: string) {
  const existingToken = await db.resetToken.findFirst({
    where: {
      token,
    },
  });

  return existingToken;
}

export async function deletePasswordResetToken(token: string) {
  await db.$transaction(async (tx) => {
    await tx.resetToken.deleteMany({
      where: {
        token,
      },
    });
  });
}
