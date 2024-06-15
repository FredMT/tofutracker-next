'use client'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import ProfileBannerChosenItemBackdrops from './ProfileBannerChosenItemBackdrops'

type Props = {
  activityData: {
    success: boolean
    posters: {
      item_id: number
      item_type: string
      item_poster: string
      item_title: string
      activity_id: string
      item_created_at: string
      hasLiked?: boolean
      likes: number
    }[]
  }
  updateBannerFromLibraryItems: any
}

export default function ProfileBannerChosenItemDialog({
  activityData,
  updateBannerFromLibraryItems,
}: Props) {
  const [selectedItemID, setSelectedItemID] = useState<number>(0)
  const [selectedItemType, setSelectedItemType] = useState<string>('')
  const [selectedTitle, setSelectedTitle] = useState<string>('')

  return (
    <div className="grid w-full auto-cols-fr grid-cols-4 gap-x-2 gap-y-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 xl:gap-x-4 2xl:grid-cols-8">
      {activityData.posters.map((item: any) => (
        <div key={item.item_id}>
          <DialogTrigger
            asChild
            onClick={() => {
              setSelectedItemID(item.item_id)
              setSelectedItemType(item.item_type)
              setSelectedTitle(item.item_title)
            }}
          >
            <img
              loading="lazy"
              src={item.item_poster}
              alt={item.item_title}
              className="rounded-md object-cover"
            />
          </DialogTrigger>
          <DialogContent key={item.item_id} className="overflow-y-scroll">
            <DialogHeader>
              <DialogTitle>
                <div className="flex flex-col gap-1">
                  <span>{selectedTitle}</span>
                  <span className="text-xs text-muted-foreground">
                    Click on a picture to choose it as your banner picture
                  </span>
                </div>
              </DialogTitle>
            </DialogHeader>
            <ProfileBannerChosenItemBackdrops
              selectedItemID={selectedItemID}
              selectedItemType={selectedItemType}
              updateBannerFromLibraryItems={updateBannerFromLibraryItems}
            />
          </DialogContent>
        </div>
      ))}
    </div>
  )
}
