import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mt-20 px-6">
      <div className="flex max-sm:flex-col gap-6">
        <Skeleton className="h-12 sm:h-40 w-80"></Skeleton>
        <div className="flex flex-col w-full">
          <div>
            <div className="text-xl font-medium">Activity</div>
            <Separator className="mt-2" />
          </div>
          <div className="grid gap-4 sm:mt-6 grid-cols-3 sm:grid-cols-4 mb-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="min-h-[228px] min-w-12"></Skeleton>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
