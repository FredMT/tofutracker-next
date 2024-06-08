import React from "react";
import { Button } from "@/components/ui/button";
import ThemeButton from "./ThemeButton";
import AuthButton from "@/components/AuthButton";
import { Menu, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import SearchButton from "./SearchButton";

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
          <SearchButton />
          <ThemeButton />
          <AuthButton />
        </div>
        <div className="flex sm:hidden py-4 gap-4">
          <SearchButton />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-4 w-40">
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
