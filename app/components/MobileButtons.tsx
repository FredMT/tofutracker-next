import { createClient } from '@/utils/supabase/server'
import { Dialog, DialogContent, DialogOverlay } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import ListEditorDialogContent from './ListEditorDialogContent'
import { Button } from '@/components/ui/button'
import AddToLibraryButton from './AddToLibraryButton'
import AddToLibraryDropdownMenu from './AddToLibraryDropdownMenu'

export default async function MobileButtons({ item_id }: { item_id: number }) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="flex w-full">
      <AddToLibraryButton user={user} />
      <Dialog>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Button
              className="w-full sm:max-md:px-1"
              variant="secondary"
              asChild
            >
              <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <AddToLibraryDropdownMenu user={user} />

          <DialogOverlay>
            <DialogContent>
              <ListEditorDialogContent />
            </DialogContent>
          </DialogOverlay>
        </DropdownMenu>
      </Dialog>
    </div>
  )
}
