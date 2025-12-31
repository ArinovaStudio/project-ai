'use client'

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { useState } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const [chatHistory, setChatHistory] = useState([
        { id: 1, title: "Project Planning Tips", date: "Today" },
        { id: 2, title: "Design System Discussion", date: "Yesterday" },
        { id: 3, title: "React Best Practices", date: "2 days ago" },
        { id: 4, title: "Database Optimization", date: "1 week ago" },
    ])

    const [selectedChat, setSelectedChat] = useState<number | null>(null)

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full">
                <AppSidebar chatHistory={chatHistory} selectedChat={selectedChat} onSelectChat={setSelectedChat} />
                <main className="flex-1 overflow-auto">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
