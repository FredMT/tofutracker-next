import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

export default function loading() {
  return (
    <div className="mt-16 flex flex-col gap-4 px-6 text-xl">
      <div className="w-20 py-4 text-2xl">Settings</div>
      <Skeleton className="py-4"></Skeleton>
      <Separator />
      <Skeleton className="py-4"></Skeleton>
      <Separator />
    </div>
  )
}
