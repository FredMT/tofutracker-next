'use client'
import { useState } from 'react'

export default function OverviewText({ overview }: { overview: string }) {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="mt-4">
      <div
        className={`transition-max-height overflow-hidden text-[16px] font-normal leading-[28px] duration-500 ease-in-out`}
        style={{ maxHeight: showMore ? '1000px' : '84px' }}
      >
        {overview}
      </div>
      {overview.length > 300 && (
        <p
          className="mt-2 cursor-pointer text-blue-500 hover:text-blue-700"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'Show less' : 'Show more'}
        </p>
      )}
    </div>
  )
}
