import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function generateSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getRatingLabel(rating: number): string {
  if (rating >= 4.5) return "Excellent";
  if (rating >= 4) return "Very Good";
  if (rating >= 3) return "Good";
  if (rating >= 2) return "Fair";
  return "Poor";
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getImageUrl(path: string): string {
  return path;
}

export function getDurationLabel(days: number): string {
  if (days === 1) return "1 Day";
  if (days < 7) return `${days} Days`;
  const weeks = Math.floor(days / 7);
  const remainingDays = days % 7;
  if (remainingDays === 0) return `${weeks} Week${weeks > 1 ? "s" : ""}`;
  return `${weeks} Week${weeks > 1 ? "s" : ""} ${remainingDays} Day${remainingDays > 1 ? "s" : ""}`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}
