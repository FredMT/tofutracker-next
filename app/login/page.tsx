import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import { Metadata } from 'next'
import { z } from 'zod'
import Link from 'next/link'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LoginWithGoogle from '@/app/components/LoginWithGoogle'
import UseFormStatusPendingButton from '@/app/components/UseFormStatusPendingButton'
import getUser from '@/hooks/useUser'


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

  const user = await getUser()
  const trending = await fetch('http://localhost:8080/api/trending', {
    next: { revalidate: 86400 },
  }).then((res) => res.json())

  const interspersedBackdropPaths = trending.movies
    .map((item: Movie | TVShow, index: number) => [
      item.backdrop_path,
      trending.tvShows?.[index]?.backdrop_path,
    ])
    .flat()
    .filter(Boolean)

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
                  Enter your email or username below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <form
                    action={signIn}
                    className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground"
                  >
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email or Username</Label>
                      <Input
                        id="email"
                        type="text"
                        placeholder="Email or Username"
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
                    <UseFormStatusPendingButton
                      text="Login"
                      variant="default"
                    />
                    {searchParams.message && (
                      <p className="text-red-500">{searchParams.message}</p>
                    )}
                  </form>
                  <LoginWithGoogle />
                </div>

                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="underline">
                    Sign up
                  </Link>
                  <Link href="/login/github" className="underline">
                    Login with GitHub
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

// import { lucia } from "@/lib/auth";
// import { db } from "@/lib/db";
// import { verify } from "@node-rs/argon2";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";



// interface ActionResult {
// 	error: string;
// }

// export default async function Page() {
// 	return (
// 		<>
// 			<h1 className="mt-20">Sign in</h1>
// 			<form action={login}>
// 				<label htmlFor="username">Username</label>
// 				<input name="username" id="username" />
// 				<br />
// 				<label htmlFor="password">Password</label>
// 				<input type="password" name="password" id="password" />
// 				<br />
// 				<button>Continue</button>
// 			</form>
// 		</>
// 	);
// }

// async function login(formData: FormData): Promise<ActionResult> {
// 	"use server";
// 	const username = formData.get("username");
// 	if (
// 		typeof username !== "string" ||
// 		username.length < 3 ||
// 		username.length > 31 ||
// 		!/^[a-z0-9_-]+$/.test(username)
// 	) {
// 		return {
// 			error: "Invalid username"
// 		};
// 	}
// 	const password = formData.get("password");
// 	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
// 		return {
// 			error: "Invalid password"
// 		};
// 	}

// 	const existingUser = await db.user.findUnique({
//   where: {
//     username: username.toLowerCase()
//   }
// });
// 	if (!existingUser) {
// 		// NOTE:
// 		// Returning immediately allows malicious actors to figure out valid usernames from response times,
// 		// allowing them to only focus on guessing passwords in brute-force attacks.
// 		// As a preventive measure, you may want to hash passwords even for invalid usernames.
// 		// However, valid usernames can be already be revealed with the signup page among other methods.
// 		// It will also be much more resource intensive.
// 		// Since protecting against this is non-trivial,
// 		// it is crucial your implementation is protected against brute-force attacks with login throttling etc.
// 		// If usernames are public, you may outright tell the user that the username is invalid.
// 		return {
// 			error: "Incorrect username or password"
// 		};
// 	}

// 	const validPassword = await verify(existingUser.password_hash, password, {
// 		memoryCost: 19456,
// 		timeCost: 2,
// 		outputLen: 32,
// 		parallelism: 1
// 	});
// 	if (!validPassword) {
// 		return {
// 			error: "Incorrect username or password"
// 		};
// 	}

// 	const session = await lucia.createSession(existingUser.id, {});
// 	const sessionCookie = lucia.createSessionCookie(session.id);
// 	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
// 	return redirect("/");
// }