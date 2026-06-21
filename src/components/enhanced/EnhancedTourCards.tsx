"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/effects/ScrollAnimations";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { getFeaturedTours } from "@/data/tours";
import { formatPrice } from "@/lib/utils";
import type { Tour } from "@/lib/types";

function EnhancedTourCard({ tour }: { tour: Tour }) {
  const tiltRef = useTiltEffect<HTMLDivElement>({
    maxTilt: 8,
    scale: 1.03,
    glare: true,
    maxGlare: 0.1,
  });

  return (
    <StaggerItem>
      <div
        ref={tiltRef}
        className="group rounded-xl sm:rounded-2xl overflow-hidden border border-white/30 bg-white/15 backdrop-blur-md shadow-lg"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <div className="glare absolute inset-0 pointer-events-none z-10" />
        <Link href={`/tours/${tour.slug}`}>
          <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-[1]" />
            <Image
              src={tour.images[0]}
              alt={tour.title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1.5 sm:gap-2 z-[2]">
              <Badge variant="secondary" className="backdrop-blur-sm bg-white/20 text-white border-white/30 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                {tour.duration}
              </Badge>
              {tour.originalPrice && (
                <Badge className="bg-rose-500/80 text-white border-0 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">
                  -{Math.round((1 - tour.price / tour.originalPrice) * 100)}%
                </Badge>
              )}
            </div>
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-xl sm:rounded-2xl pointer-events-none z-[2]" />
          </div>
        </Link>

        <div className="p-3 sm:p-5">
          <Link href={`/tours/${tour.slug}`}>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm text-white/70 mb-1.5 sm:mb-2">
              <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              <span className="truncate">{tour.destination}</span>
              <span className="text-[9px] sm:text-xs px-1 sm:px-1.5 py-0.5 rounded bg-primary/30 text-white ml-auto drop-shadow shrink-0">
                {tour.category}
              </span>
            </div>
            <h3 className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2 line-clamp-2 text-white drop-shadow group-hover:text-primary transition-colors">
              {tour.title}
            </h3>
            <div className="flex items-center gap-1 mb-2 sm:mb-3">
              <Star className="w-3 sm:w-4 h-3 sm:h-4 fill-amber-400 text-amber-400" />
              <span className="text-[10px] sm:text-sm font-medium text-white drop-shadow">{tour.rating}</span>
              <span className="text-[10px] sm:text-sm text-white/60">({tour.reviewCount} reviews)</span>
            </div>
          </Link>
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/20">
            <div>
              {tour.originalPrice && (
                <span className="text-[10px] sm:text-sm text-white/50 line-through mr-0.5 sm:mr-1">
                  {formatPrice(tour.originalPrice)}
                </span>
              )}
              <span className="text-sm sm:text-lg font-bold text-white drop-shadow">
                {formatPrice(tour.price)}
              </span>
            </div>
            <div className="flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-sm text-white/70">
              <Clock className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
              {tour.duration}
            </div>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

export default function EnhancedTourCards() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const featured = getFeaturedTours();

  return (
    <section ref={containerRef} className="py-12 sm:py-20 md:py-28 relative overflow-hidden">
      <motion.div style={{ y, opacity }} className="relative z-10 container mx-auto px-4">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg">
                Premium <span className="bg-gradient-to-r from-amber-400 to-primary bg-clip-text text-transparent">Tours</span>
              </h2>
              <p className="text-xs sm:text-base text-white/80 max-w-xl drop-shadow">
                Interactive 3D cards with dynamic perspective tracking
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex text-white/80 hover:text-white">
              <Link href="/tour-listing">View All &rarr;</Link>
            </Button>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.05}>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featured.slice(0, 6).map((tour) => (
              <EnhancedTourCard key={tour.id} tour={tour} />
            ))}
          </div>
        </StaggerContainer>

        <div className="mt-6 sm:mt-8 text-center sm:hidden">
          <Button variant="outline" size="sm" asChild className="border-white/40 text-white hover:bg-white/20 backdrop-blur-sm">
            <Link href="/tour-listing">View All Tours &rarr;</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
