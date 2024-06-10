import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="mt-20 px-6">
      <div className="flex gap-6 max-sm:flex-col">
        <Skeleton className="h-12 w-80 sm:h-40"></Skeleton>
        <div className="flex w-full flex-col">
          <div>
            <div className="text-xl font-medium">Activity</div>
            <Separator className="mt-2" />
          </div>
          <div className="mb-6 grid grid-cols-3 gap-4 sm:mt-6 sm:grid-cols-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="min-h-[228px] min-w-12"></Skeleton>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
