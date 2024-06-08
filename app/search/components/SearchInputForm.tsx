"use client";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SearchInputForm() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    const newTimer = setTimeout(() => {
      if (searchQuery) {
        const encodedSearchQuery = encodeURIComponent(searchQuery);
        router.push(`/search?q=${encodedSearchQuery}`);
      }
    }, 1000); // 1000 ms delay
    setTimer(newTimer);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [searchQuery]);

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Input
        placeholder="Search"
        className="h-12 text-lg"
        name="query"
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
}
