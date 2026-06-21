"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star } from "lucide-react";
import { Destination } from "@/lib/types";

interface DestinationCardProps {
  destination: Destination;
  index?: number;
}

export default function DestinationCard({ destination, index = 0 }: DestinationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/destinations`}
        className="group block relative rounded-2xl overflow-hidden aspect-[4/5]"
      >
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <h3 className="text-white font-semibold text-lg md:text-xl">{destination.name}</h3>
          <div className="flex items-center gap-2 text-white/80 text-sm">
            <MapPin className="w-3.5 h-3.5" />
            {destination.country}
          </div>
          <p className="text-white/60 text-xs mt-1">{destination.tourCount} tours available</p>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium flex items-center gap-1">
          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
          {destination.rating}
        </div>
      </Link>
    </motion.div>
  );
}
