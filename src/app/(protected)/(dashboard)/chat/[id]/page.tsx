"use client";

import { use } from "react";
import { ChatContainer } from "@/components/chat/ChatContainer";

export default function ChatPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);

    return <ChatContainer historyId={id} />;
}
