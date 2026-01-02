import SubscriptionPlanPage from '@/components/admin/SubscriptionPlanPage'
import React from 'react'
import { AppSidebar } from '@/components/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

const page = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className=' w-full'>
          <SubscriptionPlanPage />
        </div>
      </SidebarProvider>
    </div>
  )
}

export default page