"use client"

import { useState } from "react"
import { ChatContainer } from "./ChatContainer"
import { SidebarProvider } from "../ui/sidebar"
import { AppSidebar } from "./Sidebar"

export function ChatInterface() {
    const [chatHistory, setChatHistory] = useState([
        { id: 1, title: "Project Planning Tips", date: "Today" },
        { id: 2, title: "Design System Discussion", date: "Yesterday" },
        { id: 3, title: "React Best Practices", date: "2 days ago" },
        { id: 4, title: "Database Optimization", date: "1 week ago" },
    ])

    const [selectedChat, setSelectedChat] = useState<number | null>(null)

    return (
        <SidebarProvider>
            <div className="flex h-screen bg-background w-full">
                <AppSidebar chatHistory={chatHistory} selectedChat={selectedChat} onSelectChat={setSelectedChat} />
                <ChatContainer selectedChat={selectedChat} />
            </div>
        </SidebarProvider>
    )
}
