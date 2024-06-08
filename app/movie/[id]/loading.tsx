import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <div className="sm:hidden flex flex-col gap-6">
        <Skeleton className="h-[300px] w-full"></Skeleton>
        <div className="flex justify-center">
          <Skeleton className="h-[186px] w-[124px]"></Skeleton>
        </div>
        <div className="px-4 flex flex-col">
          <Skeleton className="h-16"></Skeleton>
          <Separator className="my-4" />
          <Skeleton className="h-16"></Skeleton>
          <Separator className="my-4" />
          <Skeleton className="h-10 mb-2"></Skeleton>
        </div>
      </div>

      <div className="max-sm:hidden flex flex-col mb-6">
        <Skeleton className="h-[576px] w-full mb-6"></Skeleton>
        <div className="flex px-4 gap-6">
          <div className="flex flex-col gap-6">
            <Skeleton className="w-[182px] h-[273px]"></Skeleton>
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
  );
}
