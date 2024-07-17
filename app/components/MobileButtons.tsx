import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Edit } from 'lucide-react'
import ListEditorDialogContent from './ListEditorDialogContent/ListEditorDialogContent'
import { Button } from '@/components/ui/button'
import AddToLibraryButton from './AddToLibraryButton'
import getUser from '@/hooks/useUser'
import AddToLibraryButtonV2 from './AddToLibraryButtonV2'

async function getLibraryItem(user_id: string, itemId: string) {
  const res = await fetch(
    `http://localhost:3030/api/user-shows/${user_id}/${itemId}`,
    { method: 'GET' }
  )
  const data = await res.json()
  return data
}

export default async function MobileButtons({ itemId }: { itemId: string }) {
  const user = await getUser()
  let data
  user ? (data = await getLibraryItem(user.id, itemId)) : (data = [])

  return (
    <div className="flex w-full">
      <AddToLibraryButton user={user} isInLibrary={data} />

      <Dialog>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <DialogTrigger asChild>
              <Button
                className="w-full sm:max-md:px-1"
                variant="secondary"
                asChild
              >
                <Edit />
              </Button>
            </DialogTrigger>
          </DropdownMenuTrigger>

          <DialogOverlay>
            <DialogContent>
              <ListEditorDialogContent data={data} />
            </DialogContent>
          </DialogOverlay>
        </DropdownMenu>
      </Dialog>

      {/* <AddToLibraryButtonV2 /> */}
    </div>
  )
}
