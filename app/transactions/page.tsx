"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { DataService, type Transaction } from "@/lib/data"
import { 
  Plus, 
  Search, 
  TrendingUp,
  TrendingDown,
  CreditCard,
  ShoppingCart,
  Utensils,
  Car,
  Home,
  Gamepad2,
  Loader2
} from "lucide-react"

const categories = [
  { value: "food", label: "餐饮", icon: Utensils, color: "#FF6B6B" },
  { value: "transport", label: "交通", icon: Car, color: "#4ECDC4" },
  { value: "shopping", label: "购物", icon: ShoppingCart, color: "#45B7D1" },
  { value: "entertainment", label: "娱乐", icon: Gamepad2, color: "#96CEB4" },
  { value: "housing", label: "住房", icon: Home, color: "#FFEAA7" },
  { value: "salary", label: "工资", icon: TrendingUp, color: "#10B981" },
  { value: "investment", label: "投资", icon: TrendingUp, color: "#8B5CF6" },
  { value: "other", label: "其他", icon: CreditCard, color: "#6B7280" },
]

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "income" | "expense">("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: "expense" as "income" | "expense",
    amount: 0,
    category: "other",
    account: "工商银行储蓄卡",
    description: "",
    tags: "",
  })

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true)
        setError(null)
        const transactionsData = await DataService.getTransactions()
        setTransactions(transactionsData)
      } catch (err) {
        setError('加载交易数据失败，请稍后重试')
        console.error('Failed to fetch transactions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [])

  const accounts = ["工商银行储蓄卡", "招商银行信用卡", "支付宝", "微信钱包"]

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.account.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory
    
    return matchesSearch && matchesType && matchesCategory
  })

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0)

  const netAmount = totalIncome - totalExpense

  const handleAddTransaction = async () => {
    try {
      const newTransaction = await DataService.addTransaction({
        ...formData,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()) : [],
      })
      setTransactions([newTransaction, ...transactions])
      setShowAddModal(false)
      setFormData({
        date: new Date().toISOString().split('T')[0],
        type: "expense",
        amount: 0,
        category: "other",
        account: "工商银行储蓄卡",
        description: "",
        tags: "",
      })
    } catch (err) {
      console.error('Failed to add transaction:', err)
      alert('添加交易记录失败，请重试')
    }
  }

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.value === category)
    return cat ? cat.icon : CreditCard
  }

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.value === category)
    return cat ? cat.label : "其他"
  }

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.value === category)
    return cat ? cat.color : "#6B7280"
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('zh-CN', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short'
    })
  }

  if (loading) {
    return (
      <Layout>
        <main className="p-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="text-gray-600">加载中...</span>
            </div>
          </div>
        </main>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <main className="p-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                重新加载
              </button>
            </div>
          </div>
        </main>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className="p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">流水记录</h1>
          <p className="text-gray-600 mt-2">查看和管理您的所有交易记录</p>
        </div>

        {/* 统计卡片 */}
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

        {/* 筛选和搜索 */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="搜索交易记录..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as "all" | "income" | "expense")}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">所有类型</option>
                <option value="income">收入</option>
                <option value="expense">支出</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
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
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                添加记录
              </button>
            </div>
          </div>
        </div>

        {/* 交易列表 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">交易记录</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => {
              const IconComponent = getCategoryIcon(transaction.category)
              return (
                <div key={transaction.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div 
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${getCategoryColor(transaction.category)}20` }}
                    >
                      <IconComponent 
                        className="w-5 h-5" 
                        style={{ color: getCategoryColor(transaction.category) }}
                      />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{getCategoryLabel(transaction.category)} • {transaction.account}</p>
                      {transaction.tags.length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {transaction.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}¥{transaction.amount.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 添加交易记录模态框 */}
        {showAddModal && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">添加交易记录</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">日期</label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">类型</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value as "income" | "expense"})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="expense">支出</option>
                      <option value="income">收入</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">金额</label>
                    <input
                      type="number"
                      value={formData.amount}
                      onChange={(e) => setFormData({...formData, amount: parseFloat(e.target.value) || 0})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">分类</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">账户</label>
                    <select
                      value={formData.account}
                      onChange={(e) => setFormData({...formData, account: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {accounts.map((account) => (
                        <option key={account} value={account}>
                          {account}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">描述</label>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">标签 (用逗号分隔)</label>
                    <input
                      type="text"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      placeholder="日常,餐饮"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setFormData({
                        date: new Date().toISOString().split('T')[0],
                        type: "expense",
                        amount: 0,
                        category: "other",
                        account: "工商银行储蓄卡",
                        description: "",
                        tags: "",
                      })
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    取消
                  </button>
                  <button
                    onClick={handleAddTransaction}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    添加
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  )
} 