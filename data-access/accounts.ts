import { db } from '@/db'
import { UserId } from '@/use-cases/types'
import crypto from 'crypto'

const ITERATIONS = 10000

async function hashPassword(plainTextPassword: string, salt: string) {
  return new Promise<string>((resolve, reject) => {
    crypto.pbkdf2(
      plainTextPassword,
      salt,
      ITERATIONS,
      64,
      'sha512',
      (err, derivedKey) => {
        if (err) reject(err)
        resolve(derivedKey.toString('hex'))
      }
    )
  })
}

export async function createAccount(userId: UserId, password: string) {
  const salt = crypto.randomBytes(128).toString('base64')
  const hash = await hashPassword(password, salt)
  const account = await db.account.create({
    data: {
      user_id: userId,
      account_type: 'email',
      password: hash,
      salt,
    },
  })
  return account
}

export async function createAccountViaGithub(userId: UserId, githubId: number) {
  await db.account.upsert({
    where: {
      user_id: userId,
      account_type: 'github',
    },
    update: {},
    create: {
      user_id: userId,
      account_type: 'github',
      github_id: githubId,
    },
  })
}

export async function createAccountViaGoogle(userId: UserId, googleId: string) {
  await db.account.upsert({
    where: {
      user_id: userId,
      account_type: 'google',
    },
    update: {},
    create: {
      user_id: userId,
      account_type: 'google',
      google_id: googleId,
    },
  })
}

export async function updatePassword(userId: UserId, password: string) {
  const salt = crypto.randomBytes(128).toString('base64')
  const hash = await hashPassword(password, salt)
  await db.account.update({
    where: {
      user_id: userId,
      account_type: 'email',
    },
    data: {
      password: hash,
      salt,
    },
  })
}

export async function getAccountByGoogleId(googleId: string) {
  return await db.account.findFirst({
    where: { google_id: googleId },
  })
}

export async function getAccountByGithubId(githubId: number) {
  return await db.account.findFirst({
    where: { github_id: githubId },
  })
}

export async function getAccountByUserId(userId: UserId) {
  return await db.account.findFirst({
    where: { user_id: userId },
  })
}
