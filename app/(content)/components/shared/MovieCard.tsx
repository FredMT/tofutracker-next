'use client'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card'
import dynamic from 'next/dynamic'
import { User } from 'lucia'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

type Props = {
  item: any
  user: User | undefined
}

export default function MovieCard({ item, user }: Props) {
  return (
    <Card className="min-h-[260px] min-w-[112px] border-0 sm:min-h-[302px] sm:min-w-[140px]">
      <Link href={`/${item.media_type}/${item.media_id}`}>
        <div className="relative">
          <Image
            className="w-full rounded-sm object-cover lg:h-[210px] lg:w-[140px]"
            src={`https://image.tmdb.org/t/p/w440_and_h660_face${item.poster_path}`}
            alt={item.title}
            width={112}
            height={168}
            sizes="100vw"
          />
          <div className="absolute right-1 top-1">
            {item.vote_average > 0 && (
              <Badge className="border-0 bg-gradient-to-r from-[#90CEA1] via-[#3CBEC9] to-[#00B3E5] text-black">
                <div>{`${item.vote_average.toFixed(1)}`}</div>
              </Badge>
            )}
          </div>
        </div>
      </Link>
      <div className="mt-4 flex flex-col gap-y-2">
        <Link href={`/${item.media_type}/${item.media_id}`}>
          <h3 className="line-clamp-2 text-[14px] font-semibold leading-6 text-secondary-foreground">
            {item.title}
          </h3>
          <div className="text-xs text-muted-foreground">
            {item.release_date && item.release_date.split(', ')[1]}
          </div>
        </Link>
      </div>
    </Card>
  )
}
