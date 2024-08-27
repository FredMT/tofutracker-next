import { ClockIcon } from 'lucide-react'
import React from 'react'
import EpisodeOverview from './EpisodeOverview'
import { format } from 'date-fns'
import Image from 'next/image'

export default function Episodes({
  backdrop_path,
  episodes,
}: {
  episodes: any
  backdrop_path: string
}) {
  return (
    <div className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {episodes.map((episode: any) => (
        <div key={episode.id} className="flex flex-col gap-4">
          <Image
            src={
              episode.image
                ? `https://artworks.thetvdb.com${episode.image}`
                : episode.still_path
                  ? `https://image.tmdb.org/t/p/original${episode.still_path}`
                  : `https://image.tmdb.org/t/p/original${backdrop_path}`
            }
            alt={`Episode ${episode.number}: ${episode.name}`}
            className="aspect-video w-full rounded-lg object-cover"
            width={140}
            height={80}
          />
          <div className="grid gap-1">
            <div className="font-medium">{`Episode ${episode.number || episode.episode_number}${episode.name ? `: ${episode.name}` : ''}`}</div>
            {episode.overview && (
              <div className="text-muted-foreground">
                <EpisodeOverview overview={episode.overview} />
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ClockIcon className="h-4 w-4" />
              {episode.aired ? (
                <span>{format(new Date(episode.aired), 'do MMMM, yyyy')}</span>
              ) : episode.air_date ? (
                <span>
                  {format(new Date(episode.air_date), 'do MMMM, yyyy')}
                </span>
              ) : null}
              {episode.runtime && (
                <>
                  <span>•</span>
                  <span>
                    {typeof episode.runtime === 'number'
                      ? `${episode.runtime} min`
                      : episode.runtime}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
