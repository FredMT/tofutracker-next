"use server";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ArrowRight, Heart, Reply } from "lucide-react";
import Image from "next/image";
import CommentInputBox from "./CommentInputBox";
import { createClient } from "@/utils/supabase/server";
import CommentList from "./CommentList";
import ActivityLikeButton from "./ActivityLikeButton";

type Item = {
  item_id: number;
  item_type: string;
  item_poster: string;
  item_title: string;
  activity_id: string;
};
export default async function ActivityDialog({
  item,
  username,
  activity_owner_id,
}: {
  item: Item;
  username: string;
  activity_owner_id: string;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <DialogContent className="min-h-full sm:min-h-[500px] md:min-h-[472px] md:max-w-[85vw] p-6 flex overflow-y-scroll max-h-screen">
      <div className="flex max-md:flex-col gap-5 w-screen">
        <div className="flex gap-2 items-center md:hidden">
          <Avatar className="size-8">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>

          <div className="  text-sm font-semibold">{username}</div>
          <div className="  text-sm text-muted-foreground">30 min ago</div>
        </div>

        <div className="flex justify-center md:justify-center md:flex-col md:gap-4 md:max-w-[224px]">
          <Image
            src={item.item_poster}
            alt={item.item_title}
            width={1080}
            height={1920}
            className=" rounded-md sm:w-[300px] sm:h-[450px] md:w-[224px] md:h-[336px]"
          />
          <div className="text-sm flex max-md:hidden leading-6">
            {`${username} added ${item.item_title} to their Library`}
            <ActivityLikeButton activity_id={item.activity_id} />
          </div>
        </div>

        <div className="flex flex-col max-md:hidden w-full gap-4 max-h-[472px] ">
          <div className="flex gap-4 items-center">
            <Avatar className="size-8">
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="  text-sm font-medium">{username}</div>
            <div className="  text-sm text-muted-foreground">30 min ago</div>
          </div>

          <Separator className="my-2" />

          <CommentList
            activity_id={item.activity_id}
            user={user!}
            username={username}
          />
        </div>

        <div className="flex flex-col gap-2 md:hidden">
          <div className="flex justify-between gap-2">
            <div>{`${username} added ${item.item_title} to their Library`}</div>
            <ActivityLikeButton activity_id={item.activity_id} />
          </div>
          <div className="text-sm text-muted-foreground">12 likes</div>
        </div>

        <Separator className="my-2 md:hidden" />

        <div className="md:hidden flex flex-col gap-4">
          <CommentList
            activity_id={item.activity_id}
            user={user!}
            username={username}
          />
        </div>
      </div>
    </DialogContent>
  );
}
