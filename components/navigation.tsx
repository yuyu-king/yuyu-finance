"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { createContext, useContext, useState, ReactNode } from "react"
import { Home, Wallet, FileText, Menu } from "lucide-react"

const navigation = [
  { name: "首页总览", href: "/", icon: Home },
  { name: "账户管理", href: "/accounts", icon: Wallet },
  { name: "流水记录", href: "/transactions", icon: FileText },
]

// 创建 Context
interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function TopNavigation() {
  const { isCollapsed, setIsCollapsed } = useSidebar()

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow-sm border-b border-gray-200 z-40">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">鱼鱼资金管理</h1>
        </div>
      </div>
    </nav>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { isCollapsed } = useSidebar()

  return (
    <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 z-30 w-16">
      {/* 侧边栏内容 */}
      <div className={`absolute top-0 left-0 h-full bg-white shadow-lg transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* 导航菜单 */}
        <nav className="mt-4 px-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-3 py-3 mb-1 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && (
                  <span className="ml-3 truncate">{item.name}</span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
} 