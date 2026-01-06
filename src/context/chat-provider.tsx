"use client"

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react"

export type Message = {
    id: string;
    role: "user" | "bot";
    content: string;
};

export type Chat = {
    id: string;
    title: string;
    messages: Message[];
    date: string;
};

type ChatContextType = {
    chats: Chat[];
    selectedChatId: string | null;
    selectChat: (id: string) => void;
    sendMessage: (text: string) => void;
    // createNewChat: (firstMessage?: string) => void;
};

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
    const [chats, setChats] = useState<Chat[]>([
        {
            id: "chat-1",
            title: "Best Places to Visit in India",
            date: "Today",
            messages: [
                { id: "c1-m1", role: "user", content: "What are the best places to visit in India?" },
                { id: "c1-m2", role: "bot", content: "Some top destinations include Goa, Kerala, Ladakh, Rajasthan, and Himachal Pradesh." },
                { id: "c1-m3", role: "user", content: "Which place is best for nature lovers?" },
                { id: "c1-m4", role: "bot", content: "Kerala and Himachal Pradesh are perfect for nature lovers." },
                { id: "c1-m5", role: "user", content: "Best time to visit Kerala?" },
                { id: "c1-m6", role: "bot", content: "October to March is the best time to visit Kerala." },
            ],
        },
        {
            id: "chat-2",
            title: "Best Places to Visit in Europe",
            date: "Yesterday",
            messages: [
                { id: "c2-m1", role: "user", content: "Which European countries should I visit first?" },
                { id: "c2-m2", role: "bot", content: "France, Italy, Switzerland, and Spain are great for first-time travelers." },
                { id: "c2-m3", role: "user", content: "Best city for couples?" },
                { id: "c2-m4", role: "bot", content: "Paris and Venice are very popular for couples." },
            ],
        },
        {
            id: "chat-3",
            title: "Weekend Trip Ideas",
            date: "2 days ago",
            messages: [
                { id: "c3-m1", role: "user", content: "Suggest some weekend trip ideas." },
                { id: "c3-m2", role: "bot", content: "You can consider nearby hill stations, beach towns, or heritage cities." },
                { id: "c3-m3", role: "user", content: "Any budget-friendly options?" },
                { id: "c3-m4", role: "bot", content: "Local hill stations or nearby cultural towns are budget-friendly." },
            ],
        },
        {
            id: "chat-4",
            title: "Best Food to Try in Kolkata",
            date: "3 days ago",
            messages: [
                { id: "c4-m1", role: "user", content: "What food should I try in Kolkata?" },
                { id: "c4-m2", role: "bot", content: "You must try Kathi Rolls, Mishti Doi, Rosogolla, and Fish Curry." },
                { id: "c4-m3", role: "user", content: "Best street food?" },
                { id: "c4-m4", role: "bot", content: "Kathi Rolls from Park Street and Phuchka are very popular." },
            ],
        },
        {
            id: "chat-5",
            title: "Solo Travel Tips",
            date: "Last week",
            messages: [
                { id: "c5-m1", role: "user", content: "Is solo travel safe?" },
                { id: "c5-m2", role: "bot", content: "Yes, with proper planning and awareness, solo travel is safe." },
                { id: "c5-m3", role: "user", content: "Any tips for beginners?" },
                { id: "c5-m4", role: "bot", content: "Start with popular destinations, stay connected, and trust your instincts." },
            ],
        },
        {
            id: "chat-6",
            title: "Best Beaches in the World",
            date: "Last week",
            messages: [
                { id: "c6-m1", role: "user", content: "Which are the best beaches in the world?" },
                { id: "c6-m2", role: "bot", content: "Maldives, Bora Bora, Bali, and Seychelles are among the best." },
                { id: "c6-m3", role: "user", content: "Best beach for honeymoon?" },
                { id: "c6-m4", role: "bot", content: "Maldives and Bora Bora are perfect honeymoon destinations." },
            ],
        },
        {
            id: "chat-7",
            title: "Mountain Trekking Destinations",
            date: "2 weeks ago",
            messages: [
                { id: "c7-m1", role: "user", content: "Suggest good mountain trekking destinations." },
                { id: "c7-m2", role: "bot", content: "You can try Kedarkantha, Roopkund, Annapurna, or Mount Kilimanjaro." },
                { id: "c7-m3", role: "user", content: "Beginner-friendly treks?" },
                { id: "c7-m4", role: "bot", content: "Kedarkantha and Triund are beginner-friendly." },
            ],
        },
    ]);

    const [selectedChatId, setSelectedChatId] = useState<string | null>(null)

    const selectChat = (id: string) => {
        setSelectedChatId(id);
    };

    const sendMessage = async (content: string) => {
  if (!content.trim()) return;

  // 1️⃣ Show user message
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === selectedChatId
        ? {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: crypto.randomUUID(),
                role: "user",
                content,
              },
            ],
          }
        : chat
    )
  );

  // 2️⃣ Call backend
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: content,
      historyId: selectedChatId,
    }),
  });

  const data = await res.json();
//   console.log(data,"here u go");
  
  if (!res.ok) return;

  // 3️⃣ Create chat if backend created history
  if (!selectedChatId) {
    setSelectedChatId(data.historyId);
    setChats((prev) => [
      {
        id: data.historyId,
        title: "New Chat",
        date: new Date().toLocaleDateString(),
        messages: [],
      },
      ...prev,
    ]);
  }

  // 4️⃣ Append AI message
  setChats((prev) =>
    prev.map((chat) =>
      chat.id === data.historyId
        ? {
            ...chat,
            messages: [
              ...chat.messages,
              {
                id: crypto.randomUUID(),
                role: "bot",
                content: data.message,
              },
            ],
          }
        : chat
    )
  );
};




    // const simulateBotReply = (chatId: string) => {
    //     setTimeout(() => {
    //         const botMessage: Message = {
    //             id: crypto.randomUUID(),
    //             role: "bot",
    //             content: "This is a demo bot response.",
    //         };

    //         setChats((prev) =>
    //             prev.map((chat) =>
    //                 chat.id === chatId
    //                     ? { ...chat, messages: [...chat.messages, botMessage] }
    //                     : chat
    //             )
    //         );
    //     }, 800);
    // };

    return (
        <ChatContext.Provider
            value={{
                chats,
                selectedChatId,
                selectChat,
                sendMessage,
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export function useChat() {
    const context = useContext(ChatContext)
    if (!context) {
        throw new Error("useChat must be used inside ChatProvider")
    }
    return context
}
