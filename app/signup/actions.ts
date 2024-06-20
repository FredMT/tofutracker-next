'use server'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const emailSchema = z.string().email()
const passwordSchema = z.string().min(8)

export const signUp = async (state: any, formData: FormData) => {
  const origin = headers().get('origin')
  const email = formData.get('email') as string

  const supabase = createClient()
  const { data: emails, error: emailsError } = await supabase
    .from('profile')
    .select('email')
    .eq('email', email)
    .maybeSingle()

  if (emailsError) {
    return {
      success: false,
      error: 'There was an error. Please try again later.',
    }
  }

  if (emails) {
    return {
      success: false,
      error: 'Email already exists',
    }
  }

  const password = formData.get('password') as string

  const emailResult = emailSchema.safeParse(email)
  const passwordResult = passwordSchema.safeParse(password)

  if (!passwordResult.success) {
    return {
      success: false,
      error: passwordResult.error.message,
    }
  }

  if (emailResult.success) {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    console.log('success')
  } else {
    return {
      success: false,
      error: emailResult.error.message,
    }
  }

  return {
    success: true,
    message: 'Check your email to continue sign in process',
  }
}
