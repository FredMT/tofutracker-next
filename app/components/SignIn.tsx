import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function SignIn() {
  return (
    <Button asChild>
      <Link className="flex items-center" href={'/sign-in'}>
        <LogIn className="mr-2 h-4 w-4" />
        Sign In
      </Link>
    </Button>
  )
}
