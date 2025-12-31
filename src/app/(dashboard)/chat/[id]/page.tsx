import { ChatContainer } from '@/components/chat/ChatContainer'
import React from 'react'

export default function page() {
    return (
        <div className="flex h-screen bg-background w-full">
            <ChatContainer />
        </div>
    )
}
