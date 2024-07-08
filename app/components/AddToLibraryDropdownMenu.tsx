'use client'

import { DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { User } from '@supabase/supabase-js'

export default function AddToLibraryDropdownMenu({
  user,
}: {
  user: User | null
}) {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuItem className="cursor-pointer">
        <div className="flex items-center gap-x-2">
          <span>Set as Completed</span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer">
        <div className="flex items-center gap-x-2">
          <span>Set as Planning</span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="cursor-pointer">
        <div className="flex items-center gap-x-2">
          <span>Set as Dropped</span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DialogTrigger asChild>
        <DropdownMenuItem className="cursor-pointer">
          <div className="flex items-center gap-x-2">
            <span>Open List Editor</span>
          </div>
        </DropdownMenuItem>
      </DialogTrigger>
    </DropdownMenuContent>
  )
}
