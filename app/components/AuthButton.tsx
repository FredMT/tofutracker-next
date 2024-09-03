import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import { getProfile } from '@/data-access/profiles'
import { getCurrentUser } from '@/lib/session'
import Link from 'next/link'
import SignIn from './SignIn'
import Signout from './Signout'

export default async function AuthButton() {
  const user = await getCurrentUser()

  if (!user) return <SignIn />

  const profile = await getProfile(user.id)

  if (!profile) return null

  return user ? (
    <>
      <div className="hidden cursor-pointer sm:flex">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              <AvatarImage
                src={profile.image ?? `https://github.com/shadcn.png`}
                alt="@shadcn"
              />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            <Link href={`/user/${profile.username}`}>
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" asChild>
              <Link href={`/user/${profile.username}/settings?t=profile`}>
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <Signout />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex gap-2 max-sm:flex-col sm:hidden">
        <Avatar className="max-sm:hidden">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>

        <Separator className="my-2 max-sm:hidden" />

        <div className="flex flex-col gap-2 sm:hidden">
          <Link href={`/user/${profile.username}`}>
            <button>Profile</button>
          </Link>

          <Separator className="my-1 sm:hidden" />

          <Link href={`/user/${profile.username}/settings?t=profile`}>
            <button>Settings</button>
          </Link>

          <Separator className="my-1 sm:hidden" />

          <Signout />

          <Separator className="my-1 sm:hidden" />
        </div>
      </div>
    </>
  ) : (
    <SignIn />
  )
}
