"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/destinations";
import { useState, useMemo } from "react";

export default function DestinationsPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () =>
      destinations.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.country.toLowerCase().includes(search.toLowerCase()) ||
          d.continent.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const continents = [...new Set(destinations.map((d) => d.continent))];

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Explore Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
          >
            Discover hand-picked destinations across the globe
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search destinations..."
              className="pl-11 h-12 text-base"
            />
          </motion.div>
        </div>
      </section>

      {/* Continents Filter */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={search === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSearch("")}
          >
            All
          </Button>
          {continents.map((c) => (
            <Button
              key={c}
              variant={search.toLowerCase() === c.toLowerCase() ? "default" : "outline"}
              size="sm"
              onClick={() => setSearch(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
            >
              <Link
                href={`/tour-listing?destination=${encodeURIComponent(dest.name)}`}
                className="group block relative rounded-2xl overflow-hidden aspect-[4/5]"
              >
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span className="text-white text-sm font-medium">{dest.rating}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg">{dest.name}</h3>
                  <div className="flex items-center gap-1 text-white/70 text-xs">
                    <MapPin className="w-3 h-3" />
                    {dest.country}
                  </div>
                  <p className="text-white/60 text-xs mt-0.5">{dest.tourCount} tours</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No destinations found</h3>
            <p className="text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </section>
    </div>
  );
}
