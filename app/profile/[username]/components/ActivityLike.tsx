"use client";

import { startTransition, useOptimistic } from "react";
import { Heart } from "lucide-react";

export default function ActivityLike({
  hasLiked,
  likes,
  username,
  title,
  activity_id,
  likeActivity,
  userId,
}: {
  userId: string;
  hasLiked: boolean;
  likes: number;
  username: string;
  title: string;
  activity_id: string;
  likeActivity: (data: any) => void;
}) {
  // Using useOptimistic to handle isLiked state optimistically
  const [optimisticIsLiked, setOptimisticIsLiked] = useOptimistic(
    hasLiked,
    (currentIsLiked, action: "TOGGLE") => {
      return !currentIsLiked; // Toggle the current state
    }
  );

  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    likes,
    (likes, action: "LIKE" | "DISLIKE") => {
      if (action === "LIKE") {
        return likes + 1;
      } else {
        return likes - 1;
      }
    }
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userId);
    formData.append("activity_id", activity_id);

    likeActivity({ formData });

    startTransition(() => {
      setOptimisticLikes(optimisticIsLiked ? "DISLIKE" : "LIKE");
      setOptimisticIsLiked("TOGGLE");
    });
  };

  return (
    <div className="text-sm flex max-md:hidden leading-6">
      <div className="flex flex-col">
        <div>{`${username} added ${title} to their Library`}</div>
        <div className="text-sm text-muted-foreground">
          {optimisticLikes ? `${optimisticLikes} likes` : ""}
        </div>
      </div>

      {userId && (
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <Heart
              className={`size-6 ${
                optimisticIsLiked ? "text-red-500 fill-red-500" : ""
              }`}
            />
          </button>
        </form>
      )}
    </div>
  );
}