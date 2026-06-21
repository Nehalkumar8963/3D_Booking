import { User, Booking, WishlistItem } from "@/lib/types";

export const users: User[] = [
  {
    id: "u1",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    role: "user",
    phone: "+1-555-0101",
    joinDate: "2025-08-15",
  },
  {
    id: "u2",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    role: "user",
    phone: "+1-555-0102",
    joinDate: "2025-09-20",
  },
  {
    id: "u3",
    name: "Emma Williams",
    email: "emma.williams@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    role: "user",
    phone: "+1-555-0103",
    joinDate: "2025-10-05",
  },
  {
    id: "u4",
    name: "James Rodriguez",
    email: "james.rodriguez@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    role: "user",
    phone: "+1-555-0104",
    joinDate: "2025-11-12",
  },
  {
    id: "u5",
    name: "Lisa Thompson",
    email: "lisa.thompson@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    role: "user",
    phone: "+1-555-0105",
    joinDate: "2026-01-08",
  },
  {
    id: "u6",
    name: "David Park",
    email: "david.park@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    role: "user",
    phone: "+1-555-0106",
    joinDate: "2026-02-14",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@tourbooking.com",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    role: "admin",
    phone: "+1-555-0001",
    joinDate: "2025-01-01",
  },
];

export const bookings: Booking[] = [
  { id: "b1", tourId: "t1", tourTitle: "Paris Highlights & Eiffel Tower Experience", tourImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80", userId: "u1", date: "2026-07-01", guests: 2, totalPrice: 378, status: "confirmed", createdAt: "2026-06-01" },
  { id: "b2", tourId: "t3", tourTitle: "Tokyo Cultural Immersion & Food Tour", tourImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80", userId: "u1", date: "2026-08-15", guests: 1, totalPrice: 220, status: "pending", createdAt: "2026-06-10" },
  { id: "b3", tourId: "t5", tourTitle: "Santorini Sunset & Wine Tasting Tour", tourImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80", userId: "u2", date: "2026-07-05", guests: 2, totalPrice: 290, status: "confirmed", createdAt: "2026-05-20" },
  { id: "b4", tourId: "t2", tourTitle: "Bali Temple & Rice Terrace Adventure", tourImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80", userId: "u3", date: "2026-06-20", guests: 3, totalPrice: 225, status: "completed", createdAt: "2026-05-01" },
  { id: "b5", tourId: "t8", tourTitle: "Rome Colosseum & Vatican Premium Tour", tourImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80", userId: "u4", date: "2026-09-01", guests: 2, totalPrice: 498, status: "pending", createdAt: "2026-06-15" },
  { id: "b6", tourId: "t6", tourTitle: "Dubai Desert Safari & Luxury Dinner", tourImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80", userId: "u5", date: "2026-07-10", guests: 4, totalPrice: 780, status: "confirmed", createdAt: "2026-06-05" },
  { id: "b7", tourId: "t11", tourTitle: "Machu Picchu & Sacred Valley Express", tourImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&q=80", userId: "u6", date: "2026-06-25", guests: 1, totalPrice: 599, status: "cancelled", createdAt: "2026-04-15" },
  { id: "b8", tourId: "t14", tourTitle: "Bali Surf & Yoga Wellness Retreat", tourImage: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=400&q=80", userId: "u6", date: "2026-07-12", guests: 2, totalPrice: 1798, status: "confirmed", createdAt: "2026-06-12" },
];

export const wishlistItems: WishlistItem[] = [
  { id: "w1", userId: "u1", tourId: "t5", addedAt: "2026-06-01" },
  { id: "w2", userId: "u1", tourId: "t8", addedAt: "2026-06-02" },
  { id: "w3", userId: "u1", tourId: "t11", addedAt: "2026-06-03" },
  { id: "w4", userId: "u2", tourId: "t1", addedAt: "2026-05-15" },
  { id: "w5", userId: "u2", tourId: "t14", addedAt: "2026-05-20" },
  { id: "w6", userId: "u3", tourId: "t3", addedAt: "2026-06-05" },
  { id: "w7", userId: "u4", tourId: "t2", addedAt: "2026-06-10" },
  { id: "w8", userId: "u5", tourId: "t4", addedAt: "2026-06-08" },
];

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getBookingsByUserId(userId: string): Booking[] {
  return bookings.filter((b) => b.userId === userId);
}

export function getWishlistByUserId(userId: string): WishlistItem[] {
  return wishlistItems.filter((w) => w.userId === userId);
}

export const currentUser: User = users[0];
