"use client";

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
import React from "react";

export default function MobileButtons() {
  return (
    <div className="flex flex-col w-full gap-y-4">
      <Drawer>
        <div className="w-full relative">
          <Button className="w-full flex justify-between">
            <div className="flex gap-x-2">
              <Library /> <span>Add to Library</span>
            </div>
          </Button>

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
