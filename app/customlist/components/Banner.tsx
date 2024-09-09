import React from 'react'
import { Button } from '@/components/ui/button'
import { useEditMode } from '@/app/customlist/contexts/EditModeContext'

interface BannerProps {
  bannerUrl: string
  onChooseBanner: () => void
  onUploadBanner: () => void
}

const Banner: React.FC<BannerProps> = ({
  bannerUrl,
  onChooseBanner,
  onUploadBanner,
}) => {
  const { isEditMode } = useEditMode()

  return (
    <div className="relative">
      <div
        className="relative h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerUrl})`,
        }}
      />
      {isEditMode && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
          <div className="space-x-4 space-y-4 text-center">
            <Button
              onClick={onChooseBanner}
              className="w-48 bg-white text-black hover:bg-gray-200"
            >
              Choose banner from item
            </Button>
            <Button
              onClick={onUploadBanner}
              className="w-48 bg-white text-black hover:bg-gray-200"
            >
              Upload banner
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Banner
