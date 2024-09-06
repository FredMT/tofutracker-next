import { Card } from '@/components/ui/card'
import React from 'react'

type Creator = {
  id: number
  credit_id: string
  name: string
  gender: number
  profile_path: string | null
}

type ProductionCompany = {
  id: number
  logo_path: string | null
  name: string
  origin_country: string
}

type Props = {
  type: string
  status: string
  creators: Creator[]
  production_companies: ProductionCompany[]
  seasons?: number
  episodes?: number
  data?: any
}

export default async function Details({
  status,
  creators,
  production_companies,
  seasons,
  episodes,
  type,
  data,
}: Props) {
  return (
    <Card className="rounded-none border-x-0 border-t-0 pb-8" id="details">
      <div className="mt-4 grid grid-cols-[75px_auto] gap-y-2 lg:grid-cols-[75px_1fr_75px_1fr] lg:gap-y-4">
        {type && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Type
            </div>
            <div className="ml-6 text-[14px] font-medium leading-[24px]">
              {type}
            </div>
          </>
        )}
        {creators && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Status
            </div>
            <div className="ml-6 text-[14px] font-medium leading-[24px]">
              {status}
            </div>
          </>
        )}
        {creators && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Creators
            </div>
            <div className="flex flex-col">
              {creators.map((creator, index) => (
                <p
                  key={index}
                  className="ml-6 text-[14px] font-medium leading-[24px]"
                >
                  {creator.name}
                </p>
              ))}
            </div>
          </>
        )}
        {production_companies && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Production Companies
            </div>
            <div className="flex flex-col">
              <p className="ml-6 text-[14px] font-medium leading-[24px]">
                {production_companies
                  .slice(0, 3)
                  .map((company, index, array) => (
                    <React.Fragment key={company.id}>
                      <span>{company.name}</span>
                      {index < array.length - 1 && <span>, </span>}
                    </React.Fragment>
                  ))}
              </p>
            </div>
          </>
        )}

        {seasons && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Seasons
            </div>
            <div className="ml-6 text-[14px] font-medium leading-[24px]">
              {seasons}
            </div>
          </>
        )}
        {episodes && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Episodes
            </div>
            <div className="ml-6 text-[14px] font-medium leading-[24px]">
              {episodes}
            </div>
          </>
        )}
        {Boolean(data?.episodes?.length) && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              No. of episodes
            </div>
            <div className="ml-6 text-[14px] font-medium leading-[24px]">
              {data.episodes.length}
            </div>
          </>
        )}
        {data?.total_season_runtime && (
          <>
            <div className="text-[14px] font-medium leading-[24px] text-muted-foreground">
              Total runtime
            </div>
            <div className="ml-6 text-[14px] font-medium leading-[24px]">
              {data.total_season_runtime}
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
