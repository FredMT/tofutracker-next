import { env } from '@/env'
import { assertAuthenticated } from '@/lib/session'
import { createServerActionProcedure } from 'zsa'
import { PublicError } from '../use-cases/errors'

function shapeErrors({ err }: any) {
  const isAllowedError = err instanceof PublicError
  // let's all errors pass through to the UI so debugging locally is easier
  const isDev = env.NODE_ENV === 'development'
  if (isAllowedError || isDev) {
    return {
      code: err.code ?? 'ERROR',
      message: `${isDev ? 'DEV ONLY ENABLED - ' : ''}${err.message}`,
    }
  } else {
    return {
      code: 'ERROR',
      message: 'Something went wrong',
    }
  }
}

export const unauthenticatedAction = createServerActionProcedure()
  .experimental_shapeError(shapeErrors)
  .handler(async () => {
    return { user: undefined }
  })
  .createServerAction()
