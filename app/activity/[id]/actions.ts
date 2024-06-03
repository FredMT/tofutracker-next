"use server";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createComment(formData: FormData) {
  const user_id = formData.get("user_id");
  const target_user_id = formData.get("target_user_id");
  //   const content = formData.get("content");
  //   const activity_id = formData.get("activity_id");
  //   const parent_comment_id = formData.get("parent_comment_id");

  const supabase = createClient();

  console.log(user_id, target_user_id);

  //   const { error } = await supabase.from("comments").insert([
  //     {
  //       user_id,
  //       target_user_id,
  //       content,
  //       activity_id,
  //       parent_comment_id,
  //     },
  //   ]);

  //   if (error) {
  //     console.error("Failed to create comment:", error.message);
  //     return;
  //   }

  //   revalidatePath(`/activity/${activity_id}`);
}
