"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/shared/SearchBar";
import Globe from "@/components/three/Globe";
import CloudParticles from "@/components/three/CloudParticles";
import AirplanePaths from "@/components/three/AirplanePaths";

const stats = [
  { value: "500+", label: "Tours Worldwide" },
  { value: "50K+", label: "Happy Travelers" },
  { value: "4.8", label: "Average Rating" },
  { value: "100+", label: "Destinations" },
];

export default function EnhancedHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const globeOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const globeScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center overflow-hidden"
    >
      {/* 3D Globe */}
      <motion.div
        style={{ opacity: globeOpacity, scale: globeScale }}
        className="absolute inset-0 z-10"
      >
        <Globe />
      </motion.div>

      {/* Cloud Particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <CloudParticles />
      </div>

      {/* Airplane Paths */}
      <AirplanePaths />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: textOpacity }}
        className="relative z-30 container mx-auto px-4 pt-16 sm:pt-24 pb-12 sm:pb-16"
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 sm:mb-6 px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm bg-white/10 text-white border-white/20 backdrop-blur-sm"
            >
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 text-amber-400 fill-amber-400" />
              Trusted by 50,000+ travelers worldwide
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-4 sm:mb-6 text-white"
          >
            Explore the World in
            <span className="bg-gradient-to-r from-primary via-purple-400 to-amber-400 bg-clip-text text-transparent"> 3D</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-10 max-w-2xl mx-auto text-balance drop-shadow"
          >
            Immersive tours, interactive 3D destinations, and unforgettable experiences curated by local experts across the globe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SearchBar variant="hero" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-6 sm:mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg sm:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-white/60 drop-shadow">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/60 drop-shadow">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
