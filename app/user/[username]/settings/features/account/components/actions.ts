'use server'

import { authProcedure } from '@/lib/authProcedure'
import { updateUsernameUseCase } from '@/use-cases/users'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateUsernameAction = authProcedure
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
        message: 'Failed to update username. Please try again later',
      }
    }
  })
