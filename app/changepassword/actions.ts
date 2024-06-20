'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const passwordSchema = z.string().min(8).regex(/\d/)

export async function changePassword(formData: FormData) {
  const code = formData.get('code') as string

  if (!code) {
    redirect('/')
  }

  const supabase = createClient()
  const { error: exchangeCodeForSessionError } =
    await supabase.auth.exchangeCodeForSession(code)
  const password = formData.get('newPassword') as string
  const confirmPassword = formData.get('confirmNewPassword') as string

  if (exchangeCodeForSessionError) {
    redirect(
      `/forgotpassword?status=error&message=Invalid code&random=${Math.random()}`
    )
  }

  if (
    password === confirmPassword &&
    passwordSchema.safeParse(password).success &&
    passwordSchema.safeParse(confirmPassword).success
  ) {
    const { error } = await supabase.auth.updateUser({
      password: confirmPassword,
    })

    if (error) {
      console.log('error resetting password', error)
      redirect(
        `/forgotpassword?status=error&message=Error resetting password&random=${Math.random()}`
      )
    }

    redirect('/?success=true&message=Password changed successfully')
  } else {
    redirect('/forgotpassword')
  }
}
