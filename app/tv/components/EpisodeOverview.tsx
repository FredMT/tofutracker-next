'use client'
import React, { useState, useRef, useEffect } from 'react'

const EpisodeOverview = ({ overview }: { overview: string }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const words = overview.split(' ')
  const truncatedOverview =
    words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '')
  const needsTruncation = words.length > 20

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isExpanded
        ? `${contentRef.current.scrollHeight}px`
        : '4.5em' // Adjust this value based on your text size and line height
    }
  }, [isExpanded])

  return (
    <div className="relative">
      <div
        ref={contentRef}
        className="overflow-hidden text-muted-foreground transition-[max-height] duration-300 ease-in-out"
        style={{ maxHeight: '4.5em' }} // Initial height before JS kicks in
      >
        {overview}
      </div>
      {needsTruncation && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 text-blue-500 hover:underline focus:outline-none"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  )
}

export default EpisodeOverview
