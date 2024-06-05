import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import Comments from "./components/Comments";
import Link from "next/link";
import LikeButton from "./components/LikeButton";
import { toggleLike } from "./actions";

type ActivityItem = {
  ok: boolean;
  data: {
    item_type: string;
    item_id: number;
    item_poster: string;
    item_title: string;
  };
};

async function getNumberOfLikes(activity_id: string): Promise<number> {
  const supabase = createClient();
  const { data: likesData, error } = await supabase
    .from("likes")
    .select("*", { count: "exact" })
    .eq("activity_id", activity_id);

  if (error) {
    console.error(error);
    return 0;
  }

  return likesData.length;
}

async function getActivityLikeStatus(
  activity_id: string,
  user_id: string
): Promise<boolean> {
  const supabase = createClient();
  const { data: likeStatus, error } = await supabase
    .from("likes")
    .select("*")
    .eq("activity_id", activity_id)
    .eq("user_id", user_id)
    .maybeSingle();

  if (error) {
    console.error(error);
    return false;
  }

  return Boolean(likeStatus);
}

async function getActivityItemData(activity_id: string): Promise<ActivityItem> {
  const response = await fetch(
    `https://tofutracker-3pt5y.ondigitalocean.app/api/getactivityitemdata/${activity_id}`
  );
  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
}

export default async function Activity({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: loggedInUserData, error: loggedInUserError } =
    await supabase.auth.getUser();

  const likes = await getNumberOfLikes(params.id);
  let likeStatus = false;

  if (loggedInUserData.user) {
    likeStatus = await getActivityLikeStatus(
      params.id,
      loggedInUserData.user.id
    );
  }

  const { data: activityData, error } = await supabase
    .from("item_lists")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error) {
    console.error(error);
    return notFound();
  }

  const { data: userData, error: userError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", activityData.user_id)
    .single();

  if (userError) {
    console.error(userError);
    return notFound();
  }

  if (!userData) {
    return notFound();
  }

  const itemData = await getActivityItemData(params.id);

  return (
    <div className="px-6 mt-20 flex flex-col gap-4 mb-6">
      <div className="flex gap-2">
        <Link href={`/profile/${userData.username}`}>
          <Avatar className="size-8">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="Profile picture"
            />
          </Avatar>
        </Link>

        <p className="text-sm flex items-center">
          <Link href={`/profile/${userData.username}`}>
            {userData.username}{" "}
          </Link>
        </p>

        <p className="text-sm text-muted-foreground flex items-center">
          {formatDistanceToNowStrict(new Date(activityData.created_at))} ago
        </p>
      </div>

      <div className="flex justify-center">
        <Link href={`/${itemData.data.item_type}/${itemData.data.item_id}`}>
          <Image
            src={itemData.data.item_poster}
            alt={itemData.data.item_title}
            width={272}
            height={378}
            priority
            className="rounded-md"
          />
        </Link>
      </div>

      <div className="flex justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p>
            <Link href={`/profile/${userData.username}`}>
              {userData.username}
            </Link>{" "}
            added{" "}
            <Link href={`/${itemData.data.item_type}/${itemData.data.item_id}`}>
              {itemData.data.item_title}
            </Link>{" "}
            to their Library
          </p>
          <div className="text-sm text-muted-foreground">
            {likes === 1 ? "1 like" : likes > 1 ? `${likes} likes` : ""}
          </div>
        </div>
        <LikeButton
          like={toggleLike}
          activity_id={params.id}
          user_id={loggedInUserData?.user?.id || ""}
          likeStatus={likeStatus}
        />
      </div>

      <Separator className="my-1" />

      <Comments
        user_id={loggedInUserData?.user?.id || ""}
        activity_id={params.id}
        toggleLike={toggleLike}
      />
    </div>
  );
}
