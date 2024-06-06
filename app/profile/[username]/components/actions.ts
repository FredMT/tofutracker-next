import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const comment = async ({ formData }: { formData: FormData }) => {
  "use server";
  const user_id = formData.get("user_id") as string;
  const activity_id = formData.get("activity_id") as string;
  const comment = formData.get("comment") as string;
  const target_user_id = formData.get("target_user_id") as string;
  const username = formData.get("username") as string;
  const parent_comment_id = formData.get("parent_comment_id") as string;
  const supabase = createClient();

  console.log(`user_id: ${user_id}`);
  console.log(`activity_id: ${activity_id}`);
  console.log(`comment: ${comment}`);
  console.log(`target_user_id: ${target_user_id}`);
  console.log(`username: ${username}`);
  console.log(`parent_comment_id: ${parent_comment_id}`);

  const { error } = await supabase.from("comments").insert({
    user_id,
    activity_id,
    content: comment,
    target_user_id: target_user_id || null,
    parent_comment_id: parent_comment_id || null,
  });

  if (error) {
    console.log(error);
  }

  revalidatePath(`/profile/${username}`);
};
