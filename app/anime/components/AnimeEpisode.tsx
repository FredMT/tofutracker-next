import Image from 'next/image'
import React, { useState } from 'react'
import { format } from 'date-fns'

type Episode = {
  air_date: string
  episode_number: number
  episode_name: string
  episode_overview: string
  runtime: number
  still_path: string
}

export default function AnimeEpisode({ episode }: { episode: Episode }) {
  const [expanded, setExpanded] = useState(false)

  const handleToggleExpand = () => {
    setExpanded(!expanded)
  }

  const overviewText = expanded
    ? episode.episode_overview
    : episode.episode_overview.split(' ').slice(0, 10).join(' ')

  return (
    <div className="flex gap-x-5">
      <div className="flex h-[80px] min-w-[140px]">
        <Image
          src={
            episode.still_path
              ? `https://image.tmdb.org/t/p/original${episode.still_path}`
              : `https://placehold.co/600x400/000000/FFFFFF.png?text=${episode.episode_name}`
          }
          alt="poster"
          width={140}
          height={80}
        />
      </div>
      <div className="flex flex-col justify-between py-1">
        <div className="flex flex-col">
          <div className="text-[14px] font-normal leading-[24px]">
            {episode.episode_name}
          </div>
          <div className="text-[12px] leading-[20px] text-muted-foreground">
            {format(new Date(episode.air_date), 'dd MMM yyyy')} •{' '}
            {episode.runtime}m
          </div>
        </div>
        <div className="text-[12px] font-normal leading-[20px]">
          {overviewText && (
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              {overviewText}
              {episode.episode_overview.split(' ') && (
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
