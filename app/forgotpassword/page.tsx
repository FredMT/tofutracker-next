import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Image from 'next/image'
import ForgotPasswordForm from './components/ForgotPasswordForm'

export default async function ForgotPassword() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect(`profile/${user.user_metadata.username}/settings`)
  } else {
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

    return (
      <>
        <Image
          src={`https://image.tmdb.org/t/p/original${interspersedBackdropPaths[Math.floor(Math.random() * interspersedBackdropPaths.length)]}`}
          alt="SignUp Background"
          fill
          className="animate-fade-in-50 absolute z-0 object-cover object-center opacity-70 duration-500 animate-in dark:opacity-30"
        />
        <div className="my-20 flex justify-center">
          <div className="z-10 mt-20 flex w-full flex-1 flex-col justify-center gap-2 px-8 backdrop-blur-[2px] sm:max-w-md">
            <div className="flex flex-col gap-1">
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
                Forgot your password?
              </h2>
              <p className="text-bold mb-2 mt-2 text-center text-sm">
                Enter the email address associated with your account and
                we&apos;ll send you a link to reset your password.
              </p>
            </div>
            <ForgotPasswordForm />
            <div className="flex justify-center">
              <Link
                href="/login"
                className="text-bold text-sm underline"
                prefetch={false}
              >
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}
