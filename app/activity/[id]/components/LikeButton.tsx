"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function LikeButton({
  like,
  activity_id,
  user_id,
  likeStatus,
}: {
  like: (formData: FormData) => void;
  activity_id: string;
  user_id: string;
  likeStatus: boolean;
}) {
  return (
    <form action={like}>
      <input type="hidden" name="activity_id" value={activity_id} />
      <input type="hidden" name="user_id" value={user_id} />
      <input type="hidden" name="reference_id" value={activity_id} />
      <Button variant="ghost" type="submit" className="p-0">
        <Heart className={`${likeStatus ? "fill-red-500 " : ""}`} />
      </Button>
    </form>
  );
}
