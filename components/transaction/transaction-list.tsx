"use client"

import { StandardTransaction } from "@/lib/domain/transaction/standard-transaction.entity"
import { TransactionType } from "@/lib/domain/transaction/enum/transaction-type.enum"
import { TransactionCategory } from "@/lib/domain/transaction/enum/transaction-category.enum"
import { 
  Utensils,
  Car,
  ShoppingCart,
  Gamepad2,
  Home,
  TrendingUp,
  CreditCard
} from "lucide-react"

interface TransactionListProps {
  transactions: StandardTransaction[]
}

const categoryConfig = {
  [TransactionCategory.Food]: { label: "餐饮", icon: Utensils, color: "#FF6B6B" },
  [TransactionCategory.Transport]: { label: "交通", icon: Car, color: "#4ECDC4" },
  [TransactionCategory.Shopping]: { label: "购物", icon: ShoppingCart, color: "#45B7D1" },
  [TransactionCategory.Entertainment]: { label: "娱乐", icon: Gamepad2, color: "#96CEB4" },
  [TransactionCategory.Housing]: { label: "住房", icon: Home, color: "#FFEAA7" },
  [TransactionCategory.Salary]: { label: "工资", icon: TrendingUp, color: "#10B981" },
  [TransactionCategory.Investment]: { label: "投资", icon: TrendingUp, color: "#8B5CF6" },
  [TransactionCategory.Other]: { label: "其他", icon: CreditCard, color: "#6B7280" },
}

export function TransactionList({ transactions }: TransactionListProps) {
  const getCategoryConfig = (category: TransactionCategory) => {
    return categoryConfig[category] || categoryConfig[TransactionCategory.Other]
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    })
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">交易记录</h3>
        </div>
        <div className="px-6 py-12 text-center">
          <p className="text-gray-500">暂无交易记录</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">交易记录</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {transactions.map((transaction) => {
          const categoryConfig = getCategoryConfig(transaction.category)
          const IconComponent = categoryConfig.icon
          
          return (
            <div key={transaction.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${categoryConfig.color}20` }}
                >
                  <IconComponent 
                    className="w-5 h-5" 
                    style={{ color: categoryConfig.color }}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">{transaction.note}</p>
                  <p className="text-sm text-gray-500">{categoryConfig.label} • {transaction.sourceAccount}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className={`text-sm font-medium ${transaction.type === TransactionType.Income ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === TransactionType.Income ? '+' : '-'}¥{transaction.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">{formatDate(transaction.transactionTime)}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
} 