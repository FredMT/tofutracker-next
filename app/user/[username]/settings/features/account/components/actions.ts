'use server'

import { authenticatedAction } from '@/lib/safe-action'
import { updateUsernameUseCase } from '@/use-cases/users'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateUsernameAction = authenticatedAction
  .input(
    z.object({
      username: z
        .string()
        .min(4, 'Username cannot be less than 4 characters')
        .max(12, 'Username cannot exceed 12 characters')
        .refine((s) => !s.includes(' '), 'Username cannot contain spaces'),
    })
  )
  .handler(async ({ input, ctx }) => {
    try {
      const updatedProfile = await updateUsernameUseCase(
        ctx.user.id,
        input.username
      )

      revalidatePath(`/user/${updatedProfile.username}`)
      return { success: true, username: updatedProfile.username }
    } catch (error) {
      return {
        success: false,
        message:
          'Failed to update username. Please try again or try again later',
      }
    }
  })
