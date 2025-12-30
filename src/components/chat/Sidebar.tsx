"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Settings,
  Crown,
  MessageSquare,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface ChatItem {
  id: number
  title: string
  date: string
}

interface SidebarProps {
  chatHistory: ChatItem[]
  selectedChat: number | null
  onSelectChat: (id: number) => void
}

export function AppSidebar({
  chatHistory,
  selectedChat,
  onSelectChat,
}: SidebarProps) {

  return (
    <Sidebar collapsible="icon" className="bg-background group">
      <SidebarHeader className="space-y-4 px-4">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 cursor-pointer bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm">A</span>
          </div>

          <h1 className="text-lg font-bold group-data-[state=collapsed]:hidden">
            Arinova Studio
          </h1>
        </div>

        <Button onClick={() => onSelectChat(0)} className="w-full gap-2 cursor-pointer">
          <Plus size={18} />
          <span className="group-data-[state=collapsed]:hidden">
            New Chat
          </span>
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full px-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <Settings size={16} />
                <span className="group-data-[state=collapsed]:hidden">
                  Personalization
                </span>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer">
                <Crown size={16} />
                <span className="group-data-[state=collapsed]:hidden">
                  Upgrade to Pro
                </span>
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
                  isActive={selectedChat === chat.id}
                  onClick={() => onSelectChat(chat.id)}
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

      <SidebarFooter className="px-4 py-3 group">
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

          <SidebarMenuButton className="cursor-pointer">
            <LogOut size={16} />
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
