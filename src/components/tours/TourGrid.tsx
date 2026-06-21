"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import TourCard from "./TourCard";
import TourFilters from "./TourFilters";
import { tours } from "@/data/tours";
import { useWishlist } from "@/hooks/useWishlist";
import { FilterState } from "@/lib/types";

export default function TourGrid() {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [filters, setFilters] = useState<FilterState>({
    search: "",
    destination: "",
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    duration: "",
    rating: null,
    sortBy: "popular",
  });

  const filteredTours = useMemo(() => {
    let result = [...tours];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.destination.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q)
      );
    }

    if (filters.destination) {
      result = result.filter((t) => t.destination === filters.destination);
    }

    if (filters.category) {
      result = result.filter((t) => t.category === filters.category);
    }

    if (filters.duration) {
      if (filters.duration === "4-7 Days") {
        result = result.filter((t) => t.durationDays >= 4 && t.durationDays <= 7);
      } else {
        const days = parseInt(filters.duration);
        result = result.filter((t) => t.durationDays === days);
      }
    }

    if (filters.rating) {
      result = result.filter((t) => t.rating >= filters.rating!);
    }

    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return result;
  }, [filters]);

  return (
    <div className="space-y-6">
      <TourFilters filters={filters} onFiltersChange={setFilters} />

      {/* Results info */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          Showing <strong className="text-foreground">{filteredTours.length}</strong> tours
        </span>
        <span className="hidden sm:block">
          {filters.destination || "All Destinations"}
        </span>
      </div>

      {/* Tour Grid */}
      {filteredTours.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTours.map((tour, i) => (
            <TourCard
              key={tour.id}
              tour={tour}
              index={i}
              isInWishlist={isInWishlist(tour.id)}
              onToggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-20"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No tours found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search terms
          </p>
        </motion.div>
      )}
    </div>
  );
}
