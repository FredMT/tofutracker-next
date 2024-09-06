import React from 'react'
import AnimeEpisode from './AnimeEpisode'

type Episode = {
  air_date: string
  episode_number: number
  episode_name: string
  episode_overview: string
  runtime: number
  still_path: string
}

type AnimeEpisodesProps = {
  episodes: Episode[]
}

export default function AnimeEpisodes({ episodes }: AnimeEpisodesProps) {
  const [showAllEpisodes, setShowAllEpisodes] = React.useState(false)

  const episodesToShow = showAllEpisodes ? episodes : episodes.slice(0, 4)

  return (
    <div className="flex flex-col gap-y-2">
      <div
        className="transition-max-height overflow-hidden duration-500 ease-in-out"
        style={{ maxHeight: showAllEpisodes ? '3000px' : '600px' }}
      >
        {episodesToShow.map((episode, index) => {
          return <AnimeEpisode key={index} episode={episode} />
        })}
      </div>
      {episodes.length > 4 && (
        <div
          className="flex cursor-pointer justify-end text-muted-foreground underline"
          onClick={() => setShowAllEpisodes(!showAllEpisodes)}
        >
          {showAllEpisodes ? 'View less' : 'View all'}
        </div>
      )}
    </div>
  )
}
