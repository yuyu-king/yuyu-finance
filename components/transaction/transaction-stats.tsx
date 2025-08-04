"use client"

import { TrendingUp, TrendingDown, CreditCard } from "lucide-react"

interface TransactionStatsProps {
  totalIncome: number
  totalExpense: number
  netAmount: number
}

export function TransactionStats({ totalIncome, totalExpense, netAmount }: TransactionStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">总收入</p>
            <p className="text-2xl font-bold text-gray-900">¥{totalIncome.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-red-100 rounded-lg">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">总支出</p>
            <p className="text-2xl font-bold text-gray-900">¥{totalExpense.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CreditCard className="w-6 h-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">净收入</p>
            <p className={`text-2xl font-bold ${netAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ¥{netAmount.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 