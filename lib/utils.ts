import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Update the formatDate function to handle invalid dates better
export function formatDate(date: Date | string): string {
  if (!date) return "" // Handle null or undefined dates

  const d = typeof date === "string" ? new Date(date) : date

  if (isNaN(d.getTime())) {
    return "" // Return empty string instead of "Invalid date"
  }

  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}
