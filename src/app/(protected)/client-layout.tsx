'use client'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex h-screen w-full">
                <AppSidebar />

                <main className="flex-1 overflow-auto ">
                    {/* Mobile trigger */}
                    <div className="md:hidden p-2 border-b">
                        <SidebarTrigger />
                    </div>

                    {children}
                </main>
            </div>
        </SidebarProvider>

    );
}
