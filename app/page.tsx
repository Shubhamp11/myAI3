"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useChat } from "@ai-sdk/react";
import { ArrowUp, Square } from "lucide-react";
import { MessageWall } from "@/components/messages/message-wall";
import { ChatHeader, ChatHeaderBlock } from "@/app/parts/chat-header";
import { UIMessage } from "ai";
import { useEffect, useState, useRef } from "react";
import { AI_NAME, WELCOME_MESSAGE, OWNER_NAME } from "@/config";
import Image from "next/image";
import { TypingIndicator } from "@/components/ui/typing-indicator";
import Link from "next/link";

const formSchema = z.object({
  message: z
    .string()
    .min(1, "Message cannot be empty.")
    .max(2000, "Message must be at most 2000 characters."),
});

const STORAGE_KEY = 'chat-messages';

type StorageData = {
  messages: UIMessage[];
  durations: Record<string, number>;
};

const loadMessagesFromStorage = (): { messages: UIMessage[]; durations: Record<string, number> } => {
  if (typeof window === 'undefined') return { messages: [], durations: {} };
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return { messages: [], durations: {} };

    const parsed = JSON.parse(stored);
    return {
      messages: parsed.messages || [],
      durations: parsed.durations || {},
    };
  } catch (error) {
    console.error('Failed to load messages from localStorage:', error);
    return { messages: [], durations: {} };
  }
};

const saveMessagesToStorage = (messages: UIMessage[], durations: Record<string, number>) => {
  if (typeof window === 'undefined') return;
  try {
    const data: StorageData = { messages, durations };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save messages to localStorage:', error);
  }
};

export default function Chat() {
  const [isClient, setIsClient] = useState(false);
  const [durations, setDurations] = useState<Record<string, number>>({});
  const welcomeMessageShownRef = useRef<boolean>(false);

  const stored = typeof window !== 'undefined' ? loadMessagesFromStorage() : { messages: [], durations: {} };
  const [initialMessages] = useState<UIMessage[]>(stored.messages);

  const { messages, sendMessage, status, stop, setMessages } = useChat({
    messages: initialMessages,
  });

  useEffect(() => {
    setIsClient(true);
    setDurations(stored.durations);
    setMessages(stored.messages);
  }, []);

  useEffect(() => {
    if (isClient) {
      saveMessagesToStorage(messages, durations);
    }
  }, [durations, messages, isClient]);

  const handleDurationChange = (key: string, duration: number) => {
    setDurations((prevDurations) => {
      const newDurations = { ...prevDurations };
      newDurations[key] = duration;
      return newDurations;
    });
  };

  useEffect(() => {
    if (isClient && initialMessages.length === 0 && !welcomeMessageShownRef.current) {
      const welcomeMessage: UIMessage = {
        id: `welcome-${Date.now()}`,
        role: "assistant",
        parts: [
          {
            type: "text",
            text: WELCOME_MESSAGE,
          },
        ],
      };
      setMessages([welcomeMessage]);
      saveMessagesToStorage([welcomeMessage], {});
      welcomeMessageShownRef.current = true;
    }
  }, [isClient, initialMessages.length, setMessages]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    sendMessage({ text: data.message });
    form.reset();
  }

  function clearChat() {
    const welcomeMessage: UIMessage = {
      id: `welcome-${Date.now()}`,
      role: "assistant",
      parts: [
        {
          type: "text",
          text: WELCOME_MESSAGE,
        },
      ],
    };
    const newMessages: UIMessage[] = [welcomeMessage];
    const newDurations = {};
    setMessages(newMessages);
    setDurations(newDurations);
    saveMessagesToStorage(newMessages, newDurations);
    toast.success("Chat cleared");
  }

  const hasConversation = messages.length > 1 || (messages.length === 1 && messages[0].role === "user");

  const quickPrompts = [
    "Do I need a factory license?",
    "What are my labour rights?",
    "Tell me about waste management."
  ];

  const handleQuickPrompt = (prompt: string) => {
    sendMessage({ text: prompt });
  };

  return (
    <div className="flex h-screen items-center justify-center font-sans relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/factory_bckgnd.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.40,
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-white/60 to-white/80" />
      
      <div className="fixed left-4 top-1/2 -translate-y-1/2 z-40 hidden md:block">
        <div className="border bg-background shadow-xs rounded-xl p-3 max-w-[220px]">
          <h3 className="text-xs font-bold text-gray-600 mb-3 text-center font-size: 16px">Quick Facts</h3>
          <div className="flex flex-col gap-2">
            <div className="bg-white border border-gray-200 rounded-lg p-2.5 hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-base">&#128176;</span>
                <p className="text-xs text-gray-700 font-medium">India has 63M+ MSMEs contributing 30% of GDP</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-2.5 hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-base">&#9878;</span>
                <p className="text-xs text-gray-700 font-medium">75+ labour laws consolidated into 4 codes</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-2.5 hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-base">&#127981;</span>
                <p className="text-xs text-gray-700 font-medium">Factory license required for 10+ workers</p>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-2.5 hover:border-gray-300 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-base">&#128209;</span>
                <p className="text-xs text-gray-700 font-medium">GST registration mandatory above Rs 40 lakh turnover</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="w-full h-screen relative z-10">
        <div className="fixed top-0 left-0 right-0 z-50">
          <ChatHeader>
            <ChatHeaderBlock>
              <div className="w-8 h-8 rounded-lg border border-border/60 overflow-hidden flex items-center justify-center bg-white">
                <Image src="/logo.png?v=2" alt="CompliBot Logo" width={28} height={28} className="object-contain" unoptimized />
              </div>
            </ChatHeaderBlock>
            <ChatHeaderBlock className="justify-center">
              <h1 className="text-base font-size: 20px tracking-tight">Talk with {AI_NAME}</h1>
            </ChatHeaderBlock>
            <ChatHeaderBlock className="justify-end">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
                onClick={clearChat}
              >
                + New Chat
              </Button>
            </ChatHeaderBlock>
          </ChatHeader>
        </div>

        <div className="h-screen overflow-y-auto px-5 py-4 w-full pt-[72px] pb-[140px]">
          <div className="flex flex-col items-center justify-end min-h-full">
            {isClient ? (
              <>
                {!hasConversation && messages.length > 0 && (
                  <div className="flex flex-col items-center justify-center mb-8 animate-in fade-in duration-500">
                    <div className="w-20 h-20 rounded-full bg-white border-2 border-border/60 flex items-center justify-center mb-6 overflow-hidden">
                      <Image src="/logo.png?v=2" alt="CompliBot Logo" width={48} height={48} className="object-contain" unoptimized />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight mb-2">Hello! My name is CompliBot.</h2>
                    <p className="text-muted-foreground text-sm mb-6">How can I help you today?</p>
                    <div className="flex flex-wrap justify-center gap-3">
                      {quickPrompts.map((prompt, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickPrompt(prompt)}
                          className="px-4 py-2 text-sm rounded-full border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 transition-all duration-150 hover:scale-[1.02] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 active:scale-[0.98]"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {hasConversation && (
                  <MessageWall messages={messages} status={status} durations={durations} onDurationChange={handleDurationChange} />
                )}
                {status === "submitted" && (
                  <div className="flex justify-start max-w-3xl w-full py-4">
                    <div className="bg-card/50 rounded-2xl px-4 py-3 border border-border/30">
                      <TypingIndicator />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex justify-center max-w-2xl w-full">
                <TypingIndicator />
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-background via-background/95 to-transparent pt-8">
          <div className="w-full px-5 pb-6 items-center flex justify-center">
            <div className="max-w-3xl w-full">
              <form id="chat-form" onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup>
                  <Controller
                    name="message"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="chat-form-message" className="sr-only">
                          Message
                        </FieldLabel>
                        <div className="relative">
                          <Input
                            {...field}
                            id="chat-form-message"
                            className="h-14 pr-14 pl-5 bg-white rounded-2xl border-2 border-gray-300 shadow-sm transition-shadow duration-200 focus:shadow-md focus:border-gray-400"
                            placeholder="Ask CompliBot about compliance, registrations, fines..."
                            disabled={status === "streaming"}
                            aria-invalid={fieldState.invalid}
                            autoComplete="off"
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                form.handleSubmit(onSubmit)();
                              }
                            }}
                          />
                          {(status == "ready" || status == "error") && (
                            <Button
                              className="absolute right-2 top-2 rounded-full transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
                              type="submit"
                              disabled={!field.value.trim()}
                              size="icon"
                            >
                              <ArrowUp className="size-4" />
                            </Button>
                          )}
                          {(status == "streaming" || status == "submitted") && (
                            <Button
                              className="absolute right-2 top-2 rounded-full transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]"
                              size="icon"
                              onClick={() => {
                                stop();
                              }}
                            >
                              <Square className="size-4" />
                            </Button>
                          )}
                        </div>
                      </Field>
                    )}
                  />
                </FieldGroup>
              </form>
            </div>
          </div>
           <div className="w-full px-5 py-3 items-center flex justify-center text-xs text-muted-foreground">
            © COMPLIBOT {new Date().getFullYear()} • Created by {OWNER_NAME}&nbsp; • &nbsp;
             <Link href="/terms" className="underline">Terms of Use</Link>&nbsp;Powered by&nbsp; • &nbsp;<Link href="https://ringel.ai/" className="underline">Ringel.AI</Link>
           </div>
        </div>
      </main>
    </div>
  );
}
