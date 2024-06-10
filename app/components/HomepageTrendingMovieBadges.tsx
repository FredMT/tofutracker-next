import { Badge } from '@/components/ui/badge'
import React from 'react'

type Props = {
  genre_ids: number[]
}

const genreMap: { [key: number]: string } = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  878: 'Science Fiction',
  10764: 'Reality',
  10765: 'Sci-Fi & Fantasy',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
}

export default function HomepageTrendingMovieBadges({ genre_ids }: Props) {
  return (
    <div className="absolute bottom-5 left-0 right-0 mx-auto flex justify-center">
      <div className="flex gap-x-4">
        {genre_ids.map((id, index) => (
          <Badge key={index} className="border-white bg-transparent text-white">
            {genreMap[id]}
          </Badge>
        ))}
      </div>
    </div>
  )
}
