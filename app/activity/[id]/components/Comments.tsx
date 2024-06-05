"use client";
import { Reply } from "lucide-react";
import useSWR from "swr";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CommentBox from "./CommentBox";
import { useRef, useState } from "react";
import { fetcher } from "@/utils/fetcher";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";
import CommentLikeButton from "./CommentLikeButton";

type Comment = {
  id: string;
  parent_comment_id?: string;
  user_id: string;
  username: string;
  created_at: string;
  likes: number;
  content: string;
  hasLiked: boolean;
};

const organizeComments = (comments: Comment[]) => {
  const commentsByParentId: { [key: string]: Comment[] } = {};
  comments.forEach((comment) => {
    const parentId = comment.parent_comment_id || "root";
    if (!commentsByParentId[parentId]) {
      commentsByParentId[parentId] = [];
    }
    commentsByParentId[parentId].push(comment);
  });
  return commentsByParentId;
};

export default function Comments({
  user_id,
  activity_id,
  toggleLike,
}: {
  user_id: string;
  activity_id: string;
  toggleLike: (formData: FormData) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [replyToUserId, setReplyToUserId] = useState<string | null>(null);
  const [parentCommentId, setParentCommentId] = useState<string | null>(null);

  const handleReplyClick = (userId: string, commentId: string) => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setReplyToUserId(userId);
    setParentCommentId(commentId);
  };

  const { data: comments, error } = useSWR(
    `https://tofutracker-3pt5y.ondigitalocean.app/api/comments/${activity_id}/${user_id}`,
    fetcher
  );

  if (error) {
    console.error(error);
    return;
  }

  if (!comments) {
    return <div>Loading...</div>;
  }

  const commentsByParentId = organizeComments(comments);

  const renderComments = (parentId: string) => {
    if (!commentsByParentId[parentId]) {
      return null;
    }

    return commentsByParentId[parentId].map((comment) => (
      <div key={comment.id} className="flex flex-col gap-2">
        <div className="flex gap-2 justify-between">
          <div className="flex gap-2">
            <Link href={`/profile/${comment.username}`}>
              <Avatar className="size-6">
                <AvatarImage
                  src={`https://github.com/shadcn.png`}
                  alt="Profile picture"
                />
              </Avatar>
            </Link>
            <Link href={`/profile/${comment.username}`}>
              <p className="text-sm flex items-center">{comment.username}</p>
            </Link>
            <p className="text-sm text-muted-foreground flex">
              {formatDistanceToNowStrict(new Date(comment.created_at))}
            </p>
          </div>
          <div className="flex gap-2">
            <Reply
              className="size-4"
              onClick={() => handleReplyClick(comment.user_id, comment.id)}
            />
            <div className="relative">
              <CommentLikeButton
                commentId={comment.id}
                toggleLike={toggleLike}
                activity_id={activity_id}
                loggedInUserId={user_id}
                hasLiked={comment.hasLiked}
              />
              {/* <div className="absolute top-[100%] left-1/2 transform -translate-x-1/2 text-sm text-muted-foreground">
                {comment.likes}
              </div> */}
            </div>
          </div>
        </div>
        <p className="text-sm">{comment.content}</p>
        <div className="ml-4 border-l border-muted-foreground pl-2 mb-2">
          {renderComments(comment.id)}
        </div>
      </div>
    ));
  };

  return (
    <>
      {renderComments("root")}

      {user_id && (
        <CommentBox
          ref={inputRef}
          user_id={user_id}
          activity_id={activity_id}
          replyToUserId={replyToUserId}
          setReplyToUserId={setReplyToUserId}
          parentCommentId={parentCommentId}
          setParentCommentId={setParentCommentId}
        />
      )}
    </>
  );
}
