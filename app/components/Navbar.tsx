import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { getCurrentUser } from '@/lib/session'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import SearchButton from './SearchButton'

import AuthButton from './AuthButton'
import { ThemeButton } from './ThemeButton'

export default async function Navbar() {
  return (
    <div className="absolute top-0 z-50 w-full">
      <div className="flex h-full w-full justify-center bg-red-800">
        Under development
      </div>
      <div className="mx-auto flex max-w-[1676px] justify-between px-5 xl:px-40">
        <Link href="/">
          <div className="select-none p-4 font-syne text-[24px] font-semibold uppercase">
            TOFUTRACKER
          </div>
        </Link>
        <div className="hidden gap-x-4 p-4 sm:flex">
          <SearchButton />
          <ThemeButton />
          <AuthButton />
        </div>
        <div className="flex gap-4 py-4 sm:hidden">
          <SearchButton />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                <Menu />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 p-4" align="end">
              <div className="flex flex-col gap-y-2">
                <AuthButton />
                <ThemeButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
