import { Card } from '@/components/ui/card'
import React from 'react'

type CrewMember = {
  job: string
  name: string
  id: number
}

export default async function Details({
  crew,
  budget,
  revenue,
}: {
  crew: CrewMember[]
  budget: number
  revenue: number
}) {
  const movieCredits = crew.filter(
    (person) =>
      person.job === 'Director' ||
      person.job === 'Writer' ||
      person.job === 'Story' ||
      person.job === 'Screenplay' ||
      person.job === 'Novel'
  )

  const sortedMovieCredits = movieCredits.sort((a, b) => {
    if (a.job === 'Director') return -1
    if (b.job === 'Director') return 1
    return 0
  })

  return (
    <Card className="rounded-none border-x-0 border-t-0 pb-8">
      <div className="mt-4 grid grid-cols-[75px_auto] gap-y-2 lg:grid-cols-[75px_1fr_75px_1fr] lg:gap-y-4">
        {Object.entries(
          sortedMovieCredits.reduce(
            (acc: { [key: string]: string[] }, credit) => {
              ;(acc[credit.job] = acc[credit.job] || []).push(credit.name)
              return acc
            },
            {}
          )
        ).map(([job, names], index) => (
          <React.Fragment key={index}>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              {job}
            </div>
            <div className="flex flex-col">
              {names.slice(0, 5).map((name, nameIndex) => (
                <p
                  key={nameIndex}
                  className="ml-6 text-[14px] font-medium leading-[24px]"
                >
                  {name}
                </p>
              ))}
            </div>
          </React.Fragment>
        ))}
        {Boolean(budget) && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Budget
            </div>
            <div className="ml-6 text-[14px] font-medium leading-[24px]">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
              }).format(budget)}
            </div>
          </>
        )}
        {Boolean(revenue) && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Revenue
            </div>
            <div className="ml-6 text-[14px] font-medium leading-[24px]">
              {new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
              }).format(revenue)}
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
