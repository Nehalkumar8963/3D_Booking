"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Calendar,
  Check,
  X,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tour, Review } from "@/lib/types";
import { formatPrice, formatDate, cn } from "@/lib/utils";
import { useWishlist } from "@/hooks/useWishlist";

interface TourDetailsClientProps {
  tour: Tour;
  reviews: Review[];
}

export default function TourDetailsClient({ tour, reviews }: TourDetailsClientProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(tour.id);

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <div className="min-h-screen pt-16 md:pt-20">
      {/* Image Gallery */}
      <section className="relative">
        <div className="container mx-auto px-4 py-6">
          <div className="relative rounded-2xl overflow-hidden bg-muted aspect-[2/1] md:aspect-[3/1]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <Image
                  src={tour.images[currentImage]}
                  alt={tour.title}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

            {/* Navigation Arrows */}
            <button
              onClick={() => setCurrentImage((p) => (p === 0 ? tour.images.length - 1 : p - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-800/90 flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => setCurrentImage((p) => (p === tour.images.length - 1 ? 0 : p + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-zinc-800/90 flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Image Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {tour.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImage(i)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    i === currentImage ? "bg-white w-6" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {tour.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setCurrentImage(i)}
                className={cn(
                  "relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all",
                  i === currentImage ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image src={img} alt="" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title & Meta */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{tour.category}</Badge>
                    <Badge variant="outline">{tour.duration}</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold">{tour.title}</h1>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {tour.destination}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      Max {tour.maxGroupSize} people
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      {avgRating.toFixed(1)} ({reviews.length} reviews)
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => toggleWishlist(tour.id)}
                  >
                    <Heart className={cn("w-4 h-4", inWishlist && "fill-rose-500 text-rose-500")} />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Highlights */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Highlights</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {tour.highlights.map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm">{h}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-4">About This Tour</h2>
              <div className={cn("text-muted-foreground leading-relaxed", !showFullDesc && "line-clamp-4")}>
                {tour.description}
              </div>
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-primary text-sm font-medium mt-2 hover:underline"
              >
                {showFullDesc ? "Show less" : "Read more"}
              </button>
            </div>

            <Separator />

            {/* Itinerary */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item, i) => (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative pl-8 pb-4 border-l-2 border-primary/20 last:pb-0"
                  >
                    <div className="absolute left-0 top-0 -translate-x-1/2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {item.day}
                    </div>
                    <div className="bg-card rounded-xl border p-4">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.activities.map((a, j) => (
                          <Badge key={j} variant="secondary" className="text-xs">
                            {a}
                          </Badge>
                        ))}
                      </div>
                      {item.meals.length > 0 && (
                        <div className="mt-3 text-xs text-muted-foreground">
                          Meals: {item.meals.join(", ")}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Separator />

            {/* What's Included / Excluded */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" />
                  Included
                </h3>
                <ul className="space-y-2">
                  {tour.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <X className="w-4 h-4 text-rose-500" />
                  Excluded
                </h3>
                <ul className="space-y-2">
                  {tour.excludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator />

            {/* Reviews */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>
              {reviews.map((review) => (
                <div key={review.id} className="flex gap-4 py-5 border-b last:border-0">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={review.userAvatar} />
                    <AvatarFallback>{review.userName[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">{review.userName}</span>
                      <span className="text-xs text-muted-foreground">{formatDate(review.date)}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-3.5 h-3.5",
                            i < review.rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                    <h4 className="font-medium text-sm mb-1">{review.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="rounded-2xl border bg-card p-6 shadow-lg">
                <div className="mb-6">
                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(tour.price)}
                    <span className="text-sm font-normal text-muted-foreground"> / person</span>
                  </div>
                  {tour.originalPrice && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-muted-foreground line-through">
                        {formatPrice(tour.originalPrice)}
                      </span>
                      <Badge variant="destructive" className="bg-rose-500/10 text-rose-600 dark:text-rose-400">
                        Save {formatPrice(tour.originalPrice - tour.price)}
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Available Dates</div>
                      <div className="text-xs text-muted-foreground">
                        {tour.availableDates.slice(0, 3).join(", ")}
                        {tour.availableDates.length > 3 && "..."}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Duration</div>
                      <div className="text-xs text-muted-foreground">{tour.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                    <Users className="w-5 h-5 text-primary" />
                    <div>
                      <div className="text-sm font-medium">Group Size</div>
                      <div className="text-xs text-muted-foreground">Up to {tour.maxGroupSize} people</div>
                    </div>
                  </div>
                </div>

                <Button className="w-full h-12 text-base font-semibold mb-3">
                  Book Now
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/tour-listing`}>View All Tours</Link>
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Free cancellation up to 48 hours before
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
