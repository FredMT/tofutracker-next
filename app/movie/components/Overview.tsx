import { Card } from '@/components/ui/card'
import React from 'react'

export default async function Overview({ overview }: { overview: string }) {
  return (
    <Card className="rounded-none border-x-0 border-t-0 pb-8">
      <div className="mt-4 text-[16px] font-normal leading-[28px]">
        {overview}
      </div>
    </Card>
  )
}
