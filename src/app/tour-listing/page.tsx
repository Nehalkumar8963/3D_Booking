"use client";

import { motion } from "framer-motion";
import TourGrid from "@/components/tours/TourGrid";

export default function TourListingPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Explore Tours</h1>
            <p className="text-muted-foreground text-lg">
              Find the perfect experience from our curated collection of world-class tours
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="container mx-auto px-4 py-8">
        <TourGrid />
      </section>
    </div>
  );
}
