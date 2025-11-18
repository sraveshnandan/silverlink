import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Compose and merge CSS class names, resolving Tailwind utility conflicts.
 *
 * @param inputs - Class values to combine (e.g., strings, arrays, or objects describing conditional classes)
 * @returns A single class string with duplicate or conflicting Tailwind utility classes merged and resolved
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}