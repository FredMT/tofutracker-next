import { Card } from '@/components/ui/card'
import React from 'react'

type CrewMember = {
  job: string
  person_name: string
  person_id: number
}[]

export default async function MovieDetails({
  budget,
  revenue,
  crew,
}: {
  budget: string
  revenue: string
  crew: CrewMember[]
}) {
  const staffEntries = Object.entries(crew).filter(
    ([_, staff]) => staff.length > 0
  )
  return (
    <Card className="rounded-none border-x-0 border-t-0 pb-8" id="details">
      <div className="mt-4 grid grid-cols-[75px_auto] gap-y-2 lg:grid-cols-[75px_1fr_75px_1fr] lg:gap-y-4">
        {staffEntries.map(([job, staff], index) => (
          <React.Fragment key={index}>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              {job}
            </div>
            <div className="flex flex-col">
              {staff.slice(0, 5).map((person: any, personIndex: any) => (
                <p
                  key={personIndex}
                  className="ml-6 text-[14px] font-medium leading-[24px]"
                >
                  {person.name}
                </p>
              ))}
            </div>
          </React.Fragment>
        ))}
        {Boolean(+budget.split('$')[1]) && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Budget
            </div>
            <div className="ml-6 text-[14px] font-medium leading-[24px]">
              {budget}
            </div>
          </>
        )}
        {Boolean(+revenue.split('$')[1]) && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Revenue
            </div>
            <div className="ml-6 text-[14px] font-medium leading-[24px]">
              {revenue}
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
