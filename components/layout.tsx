"use client"

import { ReactNode } from "react"
import { TopNavigation, Sidebar, SidebarProvider } from "./navigation"

export function Layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gray-50">
        <TopNavigation />
        <Sidebar />
        <main className="pt-16 pl-16">
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
} 