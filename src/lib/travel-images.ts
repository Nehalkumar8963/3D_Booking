export const travelImages = {
  hero: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=85",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=85",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=85",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1920&q=85",
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1920&q=85",
  ],
  destinations: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
  ],
  gallery: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=600&q=80",
    "https://images.unsplash.com/photo-1511739001486-6bfe10ce7854?w=600&q=80",
    "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=600&q=80",
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80",
    "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&q=80",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&q=80",
    "https://images.unsplash.com/photo-1501179691627-eeaa65ea017c?w=600&q=80",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80",
    "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=80",
    "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
    "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=600&q=80",
    "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&q=80",
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
    "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&q=80",
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    "https://images.unsplash.com/photo-1546412414-e1885e5119b0?w=600&q=80",
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80",
    "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80",
  ],
};

export function getRandomImages(count: number, category: keyof typeof travelImages = "gallery"): string[] {
  const pool = travelImages[category];
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export interface GalleryImage {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  location: string;
}

export const galleryImages: GalleryImage[] = [
  { id: "g1", src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80", width: 800, height: 1000, alt: "Eiffel Tower Paris", location: "Paris, France" },
  { id: "g2", src: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=800&q=80", width: 800, height: 600, alt: "Paris Street", location: "Paris, France" },
  { id: "g3", src: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80", width: 800, height: 1200, alt: "Bali Temple", location: "Bali, Indonesia" },
  { id: "g4", src: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80", width: 800, height: 800, alt: "Bali Rice Terraces", location: "Bali, Indonesia" },
  { id: "g5", src: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", width: 800, height: 600, alt: "Tokyo Crossing", location: "Tokyo, Japan" },
  { id: "g6", src: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&q=80", width: 800, height: 1000, alt: "Tokyo Shrine", location: "Tokyo, Japan" },
  { id: "g7", src: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80", width: 800, height: 700, alt: "NYC Skyline", location: "New York, USA" },
  { id: "g8", src: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800&q=80", width: 800, height: 900, alt: "Times Square", location: "New York, USA" },
  { id: "g9", src: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80", width: 800, height: 600, alt: "Santorini", location: "Santorini, Greece" },
  { id: "g10", src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80", width: 800, height: 1000, alt: "Dubai", location: "Dubai, UAE" },
  { id: "g11", src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80", width: 800, height: 800, alt: "Rome Colosseum", location: "Rome, Italy" },
  { id: "g12", src: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80", width: 800, height: 1100, alt: "Bangkok", location: "Bangkok, Thailand" },
  { id: "g13", src: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80", width: 800, height: 600, alt: "Machu Picchu", location: "Peru" },
  { id: "g14", src: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80", width: 800, height: 750, alt: "Sydney", location: "Sydney, Australia" },
];
