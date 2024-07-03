import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const emailSchema = z.string().email()

export const signIn = async (formData: FormData, searchParams: any) => {
  'use server'

  const username_or_email_input = formData.get(
    'username_or_email_input'
  ) as string
  const password = formData.get('password') as string
  const supabase = createClient()

  if (emailSchema.safeParse(username_or_email_input).success) {
    const { error } = await supabase.auth.signInWithPassword({
      email: username_or_email_input,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect(`/${searchParams.from ? searchParams.from : ''}`)
  }

  const { data, error: emailError } = await supabase
    .from('profile')
    .select('email')
    .eq('username', username_or_email_input)
    .single()

  if (emailError) {
    return redirect('/login?message=Could not authenticate user')
  }

  if (data) {
    const { error } = await supabase.auth.signInWithPassword({
      email: data?.email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect(`/${searchParams.from ? searchParams.from : ''}`)
  }
}
