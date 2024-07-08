'use client'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { notFound } from 'next/navigation'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import UseFormStatusPendingButton from '@/app/components/UseFormStatusPendingButton'
import { useFormState } from 'react-dom'

export default function ProfileBannerChosenItemBackdrops({
  selectedItemID,
  selectedItemType,
  updateBannerFromLibraryItems,
}: {
  selectedItemID: number
  selectedItemType: string
  updateBannerFromLibraryItems: any
}) {
  const [state, formAction] = useFormState(updateBannerFromLibraryItems, null)

  const [selectedBackdrop, setSelectedBackdrop] = useState<string>('')
  const { data, error, isLoading } = useSWR(
    `http://localhost:8080/api/gettoptenbackdrops/${selectedItemType}/${selectedItemID}`,
    fetcher
  )

  if (error) {
    return notFound()
  }

  if (isLoading) {
    return
  }

  if (data) {
    return (
      <DialogFooter>
        <Dialog>
          <div className="flex max-h-[85vh] flex-col gap-4">
            {data.data.map((item: any) => (
              <div key={item.file_path}>
                <DialogTrigger asChild>
                  <img
                    loading="lazy"
                    src={`https://image.tmdb.org/t/p/original/${item.file_path}`}
                    alt="backdrop"
                    width={item.width}
                    height={item.height}
                    onClick={() => setSelectedBackdrop(item.file_path)}
                  />
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle className="flex justify-center">
                    Your banner choice
                  </DialogTitle>
                  <div className="flex flex-col gap-4 p-6">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${selectedBackdrop}`}
                      alt="backdrop"
                      width={item.width}
                      height={item.height}
                    />
                    <form action={formAction}>
                      <input
                        type="hidden"
                        value={selectedBackdrop}
                        name="file_path"
                      />
                      <UseFormStatusPendingButton
                        text="Choose as banner"
                        style="w-full"
                      />
                    </form>
                  </div>
                </DialogContent>
              </div>
            ))}
          </div>
        </Dialog>
      </DialogFooter>
    )
  }
}
