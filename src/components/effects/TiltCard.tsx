"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useTiltEffect } from "@/hooks/useTiltEffect";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className,
  maxTilt = 12,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const ref = useTiltEffect<HTMLDivElement>({ maxTilt, scale, glare });

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {children}
      {glare && (
        <div
          className="glare absolute inset-0 pointer-events-none"
          style={{ zIndex: 10 }}
        />
      )}
    </motion.div>
  );
}
