"use client";

import { Heart } from "lucide-react";
import { useState } from "react";

type Comment = {
  id: string;
  activity_id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
  likes: number;
  parent_comment_id: string;
  hasLiked: boolean;
};

export default function CommentLikeButton({ comment }: { comment: Comment }) {
  const [isLiked, setIsLiked] = useState(comment.hasLiked);
  const [likes, setLikes] = useState(comment.likes);

  const handleLike = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_id", comment.user_id);
    formData.append("comment_id", comment.id);
    formData.append("username", comment.username);
    formData.append("activity_id", comment.activity_id);

    try {
      await fetch("/api/likeComment", {
        method: "POST",
        body: formData,
      });

      setIsLiked(!isLiked);
      if (isLiked) {
        setLikes(likes - 1);
      } else {
        setLikes(likes + 1);
      }
    } catch (error) {
      console.error("Error submitting like:", error);
    }
  };

  return (
    <form onSubmit={handleLike}>
      <button className="self-baseline" type="submit">
        <Heart
          className={`size-6 ${isLiked ? "text-red-500 fill-red-500" : ""}`}
        />
        <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 text-sm">
          {likes}
        </div>
      </button>
    </form>
  );
}
