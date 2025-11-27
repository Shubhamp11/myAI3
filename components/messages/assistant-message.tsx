import { UIMessage, ToolCallPart, ToolResultPart } from "ai";
import { Response } from "@/components/ai-elements/response";
import { ReasoningPart } from "./reasoning-part";
import { ToolCall, ToolResult } from "./tool-call";

export function AssistantMessage({ message, status, isLastMessage, durations, onDurationChange }: { message: UIMessage; status?: string; isLastMessage?: boolean; durations?: Record<string, number>; onDurationChange?: (key: string, duration: number) => void }) {
    return (
        <div className="w-full flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-full sm:max-w-[85%] bg-card/50 dark:bg-card/30 rounded-2xl px-4 py-3 border border-border/30">
                <div className="text-sm flex flex-col gap-4 leading-relaxed">
                    {message.parts.map((part, i) => {
                        const isStreaming = status === "streaming" && isLastMessage && i === message.parts.length - 1;
                        const durationKey = `${message.id}-${i}`;
                        const duration = durations?.[durationKey];

                        if (part.type === "text") {
                            return <Response key={`${message.id}-${i}`}>{part.text}</Response>;
                        } else if (part.type === "reasoning") {
                            return (
                                <ReasoningPart
                                    key={`${message.id}-${i}`}
                                    part={part}
                                    isStreaming={isStreaming}
                                    duration={duration}
                                    onDurationChange={onDurationChange ? (d) => onDurationChange(durationKey, d) : undefined}
                                />
                            );
                        } else if (
                            part.type.startsWith("tool-") || part.type === "dynamic-tool"
                        ) {
                            if ('state' in part && part.state === "output-available") {
                                return (
                                    <ToolResult
                                        key={`${message.id}-${i}`}
                                        part={part as unknown as ToolResultPart}
                                    />
                                );
                            } else {
                                return (
                                    <ToolCall
                                        key={`${message.id}-${i}`}
                                        part={part as unknown as ToolCallPart}
                                    />
                                );
                            }
                        }
                        return null;
                    })}
                </div>
            </div>
        </div>
    )
}
