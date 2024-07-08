import Image from 'next/image'
import React from 'react'
import MobileButtons from './MobileButtons'

export default async function Poster({
  poster_path,
  title,
  id,
  item_type,
}: {
  poster_path: string
  title: string
  id: number
  item_type: string
}) {
  return (
    <div className="flex flex-col gap-y-6" id="poster">
      <div className="sticky top-6">
        <Image
          className="mb-6 h-[186px] w-[124px] rounded-sm border border-muted object-cover sm:h-[273px] sm:w-[182px] md:h-[336px] md:min-w-[224px]"
          src={`https://image.tmdb.org/t/p/original${poster_path}`}
          alt={title}
          width={600}
          height={900}
          priority
        />
        <div className="hidden gap-y-4 sm:flex sm:flex-col">
          <MobileButtons item_id={id} />
        </div>
      </div>
    </div>
  )
}
