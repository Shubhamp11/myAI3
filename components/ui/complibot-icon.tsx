"use client";

import { cn } from "@/lib/utils";

export function CompliBotIcon({ className, size = 24 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("text-foreground", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="12" r="1.5" fill="currentColor" />
      <circle cx="16" cy="12" r="1.5" fill="currentColor" />
      <path d="M10 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 6V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 10v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
