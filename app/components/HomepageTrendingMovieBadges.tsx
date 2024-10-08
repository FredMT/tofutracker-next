import { Badge } from '@/components/ui/badge'
import React from 'react'

export default function HomepageTrendingMovieBadges({
  genres,
}: {
  genres: any
}) {
  if (!genres) return null
  return (
    <div className="absolute bottom-5 left-0 right-0 mx-auto flex justify-center">
      <div className="flex gap-x-4">
        {genres.map((item: any) => (
          <Badge
            key={item.id + Math.random()}
            className="border-white bg-transparent text-white"
          >
            {item.name}
          </Badge>
        ))}
      </div>
    </div>
  )
}
