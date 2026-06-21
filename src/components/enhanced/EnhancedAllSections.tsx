"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Star, Users, Award, HeadphonesIcon, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/effects/ScrollAnimations";
import { reviews } from "@/data/reviews";

const features = [
  { icon: Shield, title: "Secure Booking", description: "SSL encrypted & verified" },
  { icon: Award, title: "Best Price Guarantee", description: "Lowest prices guaranteed" },
  { icon: HeadphonesIcon, title: "24/7 Support", description: "Round-the-clock assistance" },
  { icon: Users, title: "Small Groups", description: "Intimate group experiences" },
];

function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-20 md:py-28 relative overflow-hidden">
      <motion.div style={{ scale }} className="relative z-10 container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg">Why Choose Us</h2>
            <p className="text-xs sm:text-base text-white/80 max-w-xl mx-auto drop-shadow">We go above and beyond to make every journey extraordinary</p>
          </div>
        </ScrollReveal>
        <StaggerContainer>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="text-center p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md hover:bg-white/25 transition-colors shadow-lg">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/20 flex items-center justify-center mx-auto mb-2 sm:mb-4">
                    <feature.icon className="w-5 h-5 sm:w-7 sm:h-7 text-white drop-shadow" />
                  </div>
                  <h3 className="font-semibold text-xs sm:text-base mb-1 sm:mb-2 text-white drop-shadow">{feature.title}</h3>
                  <p className="text-[10px] sm:text-sm text-white/80">{feature.description}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </motion.div>
    </section>
  );
}

function Testimonials() {
  const recent = reviews.slice(0, 4);
  return (
    <section className="py-12 sm:py-20 md:py-28 relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-8 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg">What Travelers Say</h2>
            <p className="text-xs sm:text-base text-white/80 max-w-xl mx-auto drop-shadow">Real reviews from real adventurers</p>
          </div>
        </ScrollReveal>
        <StaggerContainer>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
            {recent.map((review) => (
              <StaggerItem key={review.id}>
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md shadow-lg">
                  <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden relative shrink-0 ring-1 sm:ring-2 ring-white/50">
                      <Image src={review.userAvatar} alt={review.userName} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xs sm:text-base text-white drop-shadow">{review.userName}</h4>
                      <div className="flex items-center gap-0.5 sm:gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-white/30"}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                  <h5 className="font-medium text-xs sm:text-base mb-1.5 sm:mb-2 text-white drop-shadow">{review.title}</h5>
                  <p className="text-[10px] sm:text-sm text-white/80 leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}

function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.7, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="py-12 sm:py-20 md:py-28 relative overflow-hidden">
      <motion.div style={{ scale, opacity }} className="relative z-10 container mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/10 backdrop-blur-lg border border-white/30 p-6 sm:p-8 md:p-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-16 sm:w-48 md:w-64 h-16 sm:h-48 md:h-64 bg-primary/30 rounded-full blur-2xl sm:blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-12 sm:w-32 md:w-48 h-12 sm:h-32 md:h-48 bg-amber-500/30 rounded-full blur-2xl sm:blur-3xl -translate-x-1/2 translate-y-1/2" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white drop-shadow-lg">Ready for Your Next Adventure?</h2>
            <p className="text-sm sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-lg drop-shadow">Join thousands of travelers who trust us to create unforgettable experiences around the world.</p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <Button size="default" className="bg-white text-zinc-900 hover:bg-zinc-200 shadow-lg text-xs sm:text-base px-3 sm:px-6" asChild>
                <Link href="/tour-listing">Browse Tours</Link>
              </Button>
              <Button variant="outline" size="default" className="border-white/40 text-white hover:bg-white/20 backdrop-blur-sm text-xs sm:text-base px-3 sm:px-6" asChild>
                <Link href="/destinations">Explore Destinations</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default function EnhancedAllSections() {
  return (
    <>
      <WhyChooseUs />
      <Testimonials />
      <CTA />
    </>
  );
}
