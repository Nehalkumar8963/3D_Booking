"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ArrowLeft, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import TourCard from "@/components/tours/TourCard";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistPage() {
  const { wishlistTours, toggleWishlist } = useWishlist();

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <section className="container mx-auto px-4 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-6 h-6 text-rose-500" />
            <h1 className="text-3xl md:text-4xl font-bold">Your Wishlist</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            {wishlistTours.length} {wishlistTours.length === 1 ? "tour" : "tours"} saved
          </p>
        </motion.div>

        {wishlistTours.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistTours.map((tour, i) => (
              <TourCard
                key={tour.id}
                tour={tour}
                index={i}
                isInWishlist={true}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-2xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-rose-300" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Start exploring tours and save your favorites for later
            </p>
            <div className="flex gap-3 justify-center">
              <Button asChild>
                <Link href="/tour-listing">
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Browse Tours
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/destinations">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Destinations
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
