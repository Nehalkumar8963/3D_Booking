"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { galleryImages, type GalleryImage } from "@/lib/travel-images";

function GalleryCard({ image, index, onClick }: { image: GalleryImage; index: number; onClick: () => void }) {
  const heights = [320, 240, 280, 360, 260, 300, 340, 220, 290, 310, 250, 270, 330, 230];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03, duration: 0.5 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div
        className="relative rounded-2xl overflow-hidden bg-muted"
        style={{ height: heights[index % heights.length] }}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-center gap-1.5 text-white/80 text-xs">
              <MapPin className="w-3 h-3" />
              {image.location}
            </div>
          </div>
        </div>
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />
      </div>
    </motion.div>
  );
}

export default function ImageGallery3D() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const openImage = useCallback(
    (image: GalleryImage) => {
      setSelected(image);
      setSelectedIndex(galleryImages.findIndex((g) => g.id === image.id));
    },
    []
  );

  const navigate = useCallback(
    (direction: "prev" | "next") => {
      const newIndex =
        direction === "prev"
          ? (selectedIndex - 1 + galleryImages.length) % galleryImages.length
          : (selectedIndex + 1) % galleryImages.length;
      setSelected(galleryImages[newIndex]);
      setSelectedIndex(newIndex);
    },
    [selectedIndex]
  );

  return (
    <div className="space-y-6">
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryImages.map((image, i) => (
          <GalleryCard
            key={image.id}
            image={image}
            index={i}
            onClick={() => openImage(image)}
          />
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate("prev"); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate("next"); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            <motion.div
              key={selected.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full h-full m-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selected.src}
                alt={selected.alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-5 py-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-white/70" />
                <span className="text-white text-sm">{selected.location}</span>
                <span className="text-white/40 text-xs ml-2">
                  {selectedIndex + 1} / {galleryImages.length}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
