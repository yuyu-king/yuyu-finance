"use client"

import { Loader2 } from "lucide-react"

export function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="flex items-center space-x-2">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="text-gray-600">加载中...</span>
      </div>
    </div>
  )
} 