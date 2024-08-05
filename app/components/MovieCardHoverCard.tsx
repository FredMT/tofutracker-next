'use client'
import { Badge } from '@/components/ui/badge'
import { HoverCardContent, HoverCardPortal } from '@/components/ui/hover-card'
import React from 'react'
import { User } from 'lucia'
import AddToLibraryButtonHoverCard from './AddToLibraryButtonHoverCard'
import AddCheckInButton from './AddCheckInButton'

export default function MovieCardHoverCard({
  item,
  user,
}: {
  item: any
  user: User | undefined
}) {
  return (
    <HoverCardPortal container={document.body}>
      <HoverCardContent
        className="h-[300px] w-[450px] border-0 bg-[#7C3AED] bg-opacity-30 text-opacity-100 backdrop-blur-lg"
        sideOffset={0}
        side="top"
      >
        <div className="flex flex-col justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">{item.title}</div>
              {item.origin_country && (
                <div className="flex flex-row items-center justify-center gap-2">
                  {item.origin_country.map((country: string) => (
                    <img
                      key={country}
                      src={`http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
                      alt={country}
                      className="size-6"
                    />
                  ))}
                </div>
              )}
            </div>
            {item.tagline && (
              <div className="text-sm font-medium">{item.tagline}</div>
            )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {item.rating && (
              <Badge variant="outline" className="border-[#7C3AED] px-2">
                {item.rating}
              </Badge>
            )}
            <p className="text-sm">{item.release_date}</p>
            {item.runtime && item.runtime}
            {item.language && <p className="text-sm">{item.language}</p>}
            {item.content_rating && (
              <p className="text-sm">{item.content_rating}</p>
            )}
            {item.type && <p className="text-sm">{item.type}</p>}
            {item.episode_count && (
              <p className="text-sm">{item.episode_count} episodes</p>
            )}
          </div>

          {(item.overview || item.description) && (
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Overview</p>
              <p className="line-clamp-3 text-sm">
                {item.overview || item.description}
              </p>
            </div>
          )}

          <div className="flex flex-row justify-center gap-x-2">
            <AddToLibraryButtonHoverCard
              user={user}
              item={item}
              style="basis-1/2 min-w-[200px]"
            />
            <AddCheckInButton user={user} item={item} />
          </div>
        </div>
      </HoverCardContent>
    </HoverCardPortal>
  )
}
