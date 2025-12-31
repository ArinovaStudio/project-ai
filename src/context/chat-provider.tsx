"use client"

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react"

export type Message = {
    id: number
    role: "user" | "bot"
    content: string
}

export type Chat = {
    id: number
    title: string
    messages: Message[]
    date: string
}

type ChatContextType = {
    chats: Chat[]
    selectedChatId: number | null
    selectChat: (id: number) => void
    addMessage: (chatId: number, message: Message) => void
    createNewChat: () => void
}

const ChatContext = createContext<ChatContextType | null>(null)

export function ChatProvider({ children }: { children: ReactNode }) {
    const [chats, setChats] = useState<Chat[]>([
        {
            id: 1,
            title: "Best Places to Visit in India",
            date: "Today",
            messages: [
                { id: 1, role: "user", content: "What are the best places to visit in India?" },
                { id: 2, role: "bot", content: "Some top destinations include Goa, Kerala, Ladakh, Rajasthan, and Himachal Pradesh." },
                { id: 3, role: "user", content: "Which place is best for nature lovers?" },
                { id: 4, role: "bot", content: "Kerala and Himachal Pradesh are perfect for nature lovers." },
                { id: 5, role: "user", content: "Best time to visit Kerala?" },
                { id: 6, role: "bot", content: "October to March is the best time to visit Kerala." },
            ],
        },
        {
            id: 2,
            title: "Best Places to Visit in Europe",
            date: "Yesterday",
            messages: [
                { id: 1, role: "user", content: "Which European countries should I visit first?" },
                { id: 2, role: "bot", content: "France, Italy, Switzerland, and Spain are great for first-time travelers." },
                { id: 3, role: "user", content: "Best city for couples?" },
                { id: 4, role: "bot", content: "Paris and Venice are very popular for couples." },
            ],
        },
        {
            id: 3,
            title: "Weekend Trip Ideas",
            date: "2 days ago",
            messages: [
                { id: 1, role: "user", content: "Suggest some weekend trip ideas." },
                { id: 2, role: "bot", content: "You can consider nearby hill stations, beach towns, or heritage cities." },
                { id: 3, role: "user", content: "Any budget-friendly options?" },
                { id: 4, role: "bot", content: "Local hill stations or nearby cultural towns are budget-friendly." },
            ],
        },
        {
            id: 4,
            title: "Best Food to Try in Kolkata",
            date: "3 days ago",
            messages: [
                { id: 1, role: "user", content: "What food should I try in Kolkata?" },
                { id: 2, role: "bot", content: "You must try Kathi Rolls, Mishti Doi, Rosogolla, and Fish Curry." },
                { id: 3, role: "user", content: "Best street food?" },
                { id: 4, role: "bot", content: "Kathi Rolls from Park Street and Phuchka are very popular." },
            ],
        },
        {
            id: 5,
            title: "Solo Travel Tips",
            date: "Last week",
            messages: [
                { id: 1, role: "user", content: "Is solo travel safe?" },
                { id: 2, role: "bot", content: "Yes, with proper planning and awareness, solo travel is safe." },
                { id: 3, role: "user", content: "Any tips for beginners?" },
                { id: 4, role: "bot", content: "Start with popular destinations, stay connected, and trust your instincts." },
            ],
        },
        {
            id: 6,
            title: "Best Beaches in the World",
            date: "Last week",
            messages: [
                { id: 1, role: "user", content: "Which are the best beaches in the world?" },
                { id: 2, role: "bot", content: "Maldives, Bora Bora, Bali, and Seychelles are among the best." },
                { id: 3, role: "user", content: "Best beach for honeymoon?" },
                { id: 4, role: "bot", content: "Maldives and Bora Bora are perfect honeymoon destinations." },
            ],
        },
        {
            id: 7,
            title: "Mountain Trekking Destinations",
            date: "2 weeks ago",
            messages: [
                { id: 1, role: "user", content: "Suggest good mountain trekking destinations." },
                { id: 2, role: "bot", content: "You can try Kedarkantha, Roopkund, Annapurna, or Mount Kilimanjaro." },
                { id: 3, role: "user", content: "Beginner-friendly treks?" },
                { id: 4, role: "bot", content: "Kedarkantha and Triund are beginner-friendly." },
            ],
        },
    ])

    const [selectedChatId, setSelectedChatId] = useState<number | null>(1)

    const selectChat = (id: number) => {
        setSelectedChatId(id)
    }

    const addMessage = (chatId: number, message: Message) => {
        setChats((prev) =>
            prev.map((chat) =>
                chat.id === chatId
                    ? { ...chat, messages: [...chat.messages, message] }
                    : chat
            )
        )
    }

    const createNewChat = () => {
        const newChat: Chat = {
            id: Date.now(),
            title: "New Chat",
            messages: [],
            date: "Today"
        }

        setChats((prev) => [newChat, ...prev])
        setSelectedChatId(newChat.id)
    }

    return (
        <ChatContext.Provider
            value={{
                chats,
                selectedChatId,
                selectChat,
                addMessage,
                createNewChat,
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
