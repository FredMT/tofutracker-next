'use client'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card'
import dynamic from 'next/dynamic'
import { User } from '@supabase/supabase-js'

const MovieCardHoverCard = dynamic(() => import('./MovieCardHoverCard'), {
  ssr: false,
})

type Props = {
  item: any
  user: User | null
}

export default function MovieCard({ item, user }: Props) {
  return (
    <Card className="min-h-[260px] min-w-[112px] border-0 sm:min-h-[302px] sm:min-w-[140px]">
      <HoverCard openDelay={150} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Link href={`/${item.media_type}/${item.id}`}>
            <img
              className="w-full rounded-sm object-cover lg:h-[210px] lg:w-[140px]"
              src={
                item.media_type !== 'anime'
                  ? `https://image.tmdb.org/t/p/w440_and_h660_face${item.poster_path}`
                  : `https://tofutrackeranime2.b-cdn.net/posters/${item.poster}`
              }
              alt={item.title}
              width={112}
              height={168}
              sizes="100vw"
            />
          </Link>
        </HoverCardTrigger>
        <MovieCardHoverCard item={item} user={user} />
      </HoverCard>
      <div className="mt-4 flex flex-col gap-y-2">
        <Link href={`/${item.media_type}/${item.id}`}>
          <h3 className="line-clamp-2 text-[14px] font-semibold leading-6 text-secondary-foreground">
            {item.title}
          </h3>
        </Link>

        <span className="flex gap-1 text-xs text-muted-foreground">
          <div>
            {item.year ||
              (item.start_date && (
                <p>{`${item.year || item.start_date.split('-')[0]}`}</p>
              ))}
          </div>
          <div>{item.rating > 0 && <p>{`• ${item.rating}`}</p>}</div>
        </span>
      </div>
    </Card>
  )
}
