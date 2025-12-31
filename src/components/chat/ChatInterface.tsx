"use client"

import { useState } from "react"
import { ChatContainer } from "./ChatContainer"

export function ChatInterface() {

    const [selectedChat, setSelectedChat] = useState<number | null>(null)

    return (
        <div className="flex h-screen bg-background w-full">
            <ChatContainer selectedChat={selectedChat} />
        </div>
    )
}
