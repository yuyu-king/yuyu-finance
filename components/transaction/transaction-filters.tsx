"use client"

import { Search, Plus } from "lucide-react"
import { TransactionType } from "@/lib/domain/transaction/enum/transaction-type.enum"
import { TransactionCategory } from "@/lib/domain/transaction/enum/transaction-category.enum"

interface TransactionFiltersProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  filterType: "all" | TransactionType
  onFilterTypeChange: (value: "all" | TransactionType) => void
  filterCategory: "all" | TransactionCategory
  onFilterCategoryChange: (value: "all" | TransactionCategory) => void
  onAddTransaction: () => void
}

const categories = [
  { value: TransactionCategory.Food, label: "餐饮" },
  { value: TransactionCategory.Transport, label: "交通" },
  { value: TransactionCategory.Shopping, label: "购物" },
  { value: TransactionCategory.Entertainment, label: "娱乐" },
  { value: TransactionCategory.Housing, label: "住房" },
  { value: TransactionCategory.Salary, label: "工资" },
  { value: TransactionCategory.Investment, label: "投资" },
  { value: TransactionCategory.Other, label: "其他" },
]

export function TransactionFilters({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  filterCategory,
  onFilterCategoryChange,
  onAddTransaction,
}: TransactionFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="搜索交易记录..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            value={filterType}
            onChange={(e) => onFilterTypeChange(e.target.value as "all" | TransactionType)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">所有类型</option>
            <option value={TransactionType.Income}>收入</option>
            <option value={TransactionType.Expense}>支出</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => onFilterCategoryChange(e.target.value as "all" | TransactionCategory)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">所有分类</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          <button
            onClick={onAddTransaction}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            添加记录
          </button>
        </div>
      </div>
    </div>
  )
} 