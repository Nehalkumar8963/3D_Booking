"use client";

import { useRef, useEffect, useCallback } from "react";

interface TiltOptions {
  maxTilt?: number;
  perspective?: number;
  scale?: number;
  speed?: number;
  easing?: string;
  glare?: boolean;
  maxGlare?: number;
}

export function useTiltEffect<T extends HTMLElement>(options: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const {
    maxTilt = 15,
    perspective = 1000,
    scale = 1.02,
    glare = true,
    maxGlare = 0.2,
  } = options;

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      ref.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale}, ${scale}, ${scale})`;

      if (glare) {
        const glareEl = ref.current.querySelector(".glare") as HTMLElement;
        if (glareEl) {
          const glareX = (x / rect.width) * 100;
          const glareY = (y / rect.height) * 100;
          glareEl.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${maxGlare}) 0%, transparent 80%)`;
        }
      }
    },
    [maxTilt, perspective, scale, glare, maxGlare]
  );

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    if (glare) {
      const glareEl = ref.current.querySelector(".glare") as HTMLElement;
      if (glareEl) {
        glareEl.style.background = "transparent";
      }
    }
  }, [perspective, glare]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return ref;
}
