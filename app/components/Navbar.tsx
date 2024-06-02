import React from "react";
import { Button } from "@/components/ui/button";
import ThemeButton from "./ThemeButton";
import AuthButton from "@/components/AuthButton";
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
          <AuthButton />
        </div>
        <div className="flex sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="p-4">
              <div className="flex flex-col gap-y-2">
                <AuthButton />
                <ThemeButton />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
