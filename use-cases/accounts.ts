import {
  getAccountByGithubId,
  getAccountByGoogleId,
  getAccountByUserId,
} from '@/data-access/accounts'

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleId(googleId)
}

export async function getAccountByGithubIdUseCase(githubId: number) {
  return await getAccountByGithubId(githubId)
}

export async function getAccountByUserIdUseCase(userId: number) {
  return await getAccountByUserId(userId)
}
