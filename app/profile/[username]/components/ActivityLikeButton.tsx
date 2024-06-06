"use client";

import { Heart } from "lucide-react";

export default function ActivityLikeButton({
  activity_id,
}: {
  activity_id: string;
}) {
  return (
    <button className="self-baseline">
      <Heart className="size-6" />
    </button>
  );
}
