import React from 'react'
import { Card } from './ui/card'
import Image from 'next/image'
import Link from 'next/link'

type Movie = {
  id: number
  title: string
  poster_path: string
  year: string
  rating: number
  media_type: string
}

export default function MovieCard({
  id,
  title,
  poster_path,
  year,
  rating,
  media_type,
}: Movie) {
  return (
    <Card className="min-h-[260px] min-w-[112px] border-0 sm:min-h-[302px] sm:min-w-[140px]">
      <Link
        href={`/${media_type}/${id}-${title
          .replace(/ /g, '-')
          .replace(/:/g, '')}`}
      >
        <div>
          <Image
            className="w-full rounded-sm object-cover lg:h-[210px] lg:w-[140px]"
            src={
              media_type !== 'anime'
                ? `https://image.tmdb.org/t/p/w440_and_h660_face${poster_path}`
                : `https://tofutrackeranime2.b-cdn.net/posters/${poster_path}`
            }
            alt={title}
            width={112}
            height={168}
            priority
            sizes="100vw"
          />
        </div>
      </Link>
      <div className="mt-4 flex flex-col gap-y-2">
        <Link
          href={`/${media_type}/${id}-${title
            .replace(/ /g, '-')
            .replace(/:/g, '')}`}
        >
          <h3 className="line-clamp-2 text-[14px] font-semibold leading-6 text-secondary-foreground">
            {title}
          </h3>
        </Link>

        <span className="flex gap-1 text-xs text-muted-foreground">
          <div>{year && <p>{`${year}`}</p>}</div>
          <div>{rating > 0 && <p>{`• ${rating}`}</p>}</div>
        </span>
      </div>
    </Card>
  )
}
