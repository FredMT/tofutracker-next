import { Card } from '@/components/ui/card'
import React from 'react'
import dynamic from 'next/dynamic'
import ExpandableText from '@/app/(content)/components/shared/ShowMore'

const PreviousNextEpisode = dynamic(
  () => import('@/app/components/PreviousNextEpisode'),
  {
    ssr: false,
  }
)

export default async function Overview({
  overview,
  next_episode = { first_aired: 0 },
  previous_episode = { first_aired: 0 },
}: {
  overview: string
  next_episode?: {
    season?: number
    number?: number
    title?: string
    overview?: string
    first_aired: number
    episode_type?: string
  }
  previous_episode?: {
    season?: number
    number?: number
    title?: string
    overview?: string
    first_aired: number
    episode_type?: string
  }
}) {
  return (
    <Card className="min-h-[100px] rounded-none border-x-0 border-t-0 pb-8">
      <ExpandableText text={overview} maxLines={3} />
      {/* <div className="mt-4 flex gap-2">
        {previous_episode.season && (
          <PreviousNextEpisode
            season_number={previous_episode.season}
            episode_number={previous_episode.number}
            title={previous_episode.title}
            overview={previous_episode.overview}
            first_aired={previous_episode.first_aired}
            isNext={false}
            episode_type={previous_episode.episode_type}
          />
        )}
        {next_episode.season && (
          <PreviousNextEpisode
            season_number={next_episode.season}
            episode_number={next_episode.number}
            title={next_episode.title}
            overview={next_episode.overview}
            first_aired={next_episode.first_aired}
            isNext={true}
            episode_type={next_episode.episode_type}
          />
        )}
      </div> */}
    </Card>
  )
}
