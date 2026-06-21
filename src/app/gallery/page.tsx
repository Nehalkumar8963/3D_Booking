"use client";

import { motion } from "framer-motion";
import { ImageIcon } from "lucide-react";
import ImageGallery3D from "@/components/effects/ImageGallery3D";

export default function GalleryPage() {
  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <section className="bg-gradient-to-b from-primary/5 to-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Travel Gallery</h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Immersive 3D gallery with depth, perspective, and interactive previews
            </p>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <ImageGallery3D />
      </section>
    </div>
  );
}
