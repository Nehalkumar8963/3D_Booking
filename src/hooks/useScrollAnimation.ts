"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationOptions {
  trigger?: string | Element;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  toggleActions?: string;
}

export function useScrollAnimation(
  ref: React.RefObject<HTMLElement | null>,
  animation: gsap.TweenVars,
  options: ScrollAnimationOptions = {}
) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: 60, ...animation.from },
        {
          opacity: 1,
          y: 0,
          ...animation.to,
          scrollTrigger: {
            trigger: ref.current,
            start: options.start || "top 85%",
            end: options.end || "top 40%",
            toggleActions: options.toggleActions || "play none none reverse",
            ...options,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, animation, options]);
}

export function useParallaxScroll(
  ref: React.RefObject<HTMLElement | null>,
  speed = 0.3
) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: `${speed * 100}%`,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [ref, speed]);
}

export function useScaleInScroll(
  ref: React.RefObject<HTMLElement | null>,
  delay = 0
) {
  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [ref, delay]);
}

export function useStaggerFadeIn(
  containerRef: React.RefObject<HTMLElement | null>,
  itemsSelector: string,
  staggerAmount = 0.1
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const items = containerRef.current.querySelectorAll(itemsSelector);
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: staggerAmount,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [containerRef, itemsSelector, staggerAmount]);
}
