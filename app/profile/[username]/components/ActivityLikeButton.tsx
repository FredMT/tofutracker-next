"use client";
import { Heart } from "lucide-react";
import React, { useState } from "react";

type Props = {
  activity_id: string;
  user_id: string;
  hasLiked: boolean;
  likeActivity: (data: any) => void;
};

const ActivityLikeButton: React.FC<Props> = ({
  user_id,
  activity_id,
  hasLiked,
  likeActivity,
}) => {
  const [isLiked, setIsLiked] = useState(hasLiked);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("activity_id", activity_id);

    likeActivity({ formData });
    setIsLiked(!isLiked);
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">
        <Heart
          className={`size-6 ${isLiked ? "text-red-500 fill-red-500" : ""}`}
        />
      </button>
    </form>
  );
};

export default ActivityLikeButton;
