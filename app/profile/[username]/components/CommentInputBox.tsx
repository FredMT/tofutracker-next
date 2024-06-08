"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { forwardRef, useState } from "react";

type User = {
  id: string;
};

const CommentInputBox = forwardRef<
  HTMLInputElement,
  {
    user: User;
    activity_id: string;
    username: string;
    target_user_id: string;
    parent_comment_id: string;
    setTargetUserId: (target_user_id: string) => void;
    setParentCommentId: (parent_comment_id: string) => void;
    targetUsername: string;
    setTargetUsername: (target_username: string) => void;
    createComment: (data: any) => void;
  }
>((props, ref) => {
  const {
    user,
    activity_id,
    username,
    target_user_id,
    parent_comment_id,
    setTargetUserId,
    setParentCommentId,
    targetUsername,
    setTargetUsername,
    createComment,
  } = props;
  const [comment, setComment] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("activity_id", activity_id);
    formData.append("comment", comment);
    formData.append("username", username);
    formData.append("target_user_id", target_user_id);
    formData.append("parent_comment_id", parent_comment_id);

    try {
      createComment({ formData });
      setComment("");
      setTargetUserId("");
      setTargetUsername("");
      setParentCommentId("");
      window.history.replaceState(
        {
          ...window.history.state,
          as: `/profile/${username}`,
          url: `/profile/${username}`,
        },
        "",
        `/profile/${username}`
      );
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  function handleCloseReply() {
    setTargetUserId("");
    setParentCommentId("");
    setTargetUsername("");
    setComment("");
  }

  return (
    <div className="flex flex-col gap-1">
      {target_user_id && (
        <Card className="p-2 border-0">
          <div className="flex justify-between">
            Replying to {targetUsername}
            <button onClick={handleCloseReply}>
              <X />
            </button>
          </div>
        </Card>
      )}
      <form
        className="flex gap-2 mb-2 sticky -bottom-6"
        onSubmit={handleSubmit}
      >
        <Input
          ref={ref}
          autoComplete="off"
          name="comment"
          placeholder="Write a comment"
          value={
            targetUsername && comment === "" ? `@${targetUsername} ` : comment
          }
          onChange={(e) => {
            const inputText = e.target.value;
            const prefix = `@${targetUsername} `;
            if (targetUsername) {
              if (inputText === prefix.trim()) {
                setComment(prefix);
              } else if (!inputText.startsWith(prefix)) {
                setComment(prefix + inputText.slice(prefix.length));
              } else {
                setComment(inputText);
              }
            } else {
              setComment(inputText);
            }
          }}
        />
        <input type="hidden" name="user_id" value={user.id} />
        <input type="hidden" name="activity_id" value={activity_id} />
        <Button type="submit">Post</Button>
      </form>
    </div>
  );
});

CommentInputBox.displayName = "CommentInputBox";
export default CommentInputBox;
