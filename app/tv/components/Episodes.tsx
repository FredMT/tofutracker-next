import { ClockIcon } from 'lucide-react'
import React from 'react'
import EpisodeOverview from './EpisodeOverview'

export default function Episodes({
  episodes,
  backdrop_path,
}: {
  episodes: any[]
  backdrop_path: string
}) {
  return (
    <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode: any) => (
        <div key={episode.id} className="flex flex-col gap-4">
          <img
            src={
              episode.still_path
                ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                : `https://image.tmdb.org/t/p/original${backdrop_path}`
            }
            alt={`Episode ${episode.episode_number}: ${episode.name}`}
            className="aspect-video w-full rounded-lg object-cover"
          />
          <div className="grid gap-1">
            <div className="font-medium">{`Episode ${episode.episode_number}: ${episode.name}`}</div>
            <div className="text-muted-foreground">
              <EpisodeOverview overview={episode.overview} />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ClockIcon className="h-4 w-4" />
              <span>{episode.air_date}</span>
              {episode.runtime !== '0m' && (
                <>
                  <span>•</span>
                  <span>{episode.runtime}</span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
