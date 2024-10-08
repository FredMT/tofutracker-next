import { applicationName } from '@/app-config'
import { GitHubUser } from '@/app/api/login/github/callback/route'
import { GoogleUser } from '@/app/api/login/google/callback/route'
import {
  createAccount,
  createAccountViaGithub,
  createAccountViaGoogle,
  getAccountByUserId,
  updatePassword,
} from '@/data-access/accounts'
import {
  createProfile,
  getProfileByUserId,
  updateProfile,
} from '@/data-access/profiles'
import {
  createPasswordResetToken,
  deletePasswordResetToken,
  getPasswordResetToken,
} from '@/data-access/reset-tokens'
import {
  createUser,
  deleteUser,
  getUserByEmail,
  setEmailVerified,
  updateUser,
  verifyPassword,
} from '@/data-access/users'
import { createTransaction } from '@/data-access/utils'
import {
  createVerifyEmailToken,
  deleteVerifyEmailToken,
  getVerifyEmailToken,
} from '@/data-access/verify-email'
import { ResetPasswordEmail } from '@/emails/reset-password'
import { VerifyEmail } from '@/emails/verify-email'
import { sendEmail } from '@/lib/email'
import { generateRandomName } from '@/lib/names'
import { UserId, UserSession } from '@/use-cases/types'
import {
  AuthenticationError,
  EmailInUseError,
  LoginError,
  NotFoundError,
  ProfileUpdateError,
} from './errors'

export async function deleteUserUseCase(
  authenticatedUser: UserSession,
  userToDeleteId: UserId
): Promise<void> {
  if (authenticatedUser.id !== userToDeleteId) {
    throw new AuthenticationError()
  }

  await deleteUser(userToDeleteId)
}

export async function getUserProfileUseCase(userId: UserId) {
  const profile = await getProfileByUserId(userId)

  if (!profile) {
    throw new NotFoundError()
  }

  return profile
}

export async function registerUserUseCase(email: string, password: string) {
  const existingUser = await getUserByEmail(email)
  if (existingUser) {
    throw new EmailInUseError()
  }

  const user = await createUser(email)
  await createAccount(user.id, password)
  await createProfile(user.id, generateRandomName())

  const token = await createVerifyEmailToken(user.id)
  await sendEmail(
    email,
    `Verify your email for ${applicationName}`,
    <VerifyEmail token={token} />
  )

  return { id: user.id }
}

export async function signInUseCase(email: string, password: string) {
  const user = await getUserByEmail(email)

  if (!user) {
    throw new LoginError()
  }

  const isPasswordCorrect = await verifyPassword(email, password)

  if (!isPasswordCorrect) {
    throw new LoginError()
  }

  return { id: user.id }
}

export async function createGithubUserUseCase(githubUser: GitHubUser) {
  let existingUser = await getUserByEmail(githubUser.email)

  if (!existingUser) {
    existingUser = await createUser(githubUser.email)
  }

  await createAccountViaGithub(existingUser.id, githubUser.id)

  await createProfile(existingUser.id, githubUser.login, githubUser.avatar_url)

  return existingUser.id
}

export async function createGoogleUserUseCase(googleUser: GoogleUser) {
  let existingUser = await getUserByEmail(googleUser.email)

  if (!existingUser) {
    existingUser = await createUser(googleUser.email)
  }

  await createAccountViaGoogle(existingUser.id, googleUser.sub)

  await createProfile(existingUser.id, googleUser.name, googleUser.picture)

  return existingUser.id
}

export async function resetPasswordUseCase(email: string) {
  const user = await getUserByEmail(email)

  if (!user) {
    throw new AuthenticationError()
  }

  const account = await getAccountByUserId(user.id)

  if (!account) {
    throw new AuthenticationError()
  }

  if (account.account_type !== 'email') {
    return
  }

  const token = await createPasswordResetToken(user.id)

  await sendEmail(
    email,
    `Your password reset link for ${applicationName}`,
    <ResetPasswordEmail token={token} />
  )
}

export async function changePasswordUseCase(token: string, password: string) {
  const tokenEntry = await getPasswordResetToken(token)

  if (!tokenEntry) {
    throw new AuthenticationError()
  }

  const userId = tokenEntry.user_id

  await createTransaction(async (trx) => {
    await deletePasswordResetToken(token)
    await updatePassword(userId, password)
    await setEmailVerified(userId)
  })
}

export async function verifyEmailUseCase(token: string) {
  const tokenEntry = await getVerifyEmailToken(token)

  if (!tokenEntry) {
    throw new AuthenticationError()
  }

  const userId = tokenEntry.user_id

  await updateUser(userId, { email_verified: new Date() })
  await deleteVerifyEmailToken(token)
  return userId
}

export async function updateBioUseCase(userId: number, newBio: string) {
  if (newBio.length < 3) {
    throw new ProfileUpdateError('Bio cannot be less than 3 characters')
  }
  if (newBio.length > 500) {
    throw new ProfileUpdateError('Bio cannot exceed 500 characters')
  }
  return await updateProfile(userId, { bio: newBio })
}

export async function updateUsernameUseCase(
  userId: number,
  newUsername: string
) {
  if (newUsername.length < 4) {
    throw new ProfileUpdateError('Username cannot be less than 4 characters')
  }
  if (newUsername.length > 12) {
    throw new ProfileUpdateError('Username cannot exceed 12 characters')
  }
  if (newUsername.includes(' ')) {
    throw new ProfileUpdateError('Username cannot contain spaces')
  }
  return await updateProfile(userId, { username: newUsername })
}
