import { UIMessage } from "ai";
import { Response } from "@/components/ai-elements/response";

export function UserMessage({ message }: { message: UIMessage }) {
    return (
        <div className="whitespace-pre-wrap w-full flex justify-end animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="max-w-[85%] sm:max-w-lg w-fit px-4 py-3 rounded-2xl bg-white border border-input shadow-xs">
                <div className="text-sm leading-relaxed text-left">
                    {message.parts.map((part, i) => {
                        switch (part.type) {
                            case "text":
                                return <Response key={`${message.id}-${i}`}>{part.text}</Response>;
                        }
                    })}
                </div>
            </div>
        </div>
    )
}
