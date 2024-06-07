"use server";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ActivityDialog from "./components/ActivityDialog";

type PosterItem = {
  item_id: number;
  item_type: string;
  item_poster: string;
  item_title: string;
  activity_id: string;
  item_created_at: string;
  hasLiked?: boolean;
  likes: number;
};

async function getActivityData(user_id: string) {
  const data = await fetch(
    `https://tofutracker-3pt5y.ondigitalocean.app/api/getposters/${user_id}`
  );
  return data;
}

async function getActivityDataLoggedInUser(
  viewed_user_id: string,
  logged_in_user_id: string
) {
  const data = await fetch(
    `https://tofutracker-3pt5y.ondigitalocean.app/api/getposters/${viewed_user_id}/${logged_in_user_id}`
  );
  return data;
}

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profile")
    .select("bio")
    .eq("username", params.username)
    .single();

  if (error) console.log(error.message);

  const { data: userData, error: userError } = await supabase
    .from("profile")
    .select("id")
    .eq("username", params.username)
    .single();

  if (userError) {
    console.error(userError.message);
    return;
  }

  const viewedUserId = userData.id;

  let activityData;
  if (user) {
    const response = await getActivityDataLoggedInUser(viewedUserId, user.id);
    activityData = await response.json();
  } else {
    const response = await getActivityData(viewedUserId);
    activityData = await response.json();
  }

  if (activityData) {
    return (
      <div className="mt-20 mx-6">
        <div className="flex max-md:flex-col md:gap-20">
          <div className="flex max-md:gap-6 md:gap-2 md:max-w-[240px] md:flex-col">
            <div className="flex justify-center">
              <Avatar className="size-12 md:size-24 ">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="Profile picture"
                />
              </Avatar>
            </div>
            <div className="flex flex-col">
              <div className="font-syne text-lg font-semibold">
                {params.username}
              </div>
              <div className="text-gray-500 text-sm">{data?.bio}</div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="text-xl max-md:mt-6">Activity</div>
            <Separator className="mt-2" />

            <div className="grid gap-4 mt-6 grid-cols-3 lg:grid-cols-4 place-items-center mb-6">
              {activityData.posters.map((item: PosterItem) => (
                <Dialog key={item.item_id}>
                  <DialogTrigger>
                    <Image
                      key={item.item_id}
                      className=" min-w-[88px] min-h-[132px] sm:min-w-[124px] sm:min-h-[186px] md:min-w-[152px] md:min-h-[228px] lg:min-w-[176px] lg:min-h-[264px] xl:min-w-[200px] xl:min-h-[300px] rounded-md"
                      src={item.item_poster}
                      alt={item.item_title}
                      width="1080"
                      height="1920"
                      priority
                    />
                  </DialogTrigger>
                  <ActivityDialog
                    item={item}
                    username={params.username}
                    hasLiked={item.hasLiked || false}
                  />
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>No activity found</div>;
  }
}
