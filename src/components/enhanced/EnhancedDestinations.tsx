"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import TiltCard from "@/components/effects/TiltCard";
import { StaggerContainer, StaggerItem, ScrollReveal } from "@/components/effects/ScrollAnimations";
import { destinations } from "@/data/destinations";

export default function EnhancedDestinations() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const depthOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const depthScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.9]);

  return (
    <section ref={containerRef} className="py-12 sm:py-20 md:py-28 relative overflow-hidden">

      <motion.div
        style={{ opacity: depthOpacity, scale: depthScale }}
        className="relative z-10 container mx-auto px-4"
      >
        <ScrollReveal>
          <div className="flex items-end justify-between mb-8 sm:mb-12">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg">
                Destinations in <span className="bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">3D</span>
              </h2>
              <p className="text-xs sm:text-base text-white/80 max-w-xl drop-shadow">
                Hover over cards to explore destinations with immersive depth and perspective
              </p>
            </div>
            <Button variant="ghost" asChild className="hidden sm:flex text-white/80 hover:text-white">
              <Link href="/destinations">View All &rarr;</Link>
            </Button>
          </div>
        </ScrollReveal>

        <StaggerContainer staggerDelay={0.06}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {destinations.slice(0, 8).map((dest) => (
              <StaggerItem key={dest.id}>
                <TiltCard maxTilt={10} scale={1.04} glare>
                  <Link
                    href={`/tour-listing?destination=${encodeURIComponent(dest.name)}`}
                    className="group block relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/5]"
                  >
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                      <h3 className="text-white font-semibold text-sm sm:text-lg md:text-xl">{dest.name}</h3>
                      <p className="text-zinc-400 text-[10px] sm:text-sm">{dest.country}</p>
                      <p className="text-zinc-500 text-[10px] sm:text-xs mt-1">{dest.tourCount} tours</p>
                    </div>
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-black/50 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium flex items-center gap-1 border border-white/10">
                      <Star className="w-2.5 sm:w-3 h-2.5 sm:h-3 fill-amber-400 text-amber-400" />
                      <span className="text-white">{dest.rating}</span>
                    </div>
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-xl sm:rounded-2xl pointer-events-none" />
                  </Link>
                </TiltCard>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>

        <div className="mt-6 sm:mt-10 text-center sm:hidden">
          <Button variant="outline" size="sm" asChild className="border-white/40 text-white hover:bg-white/20 backdrop-blur-sm">
            <Link href="/destinations">View All Destinations &rarr;</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
