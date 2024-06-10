import React from 'react'
import Episode from './Episode'

type CrewMember = {
  job: string
  department: string
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

type GuestStar = {
  character: string
  credit_id: string
  order: number
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string | null
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

type SeasonData = {
  _id: string
  air_date: string
  episodes: Episode[]
  name: string
  overview: string
  id: number
  poster_path: string
  season_number: number
  vote_average: number
}

export default function Episodes({
  seasonData,
  seasonDataError,
  seasonDataLoading,
}: {
  seasonData: SeasonData
  seasonDataError: any
  seasonDataLoading: any
}) {
  const [expanded, setExpanded] = React.useState(false)
  const [showAllEpisodes, setShowAllEpisodes] = React.useState(false)

  if (seasonData) {
    let overview = ''
    if (seasonData.overview) {
      overview = seasonData.overview
    }

    const handleToggleExpand = () => {
      setExpanded(!expanded)
    }

    const handleToggleShowAllEpisodes = () => {
      setShowAllEpisodes(!showAllEpisodes)
    }

    const overviewText = expanded
      ? seasonData.overview
      : seasonData.overview.split(' ').slice(0, 20).join(' ')

    const episodesToShow = showAllEpisodes
      ? seasonData.episodes
      : seasonData.episodes.slice(0, 4)

    return (
      <div className="flex flex-col gap-y-2">
        {overviewText && (
          <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
            {overviewText}
            {seasonData.overview.split(' ').length > 20 && (
              <span
                className="cursor-pointer text-blue-500"
                onClick={handleToggleExpand}
              >
                {expanded ? ' Show less' : ' ...Show more'}
              </span>
            )}
          </div>
        )}
        {episodesToShow.map((episode, index) => {
          return <Episode key={index} episode={episode} />
        })}
        {seasonData.episodes.length > 4 && (
          <div
            className="flex cursor-pointer justify-end text-muted-foreground underline"
            onClick={handleToggleShowAllEpisodes}
          >
            {showAllEpisodes ? 'View less' : 'View all'}
          </div>
        )}
      </div>
    )
  }
}
