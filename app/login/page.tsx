import { headers } from 'next/headers'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { SubmitButton } from './submit-button'
import Image from 'next/image'
import { Metadata } from 'next'

export const generateMetadata = (): Metadata => {
  return {
    title: 'Login',
  }
}

export default async function Login({
  searchParams,
}: {
  searchParams: { message: string; from: string }
}) {
  const signIn = async (formData: FormData) => {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect(`/${searchParams.from ? searchParams.from : ''}`)
  }

  const signUp = async (formData: FormData) => {
    'use server'

    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    })

    if (error) {
      console.log(error)
      return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
  }
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    return redirect('/')
  } else {
    let bg_img
    if (searchParams.from) {
      const item_type = searchParams.from.split('/')[0]
      const item_id = searchParams.from.split('/')[1]
      bg_img = await fetch(
        `https://tofutracker-3pt5y.ondigitalocean.app/api/getbackdropimage/${item_type}/${item_id}`
      ).then((res) => res.json())
    }
    return (
      <>
        {searchParams.from && (
          <Image
            src={`https://image.tmdb.org/t/p/original${bg_img}`}
            alt="Login Background"
            fill
            className="animate-fade-in-50 absolute z-0 object-cover object-center opacity-30 duration-500 animate-in"
          />
        )}
        <div className="my-20 flex justify-center">
          <div className="z-10 mt-20 flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
            <form className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in">
              <label className="text-md" htmlFor="email">
                Email
              </label>
              <input
                className="mb-6 rounded-md border bg-inherit px-4 py-2"
                name="email"
                placeholder="you@example.com"
                required
              />
              <label className="text-md" htmlFor="password">
                Password
              </label>
              <input
                className="mb-6 rounded-md border bg-inherit px-4 py-2"
                type="password"
                name="password"
                placeholder="••••••••"
                required
              />
              <SubmitButton
                formAction={signIn}
                className="mb-2 rounded-md bg-green-700 px-4 py-2 text-foreground"
                pendingText="Signing In..."
              >
                Sign In
              </SubmitButton>
              <SubmitButton
                formAction={signUp}
                className="mb-2 rounded-md border border-foreground/20 px-4 py-2 text-foreground"
                pendingText="Signing Up..."
              >
                Sign Up
              </SubmitButton>
              {searchParams?.message && (
                <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
                  {searchParams.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </>
    )
  }
}
