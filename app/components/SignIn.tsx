import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function SignIn() {
  return (
    <Button asChild>
      <Link className="flex items-center" href={'/sign-in'}>
        Sign In
      </Link>
    </Button>
  )
}
