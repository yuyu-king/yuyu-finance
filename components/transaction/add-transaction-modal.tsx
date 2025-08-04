"use client"

import { useState } from "react"
import { TransactionType } from "@/lib/domain/transaction/enum/transaction-type.enum"
import { TransactionCategory } from "@/lib/domain/transaction/enum/transaction-category.enum"

interface AddTransactionModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (transactionData: {
    sourceAccount: string
    targetAccount: string
    type: TransactionType
    amount: number
    category: TransactionCategory
    transactionTime: string
    note?: string
  }) => void
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

const accounts = ["工商银行储蓄卡", "招商银行信用卡", "支付宝", "微信钱包"]

export function AddTransactionModal({ isOpen, onClose, onAdd }: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    transactionTime: new Date().toISOString().split('T')[0],
    type: TransactionType.Expense,
    amount: 0,
    category: TransactionCategory.Other,
    sourceAccount: "工商银行储蓄卡",
    targetAccount: "",
    note: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAdd(formData)
    setFormData({
      transactionTime: new Date().toISOString().split('T')[0],
      type: TransactionType.Expense,
      amount: 0,
      category: TransactionCategory.Other,
      sourceAccount: "工商银行储蓄卡",
      targetAccount: "",
      note: "",
    })
  }

  const handleClose = () => {
    setFormData({
      transactionTime: new Date().toISOString().split('T')[0],
      type: TransactionType.Expense,
      amount: 0,
      category: TransactionCategory.Other,
      sourceAccount: "工商银行储蓄卡",
      targetAccount: "",
      note: "",
    })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium text-gray-900 mb-4">添加交易记录</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">日期</label>
              <input
                type="date"
                value={formData.transactionTime}
                onChange={(e) => setFormData({...formData, transactionTime: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">类型</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value as TransactionType})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value={TransactionType.Expense}>支出</option>
                <option value={TransactionType.Income}>收入</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">金额</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
                min="0"
                step="0.01"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">分类</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value as TransactionCategory})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">来源账户</label>
              <select
                value={formData.sourceAccount}
                onChange={(e) => setFormData({...formData, sourceAccount: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                {accounts.map((account) => (
                  <option key={account} value={account}>
                    {account}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">目标账户 (可选)</label>
              <input
                type="text"
                value={formData.targetAccount}
                onChange={(e) => setFormData({...formData, targetAccount: e.target.value})}
                placeholder="转账目标账户"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">描述</label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
                placeholder="交易描述"
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                添加
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 