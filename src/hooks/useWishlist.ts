"use client";

import { useState, useCallback } from "react";
import { tours } from "@/data/tours";
import type { Tour } from "@/lib/types";

const STORAGE_KEY = "tourbooking_wishlist";

function getStoredWishlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>(getStoredWishlist);

  const toggleWishlist = useCallback((tourId: string) => {
    setWishlistIds((prev) => {
      const updated = prev.includes(tourId)
        ? prev.filter((id) => id !== tourId)
        : [...prev, tourId];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const isInWishlist = useCallback(
    (tourId: string) => wishlistIds.includes(tourId),
    [wishlistIds]
  );

  const wishlistTours: Tour[] = tours.filter((t) => wishlistIds.includes(t.id));

  return { wishlistIds, toggleWishlist, isInWishlist, wishlistTours };
}
