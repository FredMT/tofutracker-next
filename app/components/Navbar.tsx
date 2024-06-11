import React from 'react'
import { Button } from '@/components/ui/button'
import ThemeButton from './ThemeButton'
import AuthButton from '@/components/AuthButton'
import { Menu, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import SearchButton from './SearchButton'

export default function Navbar() {
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
          <AuthButton />
        </div>
        <div className="flex gap-4 py-4 sm:hidden">
          <SearchButton />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 p-4">
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
