"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from "@/components/ui/sidebar"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Settings,
  Crown,
  MessageSquare,
  // LogOut,
  PanelLeft,
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useState } from "react"
import type { MouseEventHandler } from "react"
import { ThemeToggle } from "./theme-toggle"
import { useChat } from "@/context/chat-provider"
import { useRouter } from "next/navigation"

// interface ChatItem {
//   id: number
//   title: string
//   date: string
// }

// interface SidebarProps {
//   chatHistory: ChatItem[]
//   selectedChat: number | null
//   onSelectChat: (id: number) => void
// }

type PanelIconProps = {
  className?: string
  onClick: MouseEventHandler<HTMLButtonElement>
}

export function PanelIcon({ className, onClick }: PanelIconProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={`h-8 w-8 cursor-pointer ${className ?? ""}`}
    >
      <PanelLeft size={18} />
    </Button>
  )
}

export function AppSidebar() {

  const router = useRouter()
  const { toggleSidebar, state } = useSidebar()
  const { chats, selectedChatId, selectChat } = useChat()

  const [isHovered, setIsHovered] = useState(false)
  const showIcon = state === "collapsed" && isHovered

  const chatHistory = chats.map((chat) => ({
    id: chat.id,
    title: chat.title,
    date: chat.date,
  }))

  const handleSelectChat = (id: number) => {
    selectChat(id)
    router.push(`/chat/${id}`)
  }

  return (
    <Sidebar collapsible="icon" className="bg-background group">
      <SidebarHeader className="space-y-4 px">
        <div
          className="flex items-center gap-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* LOGO / ICON SLOT */}
          <div className="w-8 h-8 flex items-center justify-center">
            {showIcon ? (
              <PanelIcon onClick={toggleSidebar} />
            ) : (
              <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center cursor-pointer">
                <span className="text-white font-bold text-sm">A</span>
              </div>
            )}
          </div>

          {/* TITLE (expanded only) */}
          {state === "expanded" && (
            <h1 className="text-lg font-bold">Arinova Studio</h1>
          )}

          {/* PANEL ICON (expanded view) */}
          {state === "expanded" && (
            <PanelIcon className="ml-auto" onClick={toggleSidebar} />
          )}
        </div>

        {/* NEW CHAT */}
        <Button
          onClick={() => { router.push("/"); selectChat(0) }}
          className="w-full gap-2 cursor-pointer"
        >
          <Plus size={18} />
          {state === "expanded" && <span>New Chat</span>}
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <Settings size={16} />
                <Link href="/personalization">
                  <span className="group-data-[state=collapsed]:hidden">
                    Personalization
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <Crown size={16} />
                <Link href="/subscriptions">
                  <span className="group-data-[state=collapsed]:hidden">
                    Upgrade to Pro
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>

          <div className="mt-4 px-2 text-xs font-semibold text-muted-foreground group-data-[state=collapsed]:hidden">
            Chat History
          </div>

          <SidebarMenu className="mt-2">
            {chatHistory.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  isActive={selectedChatId === chat.id}
                  onClick={() => handleSelectChat(chat.id)}
                  className="py-6 cursor-pointer"
                >
                  <MessageSquare size={14} />
                  <div className="flex flex-col text-left group-data-[state=collapsed]:hidden">
                    <span className="truncate text-sm font-medium">
                      {chat.title}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {chat.date}
                    </span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="px py-3 group">
        <div className="flex items-center gap-23">
          <div className="flex gap-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 group-data-[state=collapsed]:hidden">
              <p className="text-sm font-medium truncate">John Doe</p>
              <p className="text-xs text-muted-foreground">Pro User</p>
            </div>
          </div>

          {/* <SidebarMenuButton className="cursor-pointer group-data-[state=collapsed]:hidden">
            <LogOut size={16} />
          </SidebarMenuButton> */}
          <div className="cursor-pointer group-data-[state=collapsed]:hidden">
            <ThemeToggle />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
