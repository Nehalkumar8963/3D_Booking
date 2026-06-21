"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const links = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/tour-listing", label: "Tours" },
  { href: "/gallery", label: "Gallery" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/login", label: "Sign In" },
  { href: "/register", label: "Get Started" },
];

export default function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-lg md:hidden"
    >
      <nav className="container mx-auto py-6 px-4">
        <ul className="space-y-1">
          {links.map((link, i) => (
            <motion.li
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={link.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-lg font-medium hover:bg-accent/50 transition-colors"
              >
                {link.href === "/wishlist" && <Heart className="w-5 h-5" />}
                {link.href === "/login" && <User className="w-5 h-5" />}
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>
        <Separator className="my-6" />
        <div className="space-y-3">
          <Button className="w-full" asChild>
            <Link href="/register" onClick={onClose}>Create Account</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/login" onClick={onClose}>Sign In</Link>
          </Button>
        </div>
      </nav>
    </motion.div>
  );
}
