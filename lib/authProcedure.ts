import { db } from '@/db'
import { validateRequest } from '@/lib/auth'
import { createServerActionProcedure } from 'zsa'
import { ZSAError } from 'zsa'

const authProcedure = createServerActionProcedure()
  .handler(async () => {
    const { user, session } = await validateRequest()

    if (!user || !session) {
      throw new ZSAError('NOT_AUTHORIZED', 'User is not logged in')
    }

    // Check if the user's email is verified for email accounts
    const account = await db.account.findUnique({
      where: { user_id: user.id },
      select: { account_type: true },
    })

    if (account?.account_type === 'email') {
      const dbUser = await db.user.findUnique({
        where: { id: user.id },
        select: { email_verified: true },
      })

      if (!dbUser?.email_verified) {
        throw new ZSAError('FORBIDDEN', 'Email not verified')
      }
    }

    return {
      user,
      session,
    }
  })
  .createServerAction()

export { authProcedure }
