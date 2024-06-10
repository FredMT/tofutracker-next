import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

export default async function AuthButton() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  let username = null
  if (user?.id) {
    const { data, error } = await supabase
      .from('profile')
      .select('username')
      .eq('id', user.id)
      .single()
    if (error) {
      console.error('Failed to fetch username:', error.message)
    } else {
      username = data?.username
    }
  }

  const signOut = async () => {
    'use server'

    const supabase = createClient()
    await supabase.auth.signOut()
    return redirect('/')
  }

  return user ? (
    <>
      <div className="hidden sm:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <DropdownMenuItem>
              <Link href={`/profile/${username}`}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/profile/${username}/settings`}>Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <form action={signOut}>
                <button>Logout</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-2 max-sm:flex-col sm:hidden">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>

        <Separator className="my-2 sm:hidden" />

        <div className="flex flex-col gap-2 sm:hidden">
          <Link href={`/profile/${username}`}>
            <button>Profile</button>
          </Link>

          <Separator className="my-1 sm:hidden" />

          <Link href={`/profile/${username}/settings`}>
            <button>Settings</button>
          </Link>

          <Separator className="my-1 sm:hidden" />

          <form action={signOut}>
            <button>Logout</button>
          </form>

          <Separator className="my-1 sm:hidden" />
        </div>
      </div>
    </>
  ) : (
    <Link href="/login">
      <Button variant="secondary">Login/Sign Up</Button>
    </Link>
  )
}
