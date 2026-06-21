"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LayoutDashboard,
  Compass,
  Users,
  CalendarCheck,
  Star,
  DollarSign,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Search,
  Bell,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";
import { bookings, users } from "@/data/users";
import { formatPrice, cn } from "@/lib/utils";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Overview", id: "overview" },
  { icon: Compass, label: "Tours", id: "tours" },
  { icon: CalendarCheck, label: "Bookings", id: "bookings" },
  { icon: Users, label: "Users", id: "users" },
  { icon: Star, label: "Reviews", id: "reviews" },
];

const statsCards = [
  {
    label: "Total Revenue",
    value: "$124,592",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    label: "Active Tours",
    value: tours.length.toString(),
    change: "+2 this month",
    trend: "up",
    icon: Compass,
  },
  {
    label: "Total Bookings",
    value: bookings.length.toString(),
    change: "+18.2%",
    trend: "up",
    icon: CalendarCheck,
  },
  {
    label: "New Users",
    value: "1,482",
    change: "-3.1%",
    trend: "down",
    icon: Users,
  },
];

const recentBookings = bookings.slice(0, 5);

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-zinc-50/50 dark:bg-zinc-900/30">
      <div className="flex">
        {/* Sidebar */}
        <aside
          className={cn(
            "fixed lg:sticky top-16 lg:top-20 left-0 z-40 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)] w-64 bg-background border-r transition-transform duration-300 lg:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                <LayoutDashboard className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-sm">Admin Panel</h2>
                <p className="text-xs text-muted-foreground">Manage your platform</p>
              </div>
            </div>
            <nav className="space-y-1">
              {sidebarLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveSection(link.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                    activeSection === link.id
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0 p-4 md:p-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-accent/50"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="relative max-w-md hidden sm:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10 h-10 w-64" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  3
                </span>
              </Button>
              <Avatar className="w-9 h-9">
                <AvatarImage src={users.find((u) => u.role === "admin")?.avatar} />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {activeSection === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

              {/* Stats Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {statsCards.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border bg-card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="w-5 h-5 text-primary" />
                      </div>
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full",
                          stat.trend === "up"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
                        )}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-3 h-3" />
                        ) : (
                          <TrendingDown className="w-3 h-3" />
                        )}
                        {stat.change}
                      </span>
                    </div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts Section - Simplified */}
              <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <div className="rounded-2xl border bg-card p-6">
                  <h3 className="font-semibold mb-4">Revenue Overview</h3>
                  <div className="h-48 flex items-end gap-2">
                    {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full rounded-md bg-primary/20 hover:bg-primary/40 transition-colors"
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">
                          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border bg-card p-6">
                  <h3 className="font-semibold mb-4">Popular Destinations</h3>
                  <div className="space-y-3">
                    {destinations.slice(0, 5).map((dest) => (
                      <div key={dest.id} className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                          <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{dest.name}</div>
                          <div className="text-xs text-muted-foreground">{dest.tourCount} tours</div>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          {dest.rating}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="rounded-2xl border bg-card">
                <div className="p-6 flex items-center justify-between border-b">
                  <h3 className="font-semibold">Recent Bookings</h3>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground">
                        <th className="p-4 font-medium">Booking</th>
                        <th className="p-4 font-medium">Tour</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium hidden md:table-cell">Date</th>
                        <th className="p-4 font-medium text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-t hover:bg-muted/50 transition-colors">
                          <td className="p-4">
                            <span className="text-sm font-mono text-muted-foreground">#{booking.id.toUpperCase()}</span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0">
                                <Image src={booking.tourImage} alt="" fill className="object-cover" />
                              </div>
                              <span className="text-sm font-medium truncate max-w-[200px]">
                                {booking.tourTitle}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "success"
                                  : booking.status === "pending"
                                    ? "warning"
                                    : booking.status === "cancelled"
                                      ? "destructive"
                                      : "secondary"
                              }
                              className="capitalize"
                            >
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">
                            {booking.date}
                          </td>
                          <td className="p-4 text-sm font-medium text-right">
                            {formatPrice(booking.totalPrice)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "tours" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Manage Tours</h1>
                <Button>Add New Tour</Button>
              </div>
              <div className="rounded-2xl border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b">
                        <th className="p-4 font-medium">Tour</th>
                        <th className="p-4 font-medium">Destination</th>
                        <th className="p-4 font-medium">Price</th>
                        <th className="p-4 font-medium hidden md:table-cell">Duration</th>
                        <th className="p-4 font-medium hidden md:table-cell">Rating</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tours.map((tour) => (
                        <tr key={tour.id} className="border-t hover:bg-muted/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                                <Image src={tour.images[0]} alt="" fill className="object-cover" />
                              </div>
                              <span className="text-sm font-medium truncate max-w-[250px]">{tour.title}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm">{tour.destination}</td>
                          <td className="p-4 text-sm font-medium">{formatPrice(tour.price)}</td>
                          <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{tour.duration}</td>
                          <td className="p-4 hidden md:table-cell">
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                              {tour.rating}
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "bookings" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold mb-6">All Bookings</h1>
              <div className="rounded-2xl border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b">
                        <th className="p-4 font-medium">ID</th>
                        <th className="p-4 font-medium">Tour</th>
                        <th className="p-4 font-medium">User</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium hidden md:table-cell">Date</th>
                        <th className="p-4 font-medium text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="border-t hover:bg-muted/50 transition-colors">
                          <td className="p-4 text-sm font-mono text-muted-foreground">#{booking.id.toUpperCase()}</td>
                          <td className="p-4 text-sm truncate max-w-[200px]">{booking.tourTitle}</td>
                          <td className="p-4 text-sm">{booking.userId}</td>
                          <td className="p-4">
                            <Badge
                              variant={
                                booking.status === "confirmed"
                                  ? "success"
                                  : booking.status === "pending"
                                    ? "warning"
                                    : booking.status === "cancelled"
                                      ? "destructive"
                                      : "secondary"
                              }
                              className="capitalize"
                            >
                              {booking.status}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{booking.date}</td>
                          <td className="p-4 text-sm font-medium text-right">{formatPrice(booking.totalPrice)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "users" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold mb-6">Users</h1>
              <div className="rounded-2xl border bg-card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-xs text-muted-foreground border-b">
                        <th className="p-4 font-medium">User</th>
                        <th className="p-4 font-medium">Email</th>
                        <th className="p-4 font-medium">Role</th>
                        <th className="p-4 font-medium hidden md:table-cell">Joined</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-t hover:bg-muted/50 transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                              </Avatar>
                              <span className="text-sm font-medium">{user.name}</span>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground">{user.email}</td>
                          <td className="p-4">
                            <Badge variant={user.role === "admin" ? "default" : "secondary"} className="capitalize">
                              {user.role}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-muted-foreground hidden md:table-cell">{user.joinDate}</td>
                          <td className="p-4 text-right">
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "reviews" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className="text-2xl font-bold mb-6">Reviews</h1>
              <div className="rounded-2xl border bg-card p-8 text-center">
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Review Management</h3>
                <p className="text-muted-foreground">Review moderation features coming soon</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
