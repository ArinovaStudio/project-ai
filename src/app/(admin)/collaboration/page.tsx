import CollaborationPage from '@/components/admin/CollaborationPage'
import { AppSidebar } from '@/components/Sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const page = () => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <div className=' w-full'>
        <CollaborationPage />
      </div>
      </SidebarProvider>

  )
}

export default page