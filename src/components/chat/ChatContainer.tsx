"use client";

import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import InputArea from "../InputArea";
import { useChat } from "@/context/chat-provider";
import { useSession } from "next-auth/react";

type ChatContainerProps = {
    historyId?: string;
};

export function ChatContainer({ historyId }: ChatContainerProps) {
    const { chats, selectChat, sendMessage } = useChat();
    const { data: session } = useSession()

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
                <ScrollArea className="flex-1 px-6 py-6 pb-32">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`flex gap-3 max-w-md lg:max-w-2xl ${message.role === "user"
                                        ? "flex-row-reverse"
                                        : "flex-row"
                                        }`}
                                >
                                    <Avatar className="h-8 w-8 shrink-0">
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
                                        className={`px-4 py-2 rounded-lg ${message.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-br-none"
                                            : "bg-card text-card-foreground border border-border rounded-bl-none"
                                            }`}
                                    >
                                        <p className="text-sm">{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            )}

            {/* Input */}
            {isHome ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <h1 className="text-4xl mb-3">Hey! {session?.user?.name}</h1>
                    <InputArea onSend={sendMessage} className="w-4xl" />
                </div>

            ) : (
                <div
                    className="
    fixed bottom-0 right-0
    left-[var(--sidebar-width)]
    bg-background border-t
    transition-[left] duration-300
    group-data-[state=collapsed]:left-[var(--sidebar-collapsed-width)]
  "
                >
                    <InputArea onSend={sendMessage} />
                </div>


            )}
        </div>
    );
}
