import Image from 'next/image'
import React from 'react'
import MobileButtons from '@/app/components/MobileButtons'

export default async function AnimePoster({
  title,
  poster,
  id,
  seasonId,
}: {
  title: string
  poster: string
  id: number
  seasonId?: number
}) {
  return (
    <div className="flex flex-col gap-y-6" id="poster">
      <div className="sticky top-6">
        <Image
          className="mb-6 h-[186px] w-[124px] rounded-sm border border-muted object-cover sm:h-[273px] sm:min-w-[182px] md:h-[336px] md:min-w-[224px]"
          src={
            poster
              ? `https://tofutrackeranime2.b-cdn.net/posters/${poster}`
              : 'https://placehold.co/600x900/jpg'
          }
          alt={title}
          width={600}
          height={900}
          priority
        />
        <div className="hidden gap-y-4 sm:flex sm:flex-col">
          <MobileButtons
            itemId={id.toString()}
            title={title}
            type="animetvseason"
            seasonId={seasonId}
          />
        </div>
      </div>
    </div>
  )
}
