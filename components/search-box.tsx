"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export function SearchBox({ placeholder = "映画を検索..." }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("query")?.toString() || "",
  );

  // URLが変わった時に検索ボックスの内容を更新
  useEffect(() => {
    setSearchTerm(searchParams.get("query")?.toString() || "");
  }, [searchParams]);

  // デバウンスされた検索
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    replace(`/search?${params.toString()}`);
  }, 300);

  // 検索をクリア
  const clearSearch = () => {
    setSearchTerm("");
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    replace(`/search?${params.toString()}`);
  };

  return (
    <div className="relative w-full max-w-md">
      <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 h-[18px] w-[18px] text-gray-500" />
      <Input
        name="query"
        placeholder={placeholder}
        className="w-full py-2 pr-10 pl-10"
        value={searchTerm}
        onChange={(e) => {
          const value = e.target.value;
          setSearchTerm(value);
          handleSearch(value);
        }}
        type="search"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="-translate-y-1/2 absolute top-1/2 right-3 text-gray-400 hover:text-gray-600"
          type="button"
          aria-label="検索をクリア"
        />
      )}
    </div>
  );
}
