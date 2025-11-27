"use client";

import { cn } from "@/lib/utils";

export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <span 
        className="w-2 h-2 rounded-full bg-muted-foreground/50"
        style={{
          animation: 'typing-dot 1.4s ease-in-out infinite',
          animationDelay: '0ms'
        }}
      />
      <span 
        className="w-2 h-2 rounded-full bg-muted-foreground/50"
        style={{
          animation: 'typing-dot 1.4s ease-in-out infinite',
          animationDelay: '200ms'
        }}
      />
      <span 
        className="w-2 h-2 rounded-full bg-muted-foreground/50"
        style={{
          animation: 'typing-dot 1.4s ease-in-out infinite',
          animationDelay: '400ms'
        }}
      />
    </div>
  );
}
