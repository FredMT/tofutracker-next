import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createClient();

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

  const { data: activityData, error: activityDataError } = await supabase
    .from("item_lists")
    .select("id")
    .eq("user_id", viewedUserId)
    .eq("list_type", "Library")
    .order("created_at", { ascending: false });

  if (activityDataError) {
    console.error(activityDataError.message);
    return;
  }

  const posterDataPromises = activityData.map((item) =>
    fetch(
      `https://tofutracker-3pt5y.ondigitalocean.app/api/getposter/${item.id}`
    ).then((response) => response.json())
  );
  const postersData = await Promise.all(posterDataPromises);

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
            {postersData.map((item) => (
              <Link
                href={`/activity/${item.activity_id}`}
                key={item.activity_id}
              >
                <Image
                  key={item.activity_id}
                  className="min-w-[88px] min-h-[132px] sm:min-w-[124px] sm:min-h-[186px] md:min-w-[152px] md:min-h-[228px] lg:min-w-[176px] lg:min-h-[264px] xl:min-w-[200px] xl:min-h-[300px] rounded-md"
                  src={item.item_poster}
                  alt={item.item_title}
                  width="0"
                  height="0"
                  priority
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
