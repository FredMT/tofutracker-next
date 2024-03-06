"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import ThemeButton from "./ThemeButton";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full absolute top-0 z-50">
      <div className="flex justify-between w-[80%] mx-auto">
        <Link href="/">
          <div className="font-syne p-4 text-white font-semibold text-[24px] uppercase select-none">
            TOFUTRACKER
          </div>
        </Link>
        <div className="hidden sm:flex gap-x-4 p-4">
          <ThemeButton />
          <Button
            variant="secondary"
            className="text-[14px] font-medium leading-[24px]"
          >
            Sign In
          </Button>
          <Button className="text-[14px] font-medium leading-[24px]">
            Sign Up
          </Button>
        </div>
        <div className="flex sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-4">
              <div className="flex flex-col gap-y-2">
                <Button variant="secondary">Sign In</Button>
                <Button variant="secondary">Sign Up</Button>
                <ThemeButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
