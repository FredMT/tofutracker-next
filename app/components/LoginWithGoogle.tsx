'use client'

import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/client'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'

const signInWithGoogle = async () => {
  const supabase = createClient()
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `http://localhost:3000/auth/callback`,
    },
  })
}

export default function LoginWithGoogle() {
  return (
    <Button className="w-full" onClick={signInWithGoogle}>
      <FaGoogle className="mr-2" />
      Login with Google
    </Button>
  )
}
