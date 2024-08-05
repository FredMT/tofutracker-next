import React from 'react'
import { Menu } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import SearchButton from './SearchButton'
import { ThemeButton } from './ThemeButton'
import { getCurrentUser } from '@/lib/session'
import SignIn from './SignIn'
import Signout from './Signout'

export default async function Navbar() {
  const user = await getCurrentUser()

  return (
    <div className="absolute top-0 z-50 w-full">
      <div className="mx-auto flex w-[80%] justify-between">
        <Link href="/">
          <div className="select-none p-4 font-syne text-[24px] font-semibold uppercase">
            TOFUTRACKER
          </div>
        </Link>
        <div className="hidden gap-x-4 p-4 sm:flex">
          <SearchButton />
          <ThemeButton />
          {user ? <Signout /> : <SignIn />}
        </div>
        <div className="flex gap-4 py-4 sm:hidden">
          <SearchButton />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground ring-offset-background transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <Menu />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 p-4" align="end">
              <div className="flex flex-col gap-y-2">
                {user ? <Signout /> : <SignIn />}
                <ThemeButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
