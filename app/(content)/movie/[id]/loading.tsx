import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <>
      <div className="flex flex-col gap-6 sm:hidden">
        <Skeleton className="h-[300px] w-full"></Skeleton>
        <div className="flex justify-center">
          <Skeleton className="h-[186px] w-[124px]"></Skeleton>
        </div>
        <div className="flex flex-col px-4">
          <Skeleton className="h-16"></Skeleton>
          <Separator className="my-4" />
          <Skeleton className="h-16"></Skeleton>
          <Separator className="my-4" />
          <Skeleton className="mb-2 h-10"></Skeleton>
        </div>
      </div>

      <div className="mb-6 flex flex-col max-sm:hidden">
        <Skeleton className="mb-6 h-[70vh] w-full"></Skeleton>
        <div className="flex gap-6 px-5 xl:px-40">
          <div className="flex flex-col gap-6">
            <Skeleton className="h-[273px] w-[182px]"></Skeleton>
            <Skeleton className="h-10"></Skeleton>
            <Skeleton className="h-10"></Skeleton>
          </div>
          <div className="w-full">
            <Skeleton className="h-20"></Skeleton>
            <Separator className="my-4" />
            <Skeleton className="h-28"></Skeleton>
            <Separator className="my-4" />
            <Skeleton className="h-36"></Skeleton>
          </div>
        </div>
      </div>
    </>
  )
}
