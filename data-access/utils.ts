import { db } from "@/db";
import crypto from "crypto";

export async function generateRandomToken(length: number) {
  const buf = await new Promise<Buffer>((resolve, reject) => {
    crypto.randomBytes(Math.ceil(length / 2), (err, buf) => {
      if (err !== null) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });

  return buf.toString("hex").slice(0, length);
}

export async function createTransaction<T>(cb: (trx: T) => Promise<void>) {
  await db.$transaction(async (prismaClient) => {
    await cb(prismaClient as unknown as T);
  });
}
