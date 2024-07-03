'use client'
import UseFormStatusPendingButton from '@/components/UseFormStatusPendingButton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React, { useState } from 'react'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { z } from 'zod'
import { changePassword } from './actions'
import { redirect, useSearchParams } from 'next/navigation'

export default function ChangePassword() {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const { data } = useSWR('http://localhost:8080/api/trending', fetcher)
  let interspersedBackdropPaths = []

  if (data) {
    interspersedBackdropPaths = data.movies
      .map((movie: Movie, index: number) => [
        movie.backdrop_path,
        data.tvShows?.[index]?.backdrop_path,
      ])
      .flat()
      .filter(Boolean)
  }

  const passwordCharacterSchema = z.string().min(8)
  const passwordNumberSchema = z.string().regex(/\d/)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    formData.set('newPassword', newPassword)
    formData.set('confirmNewPassword', confirmNewPassword)
    changePassword(formData)
  }

  const searchParams = useSearchParams()
  const code = searchParams.get('code')

  if (code) {
    return (
      <>
        {Boolean(interspersedBackdropPaths.length) && (
          <div className="absolute inset-0">
            <Image
              src={`https://image.tmdb.org/t/p/w1280${interspersedBackdropPaths[0]}`}
              alt="Forgot password background"
              className="animate-fade-in-50 absolute z-0 object-cover object-center opacity-70 duration-500 animate-in dark:opacity-30"
              fill
              priority
            />
          </div>
        )}
        <div className="my-20 flex justify-center">
          <div className="z-10 mt-20 flex w-full flex-1 flex-col justify-center gap-2 px-8 backdrop-blur-[2px] sm:max-w-md">
            <div>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
                Change Password
              </h2>
              <p className="text-bold mt-2 text-center text-sm">
                Enter your new password and confirm it to update your account
                password.
              </p>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label
                  htmlFor="new-password"
                  className="block text-sm font-medium text-foreground"
                >
                  New Password
                </Label>
                <div className="mt-1">
                  <input type="hidden" name="code" value={code} />
                  <Input
                    id="new-password"
                    name="new-password"
                    type="password"
                    autoComplete="off"
                    required
                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label
                  htmlFor="confirm-new-password"
                  className="block text-sm font-medium text-foreground"
                >
                  Confirm New Password
                </Label>
                <div className="mt-1">
                  <Input
                    id="confirm-new-password"
                    name="confirm-new-password"
                    type="password"
                    autoComplete="off"
                    required
                    className="block w-full appearance-none rounded-md border border-input bg-background px-3 py-2 placeholder-muted-foreground shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  />
                </div>
              </div>
              <ul className="text-bold mx-4 mt-2 flex list-disc flex-col gap-1 text-sm">
                <li>
                  Your password must have atleast
                  <span
                    className={`${passwordCharacterSchema.safeParse(confirmNewPassword).success ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {' '}
                    8 characters
                  </span>{' '}
                  and
                  <span
                    className={`${passwordNumberSchema.safeParse(confirmNewPassword).success ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {' '}
                    1 number
                  </span>
                  .
                </li>
              </ul>
              <div>
                <UseFormStatusPendingButton
                  text="Change Password"
                  style="w-full"
                  variant="default"
                  disabled={
                    !passwordCharacterSchema.safeParse(newPassword).success ||
                    !passwordNumberSchema.safeParse(confirmNewPassword).success
                  }
                />
              </div>
            </form>
          </div>
        </div>
      </>
    )
  } else {
    redirect('/')
  }
}
