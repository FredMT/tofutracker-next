import { Card } from "@/components/ui/card";
import React from "react";

export default async function Overview({ overview }: { overview: string }) {
  await new Promise((resolve) => setTimeout(resolve, 1300));
  return (
    <Card className="border-x-0 border-t-0 rounded-none pb-8">
      <div className="text-[16px] mt-4 font-normal leading-[28px]">
        {overview}
      </div>
    </Card>
  );
}
