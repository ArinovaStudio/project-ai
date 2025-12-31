"use client";

import React, { use, useState } from 'react'
import CreateCollaborationPage from './CreateCollaborationPage'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/Sidebar'

const page = () => {

    const [chatHistory, setChatHistory] = useState([
    { id: 1, title: "Project Planning Tips", date: "Today" },
    { id: 2, title: "Design System Discussion", date: "Yesterday" },
    { id: 3, title: "React Best Practices", date: "2 days ago" },
    { id: 4, title: "Database Optimization", date: "1 week ago" },
])

const [selectedChat, setSelectedChat] = useState<number | null>(null)

    return (
        <div>

            <SidebarProvider>
                <AppSidebar chatHistory={chatHistory} selectedChat={selectedChat} onSelectChat={setSelectedChat} />
                <div className='m-auto'>
                    <CreateCollaborationPage />
                </div>
            </SidebarProvider>
        </div>
    )
}

export default page