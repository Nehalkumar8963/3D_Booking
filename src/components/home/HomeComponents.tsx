"use client";

import {
  MapPin,
  Star,
  Clock,
  Users,
  Shield,
  Award,
  HeadphonesIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SearchBar from "@/components/shared/SearchBar";
import { reviews } from "@/data/reviews";
import { getPopularDestinations } from "@/data/destinations";
import { getFeaturedTours } from "@/data/tours";
import { formatPrice } from "@/lib/utils";

const stats = [
  { value: "500+", label: "Tours Worldwide" },
  { value: "50K+", label: "Happy Travelers" },
  { value: "4.8", label: "Average Rating" },
  { value: "100+", label: "Destinations" },
];

const features = [
  {
    icon: Shield,
    title: "Secure Booking",
    description: "SSL encrypted & verified",
  },
  {
    icon: Award,
    title: "Best Price Guarantee",
    description: "Lowest prices guaranteed",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Round-the-clock assistance",
  },
  {
    icon: Users,
    title: "Small Groups",
    description: "Intimate group experiences",
  },
];

const categories = [
  { label: "City Tours", icon: "🏙️", count: 12 },
  { label: "Adventure", icon: "🏔️", count: 8 },
  { label: "Food & Wine", icon: "🍷", count: 6 },
  { label: "Cultural", icon: "🏛️", count: 10 },
  { label: "Wellness", icon: "🧘", count: 4 },
  { label: "Romantic", icon: "💕", count: 5 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center hero-gradient overflow-hidden">
      <div className="absolute inset-0 hero-pattern opacity-50" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl animate-float-delayed" />

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm">
              <Star className="w-3.5 h-3.5 mr-1.5 text-amber-500 fill-amber-500" />
              Trusted by 50,000+ travelers worldwide
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance mb-6"
          >
            Discover Your Next
            <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent"> Adventure</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance"
          >
            Explore extraordinary tours, hidden gems, and unforgettable experiences curated by local experts across the globe.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <SearchBar variant="hero" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function PopularDestinations() {
  const popular = getPopularDestinations(8);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Popular Destinations</h2>
            <p className="text-muted-foreground max-w-xl">
              Hand-picked destinations loved by our travelers
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/destinations">View All &rarr;</Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {popular.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/destinations`} className="group block relative rounded-2xl overflow-hidden aspect-[4/5]">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                  <h3 className="text-white font-semibold text-lg md:text-xl">{dest.name}</h3>
                  <p className="text-white/80 text-sm">{dest.tourCount} tours</p>
                </div>
                <div className="absolute top-3 right-3 bg-white/90 dark:bg-zinc-800/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {dest.rating}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/destinations">View All Destinations &rarr;</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FeaturedTours() {
  const featured = getFeaturedTours();

  return (
    <section className="py-20 md:py-28 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Tours</h2>
            <p className="text-muted-foreground max-w-xl">
              Curated experiences hand-picked for you
            </p>
          </div>
          <Button variant="ghost" asChild className="hidden sm:flex">
            <Link href="/tour-listing">View All &rarr;</Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.slice(0, 6).map((tour, i) => (
            <motion.div
              key={tour.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/tours/${tour.slug}`} className="group block">
                <div className="rounded-2xl overflow-hidden border bg-card card-hover">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={tour.images[0]}
                      alt={tour.title}
                      fill
                      className="object-cover transition-all duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="secondary" className="backdrop-blur-sm bg-white/90 dark:bg-zinc-800/90">
                        {tour.duration}
                      </Badge>
                    </div>
                    {tour.originalPrice && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="destructive" className="bg-rose-500/90 text-white">
                          {Math.round((1 - tour.price / tour.originalPrice) * 100)}% OFF
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      {tour.destination}
                    </div>
                    <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {tour.title}
                    </h3>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span className="text-sm font-medium">{tour.rating}</span>
                      <span className="text-sm text-muted-foreground">({tour.reviewCount})</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div>
                        {tour.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through mr-1">
                            {formatPrice(tour.originalPrice)}
                          </span>
                        )}
                        <span className="text-lg font-bold text-primary">
                          {formatPrice(tour.price)}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        {tour.duration}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Button variant="outline" asChild>
            <Link href="/tour-listing">View All Tours &rarr;</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose Us</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            We go above and beyond to make every journey extraordinary
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl border bg-card card-hover"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CategoriesSection() {
  return (
    <section className="py-20 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Browse by Category</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Find the perfect experience for your travel style
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/tour-listing?category=${encodeURIComponent(cat.label)}`}
                className="block text-center p-6 rounded-2xl border bg-card card-hover"
              >
                <span className="text-3xl mb-2 block">{cat.icon}</span>
                <h3 className="font-semibold text-sm">{cat.label}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.count} tours</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const recent = reviews.slice(0, 4);

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">What Travelers Say</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Real reviews from real adventurers
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {recent.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border bg-card card-hover"
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden relative shrink-0">
                  <Image src={review.userAvatar} alt={review.userName} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold">{review.userName}</h4>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < review.rating
                            ? "fill-amber-500 text-amber-500"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <h5 className="font-medium mb-2">{review.title}</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DownloadApp() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-amber-500/10 border p-8 md:p-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg">
              Join thousands of travelers who trust us to create unforgettable experiences around the world.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/tour-listing">Browse Tours</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/destinations">Explore Destinations</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
