import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const CommentBox = forwardRef<
  HTMLInputElement,
  {
    user_id: string;
    activity_id: string;
    replyToUserId: string | null;
    setReplyToUserId: (userId: string | null) => void;
    parentCommentId: string | null;
    setParentCommentId: (commentId: string | null) => void;
  }
>((props, ref) => {
  const {
    user_id,
    activity_id,
    replyToUserId,
    setReplyToUserId,
    parentCommentId,
    setParentCommentId,
  } = props;
  const [comment, setComment] = useState("");

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handlePostComment = async () => {
    const supabase = createClient();
    const { error } = await supabase.from("comments").insert([
      {
        user_id: user_id,
        content: comment,
        activity_id,
        target_user_id: replyToUserId,
        parent_comment_id: parentCommentId,
      },
    ]);

    if (error) {
      console.error("Failed to post comment:", error.message);
    } else {
      setComment("");
      setReplyToUserId(null);
      setParentCommentId(null);
    }
  };

  return (
    <div className="flex gap-2 sticky bottom-2">
      <Input
        ref={ref}
        value={comment}
        onChange={handleCommentChange}
        placeholder="Add a comment"
      />
      <Button onClick={handlePostComment}>Post</Button>
    </div>
  );
});

export default CommentBox;
