"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/effects/LoadingScreen";

const ScrollVideoBackground = dynamic(() => import("@/components/effects/ScrollVideoBackground"), { ssr: false });
const EnhancedHero = dynamic(() => import("@/components/enhanced/EnhancedHero"), { ssr: false });
const EnhancedDestinations = dynamic(() => import("@/components/enhanced/EnhancedDestinations"), { ssr: false });
const EnhancedTourCards = dynamic(() => import("@/components/enhanced/EnhancedTourCards"), { ssr: false });
const EnhancedAllSections = dynamic(() => import("@/components/enhanced/EnhancedAllSections"), { ssr: false });

export default function Home() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!showContent) {
    return <LoadingScreen />;
  }

  return (
    <ScrollVideoBackground>
      <EnhancedHero />
      <EnhancedDestinations />
      <EnhancedTourCards />
      <EnhancedAllSections />
    </ScrollVideoBackground>
  );
}
