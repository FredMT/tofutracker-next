import Image from 'next/image'
import React from 'react'
import { format } from 'date-fns'

type Person = {
  credit_id: string
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
}

type CrewMember = Person & {
  department: string
  job: string
}

type GuestStar = Person & {
  character: string
  order: number
}

type Episode = {
  air_date: string
  episode_number: number
  episode_type: string
  id: number
  name: string
  overview: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
  crew: CrewMember[]
  guest_stars: GuestStar[]
}

export default function Episode({ episode }: { episode: Episode }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleToggleExpand = () => {
    setExpanded(!expanded)
  }

  const overviewText = expanded
    ? episode.overview
    : episode.overview.split(' ').slice(0, 10).join(' ')
  return (
    <div className="flex gap-x-5">
      <div className="flex h-[80px] min-w-[140px]">
        <Image
          src={
            episode.still_path
              ? `https://image.tmdb.org/t/p/original${episode.still_path}`
              : `https://placehold.co/600x400/000000/FFFFFF.png?text=${episode.name}`
          }
          alt="poster"
          width={140}
          height={80}
        />
      </div>
      <div className="flex flex-col justify-between py-1">
        <div className="flex flex-col">
          <div className="text-[14px] font-normal leading-[24px]">
            {episode.name}
          </div>
          <div className="text-[12px] leading-[20px] text-muted-foreground">
            {format(new Date(episode.air_date), 'dd MMM yyyy')}
            {episode.runtime && ` • ${episode.runtime}m`}
          </div>
        </div>
        <div className="text-[12px] font-normal leading-[20px]">
          {overviewText && (
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              {overviewText}
              {episode.overview.split(' ') && (
                <span
                  className="cursor-pointer text-blue-500"
                  onClick={handleToggleExpand}
                >
                  {expanded ? ' Show less' : ' ...Show more'}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
