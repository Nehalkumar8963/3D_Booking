"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Calendar,
  Heart,
  Settings,
  MapPin,
  Star,
  ChevronRight,
  LogOut,
  CreditCard,
  Bell,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { currentUser, getBookingsByUserId, getWishlistByUserId } from "@/data/users";
import { getTourById } from "@/data/tours";
import { formatPrice, formatDate, cn } from "@/lib/utils";

const user = currentUser;
const userBookings = getBookingsByUserId(user.id);
const userWishlist = getWishlistByUserId(user.id);

const statusStyles = {
  confirmed: "success",
  pending: "warning",
  cancelled: "destructive",
  completed: "secondary",
} as const;

const sidebarLinks = [
  { icon: User, label: "Profile", id: "profile" },
  { icon: Calendar, label: "My Bookings", id: "bookings" },
  { icon: Heart, label: "Wishlist", id: "wishlist" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="text-center p-6 rounded-2xl border bg-card">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                <Badge variant="secondary" className="mt-2 capitalize">{user.role}</Badge>
              </div>

              <nav className="space-y-1">
                {sidebarLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                      activeTab === link.id
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </button>
                ))}
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Tab Nav */}
            <div className="lg:hidden mb-6">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {sidebarLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => setActiveTab(link.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border transition-colors",
                      activeTab === link.id
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border hover:border-muted-foreground"
                    )}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Profile Tab */}
            {activeTab === "profile" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-2xl font-bold mb-6">Profile</h1>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="rounded-2xl border bg-card p-6">
                    <h3 className="font-semibold mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-muted-foreground">Full Name</label>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Email</label>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Phone</label>
                        <p className="font-medium">{user.phone || "Not set"}</p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Member Since</label>
                        <p className="font-medium">{formatDate(user.joinDate)}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      Edit Profile
                    </Button>
                  </div>

                  <div className="rounded-2xl border bg-card p-6">
                    <h3 className="font-semibold mb-4">Stats</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-primary/5 text-center">
                        <div className="text-2xl font-bold text-primary">{userBookings.length}</div>
                        <div className="text-xs text-muted-foreground">Bookings</div>
                      </div>
                      <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-center">
                        <div className="text-2xl font-bold text-rose-500">{userWishlist.length}</div>
                        <div className="text-xs text-muted-foreground">Wishlist</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Bookings Tab */}
            {activeTab === "bookings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-2xl font-bold mb-6">My Bookings</h1>
                {userBookings.length > 0 ? (
                  <div className="space-y-4">
                    {userBookings.map((booking, i) => {
                      const tour = getTourById(booking.tourId);
                      return (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="rounded-2xl border bg-card overflow-hidden"
                        >
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative w-full sm:w-48 h-40 shrink-0">
                              <Image
                                src={booking.tourImage}
                                alt={booking.tourTitle}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <h3 className="font-semibold">{booking.tourTitle}</h3>
                                  <Badge variant={statusStyles[booking.status]}>
                                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                  </Badge>
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="w-3.5 h-3.5" />
                                    {formatDate(booking.date)}
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-between pt-3 border-t">
                                <span className="font-semibold">{formatPrice(booking.totalPrice)}</span>
                                <div className="flex gap-2">
                                  {booking.status === "confirmed" && (
                                    <Button variant="outline" size="sm">Manage</Button>
                                  )}
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/tours/${tour?.slug}`}>View Tour</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                    <p className="text-muted-foreground mb-6">Start exploring and book your first tour</p>
                    <Button asChild><Link href="/tour-listing">Browse Tours</Link></Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Wishlist Tab */}
            {activeTab === "wishlist" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-2xl font-bold mb-6">Wishlist</h1>
                {userWishlist.length > 0 ? (
                  <div className="space-y-4">
                    {userWishlist.map((item, i) => {
                      const tour = getTourById(item.tourId);
                      if (!tour) return null;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="rounded-2xl border bg-card overflow-hidden"
                        >
                          <div className="flex flex-col sm:flex-row">
                            <div className="relative w-full sm:w-48 h-40 shrink-0">
                              <Image src={tour.images[0]} alt={tour.title} fill className="object-cover" />
                            </div>
                            <div className="p-5 flex-1 flex flex-col justify-between">
                              <div>
                                <div className="flex items-start justify-between mb-1">
                                  <h3 className="font-semibold">{tour.title}</h3>
                                  <div className="flex items-center gap-1 text-sm">
                                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                    {tour.rating}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="w-3.5 h-3.5" />
                                  {tour.destination}
                                </div>
                              </div>
                              <div className="flex items-center justify-between pt-3 border-t">
                                <span className="font-bold text-primary">{formatPrice(tour.price)}</span>
                                <div className="flex gap-2">
                                  <Button size="sm" asChild>
                                    <Link href={`/tours/${tour.slug}`}>Book Now</Link>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Wishlist is empty</h3>
                    <p className="text-muted-foreground mb-6">Save tours you love for later</p>
                    <Button asChild><Link href="/tour-listing">Explore Tours</Link></Button>
                  </div>
                )}
              </motion.div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h1 className="text-2xl font-bold mb-6">Settings</h1>
                <div className="space-y-6">
                  <div className="rounded-2xl border bg-card p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      Notifications
                    </h3>
                    <div className="space-y-3">
                      {["Email notifications", "SMS updates", "Marketing emails", "Booking reminders"].map(
                        (item) => (
                          <label key={item} className="flex items-center justify-between py-2">
                            <span className="text-sm">{item}</span>
                            <div className="w-10 h-6 rounded-full bg-primary cursor-pointer relative">
                              <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white shadow" />
                            </div>
                          </label>
                        )
                      )}
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-card p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Security
                    </h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-between">
                        Change Password
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" className="w-full justify-between">
                        Two-Factor Authentication
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-card p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Payment Methods
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">No payment methods saved</p>
                    <Button variant="outline">Add Payment Method</Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
