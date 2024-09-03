import 'server-only'
import { cookies } from 'next/headers'
import { lucia } from '@/lib/auth'
import { validateRequest } from '@/lib/auth'
import { cache } from 'react'
import {
  AuthenticationError,
  EmailVerificationError,
} from '../use-cases/errors'
import { UserId } from '@/use-cases/types'
import { db } from '@/db'

export const getCurrentUser = cache(async () => {
  const session = await validateRequest()

  if (!session.user) {
    return undefined
  }
  return session.user
})

export const isVerifiedUser = async () => {
  const user = await getCurrentUser()
  if (!user) return false

  const accountType = await db.account.findUniqueOrThrow({
    where: {
      user_id: user.id,
    },
  })

  if (accountType.account_type === 'email') {
    const emailVerified = await db.user.findUniqueOrThrow({
      where: {
        id: user.id,
      },
      select: {
        email_verified: true,
      },
    })

    if (Boolean(emailVerified.email_verified)) {
      return true
    } else {
      return false
    }
  }
  return true
}

export const assertAuthenticated = cache(async () => {
  const user = await getCurrentUser()
  if (!user) {
    throw new AuthenticationError()
  }
  const verifiedUser = await isVerifiedUser()
  if (!verifiedUser) {
    throw new EmailVerificationError()
  }
  return user
})

export async function setSession(userId: UserId) {
  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
}
