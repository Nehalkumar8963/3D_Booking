"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";
import { tours } from "@/data/tours";

interface SearchBarProps {
  variant?: "hero" | "header";
  onSearch?: () => void;
}

export default function SearchBar({ variant = "hero", onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);
  const router = useRouter();

  const results = query
    ? [
        ...destinations
          .filter((d) =>
            d.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((d) => ({ type: "destination" as const, label: d.name, href: `/destinations/${d.slug}` })),
        ...tours
          .filter((t) =>
            t.title.toLowerCase().includes(query.toLowerCase())
          )
          .slice(0, 5)
          .map((t) => ({ type: "tour" as const, label: t.title, href: `/tours/${t.slug}` })),
      ]
    : [];

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/tour-listing?search=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
      onSearch?.();
    }
  };

  const isHero = variant === "hero";

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        className={`relative flex items-center ${
          isHero
            ? "bg-white dark:bg-zinc-900 shadow-lg shadow-black/5 border-0"
            : "bg-secondary"
        } rounded-2xl overflow-hidden`}
      >
        <Search className={`ml-4 ${isHero ? "text-primary" : "text-muted-foreground"} w-5 h-5 shrink-0`} />
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search destinations, tours..."
          className={`border-0 bg-transparent ${
            isHero ? "h-14 text-base" : "h-10 text-sm"
          } focus-visible:ring-0 focus-visible:ring-offset-0`}
        />
        {query && (
          <button onClick={() => { setQuery(""); setShowResults(false); }} className="mr-2 p-1 rounded-full hover:bg-accent/50">
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
        <Button
          onClick={handleSearch}
          size={isHero ? "lg" : "sm"}
          className={`${isHero ? "h-11 mr-2 px-6" : "h-8 mr-1.5"} rounded-xl`}
        >
          <Search className="w-4 h-4 md:hidden" />
          <span className="hidden md:inline">Search</span>
        </Button>
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-2xl shadow-xl overflow-hidden z-50">
          <div className="p-2">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => {
                  router.push(r.href);
                  setShowResults(false);
                  onSearch?.();
                }}
                className="w-full text-left px-4 py-3 rounded-xl hover:bg-accent/50 transition-colors"
              >
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {r.type === "destination" ? "Destination" : "Tour"}
                </span>
                <p className="text-sm font-medium">{r.label}</p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
