'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export async function forgotPassword(state: any, formData: FormData) {
  const supabase = createClient()
  const email = formData.get('email') as string
  const emailSchema = z.string().email()
  if (!emailSchema.safeParse(email).success) {
    return {
      status: 'error',
      message: 'Invalid email',
    }
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `http://localhost:3000/changepassword`,
  })

  if (error) {
    return {
      status: 'error',
      message: error.message,
    }
  }

  return {
    status: 'success',
    message: 'Check your email for a password reset link',
  }
}
