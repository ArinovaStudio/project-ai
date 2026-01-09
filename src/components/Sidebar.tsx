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
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Settings,
  Crown,
  MessageSquare,
  LogOut, User,
  PanelLeft,
  ShoppingBag,
  MoreHorizontal,
  Trash,
} from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { MouseEventHandler } from "react"
import { ThemeToggle } from "./theme-toggle"
import { useChat } from "@/context/chat-provider"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-provider"
import { useSession } from "next-auth/react";
import Image from "next/image";

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

type Role = "USER" | "ADMIN";

const menuItems = [
  {
    label: "Users",
    href: "/users",
    icon: User,
    roles: ["ADMIN"],
  },
  {
    label: "Collaborations",
    href: "/collaboration",
    icon: Settings,
    roles: ["ADMIN"],
  },
  {
    label: "SubscriptionPlans",
    href: "/subscriptionplan",
    icon: ShoppingBag,
    roles: ["ADMIN"],
  },
  {
    label: "Upgrade to Pro",
    href: "/subscriptions",
    icon: Crown,
    roles: ["USER", "ADMIN"],
  },
];

function formatChatDate(dateString: string) {
  const today = new Date();
  const date = new Date(dateString);

  // Remove time for accurate day diff
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "Last week";

  return `${Math.floor(diffDays / 7)} weeks ago`;
}


export function PanelIcon({ className, onClick }: PanelIconProps) {
  return (
    <Button
      variant="ghostanother"
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
  const { toggleSidebar, state, setOpen } = useSidebar()
  const { chats, selectedChatId, selectChat } = useChat()
  const { logout } = useAuth()
  const [user, setUser] = useState<any>(null);
  // console.log("user = ", user)

  const { data: session } = useSession();
  // console.log("user = ", session?.user)

  const [isHovered, setIsHovered] = useState(false)
  const showIcon = state === "collapsed" && isHovered

  const chatHistory = chats.map((chat) => ({
    id: chat.id,
    title: chat.title,
    date: chat.date,
  }))

  const handleSelectChat = (id: string) => {
    selectChat(id)
    router.push(`/chat/${id}`)
  }

  const handleLogout = async () => {
    logout()
    router.push("/login");
  };

  async function fetchUser() {
    try {
      const response = await fetch('/api/user/edit', { credentials: 'include' });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

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
              <Link href="/">
                <div className="w-8 h-8 rounded-lg overflow-hidden cursor-pointer">
                  <Image
                    src="/arinovalogo.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="object-cover"
                    priority
                  />
                </div>
              </Link>
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
          onClick={() => {
            router.push("/")
            selectChat(0)
          }}
          className="
    h-10
    w-full
    flex items-center justify-center gap-2

    rounded-md
    group-data-[state=collapsed]:w-8
    group-data-[state=collapsed]:rounded-full
    group-data-[state=collapsed]:px-0
    group-data-[state=collapsed]:mx-auto

    bg-gradient-to-r
    from-[#1b1b2a]
    via-[#3a2c6f]
    to-[#7b4bff]

    backdrop-blur-lg border border-white/15 text-white font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),0_8px_20px_rgba(0,0,0,0.45)] hover:scale-[1.02] transition-all duration-200

  "
        >
          <Plus
            className="
      opacity-90
      h-[12px] w-[12px]
      group-data-[state=expanded]:h-[16px]
      group-data-[state=expanded]:w-[16px]
    "
          />

          <span className="group-data-[state=collapsed]:hidden">
            New Chat
          </span>
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="h-full px-2">
          {/* <SidebarMenu>
            {menuItems
              .filter(item => item.roles.includes(session?.user?.role as Role))
              .map(({ label, href, icon: Icon }) => (
                <SidebarMenuItem key={href}>
                  <Link href={href}>
                    <SidebarMenuButton className="cursor-pointer" onClick={() => setOpen(false)}>
                      <Icon size={16} />
                      <span className="group-data-[state=collapsed]:hidden">
                        {label}
                      </span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
          </SidebarMenu> */}

          <div className="mt-4 px-2 text-xs font-semibold text-muted-foreground group-data-[state=collapsed]:hidden">
            Chat History
          </div>

          <SidebarMenu className="mt-1 group-data-[state=collapsed]:hidden">
            {chatHistory.map((chat) => (
              <SidebarMenuItem key={chat.id} className="group/chat">
                <SidebarMenuButton
                  isActive={selectedChatId === chat.id}
                  onClick={() => {
                    handleSelectChat(chat.id);
                  }}
                  className="py-6 cursor-pointer"
                >
                  <div className="flex items-center justify-between w-[95%]">
                    <div className="flex flex-col text-left group-data-[state=collapsed]:hidden w-[75%]">
                      <span className="truncate text-sm font-medium">
                        {chat.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatChatDate(chat.date)}
                      </span>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="opacity-100 md:opacity-0 md:group-hover/chat:opacity-100 transition p-1 rounded-md hover:bg-muted"
                        >
                          <MoreHorizontal className="w-4 h-4 text-muted-foreground cursor-pointer" />
                        </div>
                      </DropdownMenuTrigger>


                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          <Trash className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="px-3 py-3 group">
        {/* <div className="flex items-center w-full justify-between bg-amber-800">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-2 cursor-pointer select-none bg-amber-600">
                <Avatar className="h-8 w-8 -ml-1">
                  <AvatarImage src={user?.image ?? ""} />
                  <AvatarFallback>
                    {user?.name?.trim()?.charAt(0)?.toUpperCase() || ""}
                  </AvatarFallback>
                </Avatar>
                <div className="flex justify-between items-center bg-amber-300 w-full">
                  <div className="flex-1 min-w-0 group-data-[state=collapsed]:hidden">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium truncate">{user?.name}</p>
                      <div className="group-data-[state=collapsed]:hidden bg-[#CF5056] px-2 py-0.5 rounded-md text-white text-xs font-semibold">
                        {user?.subscriptionTag}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>

                  </div>

                </div>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              side="top"
              align="start"
              className="w-44"
            >
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                <User className="mr-2 h-4 w-4" />
                My Profile
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="text-red-600 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


          <div className="cursor-pointer group-data-[state=collapsed]:hidden">
            <ThemeToggle />
          </div>
        </div> */}

        <div
          className="
    w-full
    group-data-[state=collapsed]:border-0
    group-data-[state=collapsed]:p-0
    group-data-[state=collapsed]:rounded-none
    border px-2 py-2 rounded-md transition-colors
  "
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* PROFILE ROW (always visible avatar) */}
              <div
                onClick={() => router.push("/profile")}
                className="flex gap-2 w-full cursor-pointer select-none"
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarImage src={user?.image ?? ""} />
                  <AvatarFallback className="dark:bg-[#333448] bg-[#8284b5]">
                    {user?.name?.trim()?.charAt(0)?.toUpperCase() || ""}
                  </AvatarFallback>
                </Avatar>

                <div className="flex items-center flex-1 min-w-0 group-data-[state=collapsed]:hidden">
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-medium truncate">
                        {user?.name}
                      </p>

                      {/* ✅ STOP propagation here */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation()
                          if (user?.subscriptionTag === "FREE") {
                            router.push("/subscriptions");
                          }
                        }}
                        className="bg-[#CF5056] px-2 py-0.5 rounded-md text-white text-xs font-semibold cursor-pointer"
                      >
                        {user?.subscriptionTag}
                      </div>

                    </div>

                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

            </DropdownMenuTrigger>
          </DropdownMenu>

          {/* DIVIDER — hidden when collapsed */}
          <div className="w-full border-t border-border my-2 group-data-[state=collapsed]:hidden" />

          {user?.subscriptionTag === "FREE" && <> <div className="text-sm text-muted-foreground group-data-[state=collapsed]:hidden py-1">
            <button
              onClick={() => {
                router.push("/subscriptions");
              }}
              className="flex items-center gap-1 hover:text-gray-200 transition-colors cursor-pointer"
            >
              <Crown size={16} />Upgrade to Pro
            </button>

          </div>

            <div className="w-full border-t border-border mt-2 group-data-[state=collapsed]:hidden" /></>}

          {/* EXTRA CONTENT — hidden when collapsed */}
          <div className="flex items-center justify-between text-sm text-muted-foreground group-data-[state=collapsed]:hidden ">
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 hover:text-red-600 transition-colors cursor-pointer"
            >
              <LogOut size={16} />
              Logout
            </button>

            <div className="hover:bg-transparent">
              <ThemeToggle />
            </div>

          </div>
        </div>

      </SidebarFooter>
    </Sidebar>
  )
}
