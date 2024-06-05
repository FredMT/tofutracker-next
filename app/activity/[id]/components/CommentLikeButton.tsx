"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

export default function CommentLikeButton({
  commentId,
  toggleLike,
  loggedInUserId,
  activity_id,
  hasLiked,
}: {
  commentId: string;
  toggleLike: (formData: FormData) => void;
  loggedInUserId: string;
  activity_id: string;
  hasLiked: boolean;
}) {
  const [hasLikedComment, setHasLikedComment] = useState(hasLiked);

  const handleLike = async () => {
    const formData = new FormData();
    formData.append("activity_id", commentId);
    formData.append("reference_id", activity_id);
    formData.append("user_id", loggedInUserId);
    await toggleLike(formData); // Call the action with formData
    setHasLikedComment(!hasLikedComment);
  };

  return (
    <button onClick={handleLike}>
      <Heart className={`size-4 ${hasLikedComment ? "fill-red-500" : ""}`} />
    </button>
  );
}
