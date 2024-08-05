import {
  getAccountByGithubId,
  getAccountByGoogleId,
} from "@/data-access/accounts";

export async function getAccountByGoogleIdUseCase(googleId: string) {
  return await getAccountByGoogleId(googleId);
}

export async function getAccountByGithubIdUseCase(githubId: number) {
  return await getAccountByGithubId(githubId);
}
