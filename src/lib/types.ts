export interface Tour {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  destination: string;
  destinationId: string;
  images: string[];
  price: number;
  originalPrice?: number;
  currency: string;
  duration: string;
  durationDays: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  includes: string[];
  excludes: string[];
  itinerary: ItineraryItem[];
  highlights: string[];
  meetingPoint: string;
  maxGroupSize: number;
  availableDates: string[];
  isFeatured: boolean;
  isPopular: boolean;
  createdAt: string;
}

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
  activities: string[];
  meals: string[];
  accommodation: string;
}

export interface Destination {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  images: string[];
  country: string;
  continent: string;
  tourCount: number;
  rating: number;
  highlights: string[];
  bestTimeToVisit: string;
  currency: string;
  languages: string[];
}

export interface Review {
  id: string;
  tourId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpful: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin';
  phone?: string;
  joinDate: string;
}

export interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  userId: string;
  date: string;
  guests: number;
  totalPrice: number;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  tourId: string;
  addedAt: string;
}

export interface FilterState {
  search: string;
  destination: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  duration: string;
  rating: number | null;
  sortBy: string;
}
