"use client";

import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import InputArea from "../InputArea";
import { useChat } from "@/context/chat-provider";
import { useSession } from "next-auth/react";
import { useSidebar } from "../ui/sidebar";

type ChatContainerProps = {
    historyId?: string;
};

export function ChatContainer({ historyId }: ChatContainerProps) {
    const { chats, selectChat, sendMessage } = useChat();
    const { data: session } = useSession()

    const { open } = useSidebar()

    const isHome = !historyId;

    useEffect(() => {
        if (historyId) {
            selectChat(historyId);
        }
    }, [historyId, selectChat]);

    const activeChat = chats.find((chat) => chat.id === historyId);
    const messages = activeChat?.messages ?? [];

    return (
        <div className="relative flex-1 flex flex-col bg-background w-full h-screen">
            {/* Messages */}
            {!isHome && (
                <ScrollArea className="flex-1 px-3 sm:px-6 py-4 sm:py-6 pb-32">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`flex gap-2 sm:gap-3 max-w-[85%] sm:max-w-md lg:max-w-2xl ${message.role === "user"
                                        ? "flex-row-reverse"
                                        : "flex-row"
                                        }`}
                                >
                                    <Avatar className="h-7 w-7 sm:h-8 sm:w-8 shrink-0">
                                        {message.role === "bot" ? (
                                            <>
                                                <AvatarImage src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%236366f1' width='100' height='100'/%3E%3Ctext x='50' y='50' fontSize='50' textAnchor='middle' dy='.3em' fill='white' fontWeight='bold'%3EAI%3C/text%3E%3C/svg%3E" />
                                                <AvatarFallback>AI</AvatarFallback>
                                            </>
                                        ) : (
                                            <>
                                                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                                                <AvatarFallback>U</AvatarFallback>
                                            </>
                                        )}
                                    </Avatar>

                                    <div
                                        className={`px-3 sm:px-4 py-2 rounded-lg ${message.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-card text-card-foreground border border-border rounded-bl-none"
                                            }`}
                                    >
                                        <p className="text-xs sm:text-sm wrap-break-word">{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )}

            {/* Input */}
            {isHome ? (
                <div className="flex flex-col items-center justify-center h-full px-4">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl mb-3 text-center">Hey! {session?.user?.name}</h1>
                    <InputArea onSend={sendMessage} className="w-full max-w-4xl" />
                </div>

            ) : (
                <div
                    className={`
        fixed bottom-0 right-0 bg-background border-t px-2
        transition-[left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${open ? "md:left-[var(--sidebar-width)]" : "left-0"}
      `}
                >
                    <InputArea onSend={sendMessage} className="w-full max-w-4xl mx-auto" />
                </div>
            )}
        </div>
    );
}