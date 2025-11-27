import { cn } from "@/lib/utils";

export function ChatHeaderBlock({ children, className }: { children?: React.ReactNode, className?: string }) {
    return (
        <div className={cn("gap-2 flex flex-1 items-center", className)}>
            {children}
        </div>
    )
}

export function ChatHeader({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full flex py-3 px-5 bg-white/80 backdrop-blur-sm border-b border-border/50">
            {children}
        </div>
    )
}
