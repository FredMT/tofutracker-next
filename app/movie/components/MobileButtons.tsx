import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  BookmarkPlus,
  ChevronDown,
  Library,
  List,
  Monitor,
  Star,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { addOrRemoveFromLibrary } from "./actions";
import React from "react";

export default async function MobileButtons({
  item_id,
  item_type,
}: {
  item_id: number;
  item_type: string;
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isInLibrary = false;

  if (user) {
    const { data, error } = await supabase
      .from("item_lists")
      .select("*")
      .eq("item_id", item_id)
      .eq("user_id", user.id);
    if (error) {
      console.error("Failed to fetch library:", error.message);
    } else {
      if (data.length > 0) {
        isInLibrary = true;
      }
    }
  }

  return (
    <div className="flex flex-col w-full gap-y-4">
      <Drawer>
        <div className="w-full relative">
          <form action={addOrRemoveFromLibrary}>
            <input type="hidden" name="user_id" value={user?.id} />
            <input type="hidden" name="item_id" value={item_id} />
            <input type="hidden" name="list_type" value="Library" />
            <input type="hidden" name="item_type" value={item_type} />
            <input
              type="hidden"
              name="isInLibrary"
              value={isInLibrary.toString()}
            />
            <Button className="w-full flex justify-between" type="submit">
              <div className="flex gap-x-2">
                <Library />
                <span>
                  {isInLibrary ? "Remove from Library" : "Add to Library"}
                </span>
              </div>
            </Button>
          </form>

          <DrawerTrigger className="absolute left-[87%] bottom-0 top-0 my-auto">
            <ChevronDown className="text-black size-5" />
          </DrawerTrigger>
        </div>
        <DrawerContent className="p-6">
          <DrawerHeader className="p-0 text-start text-[18px] not-italic font-semibold leading-[28px]">
            Add to
          </DrawerHeader>
          <div className="mt-6 flex flex-col gap-y-4">
            <Button className="flex gap-x-2">
              <BookmarkPlus className="size-5" /> <span>Add to Library</span>
            </Button>
            <Button className="flex gap-x-2">
              <List className="size-5" /> <span>My Lists</span>
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </div>
        </DrawerContent>
      </Drawer>
      <Button className="w-full flex justify-start" variant="secondary">
        <Star className="mr-2" /> Rate
      </Button>
      <Button className="w-full flex justify-start" variant="secondary">
        <Monitor className="mr-2" /> Watch
      </Button>
    </div>
  );
}
