import React from 'react'

import { Badge } from './ui/badge'
import useSWR from 'swr'
import { fetcher } from '@/utils/fetcher'
import { format, parseISO } from 'date-fns'

export default function MovieCardHoverCard({
  item,
  year,
  rating,
}: {
  item: any
  year: string
  rating: number
}) {
  console.log(item)
  return (
    <div className="flex flex-col gap-4">
      <div className="text-lg font-bold">{item.title}</div>
      {item.tagline && (
        <div className="text-sm font-medium">{item.tagline}</div>
      )}
      {item.overview && (
        <div className="line-clamp-3 text-sm font-medium">{item.overview}</div>
      )}
      {item.description && (
        <div className="line-clamp-3 text-sm font-medium">
          {item.description}
        </div>
      )}
    </div>
  )
}
