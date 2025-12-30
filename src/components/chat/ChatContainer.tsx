"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, PanelLeft } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useSidebar } from "../ui/sidebar"

interface Message {
    id: number
    type: "user" | "bot"
    content: string
    timestamp: string
}

interface ChatContainerProps {
    selectedChat: number | null
}

export function ChatContainer({ selectedChat }: ChatContainerProps) {
    const { toggleSidebar } = useSidebar()

    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            type: "bot",
            content: "Hey there!  I'm Arinova Bot, your AI assistant. How can I help you today?",
            timestamp: new Date().toISOString(),
        },
    ])

    return (
        <div className="flex-1 flex flex-col bg-background max-w-8xl">
            {/* Chat Header */}
            <div className="border-b border-border px-6 py-4 flex gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleSidebar}
                    className="h-9 w-9"
                >
                    <PanelLeft size={18} />
                </Button>
                <div>
                    <h2 className="text-xl font-bold text-foreground">Chat Session</h2>
                    <p className="text-sm text-muted-foreground">AI Assistant</p>
                </div>
            </div>

            {/* Messages Container */}
            <ScrollArea className="flex-1 px-6 py-6">
                <div className="max-w-4xl mx-auto space-y-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                            <div
                                className={`flex gap-3 max-w-md lg:max-w-2xl ${message.type === "user" ? "flex-row-reverse" : "flex-row"
                                    }`}
                            >
                                <Avatar className="h-8 w-8 flex-shrink-0">
                                    {message.type === "bot" ? (
                                        <>
                                            <AvatarImage src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect fill='%236366f1' width='100' height='100'/%3E%3Ctext x='50' y='50' fontSize='50' textAnchor='middle' dy='.3em' fill='white' fontWeight='bold'%3EAI%3C/text%3E%3C/svg%3E" />
                                            <AvatarFallback>AI</AvatarFallback>
                                        </>
                                    ) : (
                                        <>
                                            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </>
                                    )}
                                </Avatar>

                                <div
                                    className={`px-4 py-2 rounded-lg ${message.type === "user"
                                        ? "bg-primary text-primary-foreground rounded-br-none"
                                        : "bg-card text-card-foreground border border-border rounded-bl-none"
                                        }`}
                                >
                                    <p className="text-sm">{message.content}</p>
                                    <p
                                        className={`text-xs mt-1 ${message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                                    >
                                        {new Date(message.timestamp).toLocaleTimeString("en-US", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                            hour12: true,
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}


                </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="border-t border-border px-6 py-4 bg-background">
                <div className="max-w-4xl mx-auto flex gap-3">
                    <Input
                        placeholder="Type your message here..."
                        className="flex-1 bg-card border-border"
                    />
                    <Button
                        size="icon"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                    ><Send size={20} />
                    </Button>
                </div>
            </div>
        </div>
    )
}
