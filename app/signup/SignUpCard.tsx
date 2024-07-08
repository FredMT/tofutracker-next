'use client'

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
import { FaGoogle } from 'react-icons/fa'
import UseFormStatusPendingButton from '@/app/components/UseFormStatusPendingButton'
import { useFormState } from 'react-dom'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { signUp } from './actions'
import { createClient } from '@/utils/supabase/client'
import { redirect } from 'next/navigation'

export default function SignUpCard() {
  const [state, formAction] = useFormState(signUp, null)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { toast } = useToast()

  const signInWithGoogle = async () => {
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
      },
    })
  }

  const emailSchema = z.string().email()
  const passwordSchema = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/\d/, { message: 'Password must contain at least one number' })

  const passwordCharacterSchema = z.string().min(8)
  const passwordNumberSchema = z.string().regex(/\d/)

  useEffect(() => {
    if (state?.error) {
      toast({
        title: 'Error',
        description: state.error,
        variant: 'destructive',
      })
    }

    if (state?.success) {
      toast({
        title: 'Thank you for signing up!',
        description: state.message,
        variant: 'success',
      })
      redirect('/')
    }
  }, [state, toast])

  return (
    <Card className="mx-auto min-w-[300px] max-w-sm rounded-md border-0 bg-transparent backdrop-blur-[2px] sm:min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription className="text-bold">
          Sign up with email or other socials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/login"
                  className="ml-auto inline-block text-sm underline"
                  tabIndex={-1}
                >
                  Already have an account?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ul className="text-bold mx-4 mt-2 flex list-disc flex-col gap-1 text-sm">
                <li>
                  Your password must have atleast
                  <span
                    className={`${passwordCharacterSchema.safeParse(password).success ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {' '}
                    8 characters
                  </span>{' '}
                  and
                  <span
                    className={`${passwordNumberSchema.safeParse(password).success ? 'text-green-500' : 'text-red-500'}`}
                  >
                    {' '}
                    1 number
                  </span>
                  .
                </li>
              </ul>
            </div>
            <UseFormStatusPendingButton
              text="Sign Up"
              variant="default"
              disabled={
                !passwordSchema.safeParse(password).success ||
                !emailSchema.safeParse(email).success
              }
            />
          </div>
        </form>
        <Button className="mt-2 w-full" onClick={signInWithGoogle}>
          <FaGoogle className="mr-2" />
          Sign Up with Google
        </Button>
      </CardContent>
    </Card>
  )
}
