"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FilterState } from "@/lib/types";
import { destinations } from "@/data/destinations";
import { getCategories } from "@/data/tours";

interface TourFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export default function TourFilters({ filters, onFiltersChange }: TourFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const categories = getCategories();
  const durationOptions = ["1 Day", "2 Days", "3 Days", "4-7 Days"];

  const updateFilter = (key: keyof FilterState, value: string | number | null) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      search: "",
      destination: "",
      category: "",
      minPrice: 0,
      maxPrice: 1000,
      duration: "",
      rating: null,
      sortBy: "popular",
    });
  };

  const hasActiveFilters = filters.search || filters.destination || filters.category || filters.duration || filters.rating;

  return (
    <div className="space-y-4">
      {/* Search & Filter Toggle */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search tours..."
            className="pl-10"
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="relative"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filters
          {hasActiveFilters && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
              !
            </span>
          )}
        </Button>
      </div>

      {/* Expanded Filters */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-6 rounded-2xl border bg-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Filters</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 text-xs">
                    <X className="w-3 h-3 mr-1" />
                    Clear All
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Destination */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Destination</label>
                  <Select
                    value={filters.destination}
                    onValueChange={(v) => updateFilter("destination", v === "_all" ? "" : v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Destinations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_all">All Destinations</SelectItem>
                      {destinations.map((d) => (
                        <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Category</label>
                  <Select
                    value={filters.category}
                    onValueChange={(v) => updateFilter("category", v === "_all" ? "" : v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_all">All Categories</SelectItem>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Duration</label>
                  <Select
                    value={filters.duration}
                    onValueChange={(v) => updateFilter("duration", v === "_all" ? "" : v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_all">Any Duration</SelectItem>
                      {durationOptions.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort */}
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Sort By</label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(v) => updateFilter("sortBy", v)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="popular">Most Popular</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="newest">Newest First</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Active filter badges */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
                  {filters.destination && (
                    <Badge variant="secondary" className="gap-1">
                      {filters.destination}
                      <button onClick={() => updateFilter("destination", "")}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.category && (
                    <Badge variant="secondary" className="gap-1">
                      {filters.category}
                      <button onClick={() => updateFilter("category", "")}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.duration && (
                    <Badge variant="secondary" className="gap-1">
                      {filters.duration}
                      <button onClick={() => updateFilter("duration", "")}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
