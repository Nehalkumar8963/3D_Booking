"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tour } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";

interface TourCardProps {
  tour: Tour;
  index?: number;
  isInWishlist?: boolean;
  onToggleWishlist?: (id: string) => void;
}

export default function TourCard({ tour, index = 0, isInWishlist, onToggleWishlist }: TourCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
    >
      <div className="group rounded-2xl overflow-hidden border bg-card card-hover">
        <Link href={`/tours/${tour.slug}`} className="block">
          <div className="relative h-48 md:h-56 overflow-hidden">
            <Image
              src={tour.images[0]}
              alt={tour.title}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="secondary" className="backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90">
                {tour.duration}
              </Badge>
              {tour.originalPrice && (
                <Badge variant="destructive" className="bg-rose-500/90 text-white border-0">
                  -{Math.round((1 - tour.price / tour.originalPrice) * 100)}%
                </Badge>
              )}
            </div>
            {onToggleWishlist && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleWishlist(tour.id);
                }}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm flex items-center justify-center hover:scale-105 transition-transform"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors",
                    isInWishlist
                      ? "fill-rose-500 text-rose-500"
                      : "text-zinc-600 dark:text-zinc-300"
                  )}
                />
              </button>
            )}
          </div>
        </Link>

        <div className="p-5">
          <Link href={`/tours/${tour.slug}`}>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <MapPin className="w-3.5 h-3.5" />
              {tour.destination}
              <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary ml-auto">
                {tour.category}
              </span>
            </div>
            <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {tour.title}
            </h3>
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-sm font-medium">{tour.rating}</span>
              <span className="text-sm text-muted-foreground">({tour.reviewCount} reviews)</span>
            </div>
          </Link>
          <div className="flex items-center justify-between pt-3 border-t">
            <div>
              {tour.originalPrice && (
                <span className="text-sm text-muted-foreground line-through mr-1">
                  {formatPrice(tour.originalPrice)}
                </span>
              )}
              <span className="text-lg font-bold text-primary">
                {formatPrice(tour.price)}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {tour.duration}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
