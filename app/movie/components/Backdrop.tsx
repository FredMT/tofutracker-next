import Image from 'next/image'
import React from 'react'

export default async function Backdrop({
  backdrop_path,
  title,
  logo_path,
}: {
  backdrop_path: string
  title: string
  logo_path: string
}) {
  return (
    <div className="relative overflow-hidden">
      <Image
        className="h-[288px] w-full object-cover sm:h-[576px] sm:w-full"
        src={`https://image.tmdb.org/t/p/original${backdrop_path}`}
        alt={title}
        width={1920}
        height={1080}
        priority
      />
      <Image
        src={`https://image.tmdb.org/t/p/original${logo_path}`}
        alt={title}
        width={1920}
        height={1080}
        className="absolute -bottom-[45%] left-1/2 h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 transform object-contain sm:h-[400px] sm:w-[400px]"
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center bg-gradient-to-t from-black to-transparent p-12 opacity-35" />
      <div className="absolute left-0 right-0 top-0 flex justify-center bg-gradient-to-b from-black to-transparent p-12 opacity-50" />
    </div>
  )
}
