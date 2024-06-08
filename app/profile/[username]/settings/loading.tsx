import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function loading() {
  return (
    <div className="flex flex-col mt-16 text-xl px-6 gap-4">
      <div className="text-2xl py-4 w-20">Settings</div>
      <Skeleton className="py-4"></Skeleton>
      <Separator />
      <Skeleton className="py-4"></Skeleton>
      <Separator />
    </div>
  );
}
