"use client"

import { useEffect, useState } from "react"
import UserCard from "@/components/admin/UserCard"
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

type User = {
    id: string
    name: string | null
    email: string
    role: string
    subscriptionTag: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/user", {
                    credentials: "include",
                })

                if (!res.ok) {
                    throw new Error("Failed to fetch users")
                }

                const data = await res.json()
                setUsers(data.users)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (loading) {
        return (
            <div className="p-6 text-muted-foreground">
                Loading users...
            </div>
        )
    }

    return (


        <SidebarProvider>
            <div className="flex h-screen w-full">
                {/* Sidebar */}
                <AppSidebar />

                {/* Main Content */}
                <main className="flex-1 overflow-auto">
                    <div className="p-6 space-y-6">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-semibold">Users</h1>
                        </div>

                        {/* Grid */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {users.map((user) => (
                                <UserCard
                                    key={user.id}
                                    name={user.name}
                                    email={user.email}
                                    role={user.role}
                                    subscriptionTag={user.subscriptionTag}
                                    onEdit={() => {
                                        console.log("EDIT USER", user.id)
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </SidebarProvider>

    )
}
