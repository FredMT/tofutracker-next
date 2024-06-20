import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import { z } from 'zod'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LoginWithGoogle from '../components/LoginWithGoogle'

const emailSchema = z.string().email()

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
      console.log('error', emailError)
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

  const supabase = createClient()

  const trending = await fetch('http://localhost:8080/api/trending', {
    next: { revalidate: 86400 },
  }).then((res) => res.json())

  const interspersedBackdropPaths = trending.movies
    .map((movie: any, index: number) => [
      movie.backdrop_path,
      trending.tvShows?.[index]?.backdrop_path,
    ])
    .flat()
    .filter(Boolean)

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
        `http://localhost:8080/api/getbackdropimage/${item_type}/${item_id}`
      ).then((res) => res.json())
    }
    return (
      <>
        {searchParams.from ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${bg_img}`}
            alt="Login Background"
            fill
            className="animate-fade-in-50 absolute z-0 object-cover object-center opacity-60 duration-500 animate-in dark:opacity-30"
          />
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/original${interspersedBackdropPaths[Math.floor(Math.random() * interspersedBackdropPaths.length)]}`}
            alt="Login Background"
            fill
            className="animate-fade-in-50 absolute z-0 object-cover object-center opacity-70 duration-500 animate-in dark:opacity-30"
          />
        )}

        <div className="my-20 flex justify-center">
          <div className="z-10 mt-20 flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
            <Card className="mx-auto min-w-[300px] max-w-sm rounded-md border-0 bg-transparent backdrop-blur-md sm:min-w-[400px]">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription className="text-bold">
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <form
                    action={signIn}
                    className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        name="username_or_email_input"
                      />
                    </div>
                    <div className="mt-2 grid gap-2">
                      <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <Link
                          href="/forgotpassword"
                          className="ml-auto inline-block text-sm underline"
                          tabIndex={-1}
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        name="password"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      formAction={signIn}
                    >
                      Login
                    </Button>
                  </form>
                  <LoginWithGoogle />
                </div>

                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="underline">
                    Sign up
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    )
  }
}
