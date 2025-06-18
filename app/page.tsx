"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { DataService, type Account, type MonthlyData, type CategoryData } from "@/lib/data"
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  CreditCard,
  PiggyBank,
  BarChart3,
  Loader2
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts"

export default function Home() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<{
    totalBalance: number
    totalIncome: number
    totalExpense: number
    netIncome: number
    accounts: Account[]
    monthlyData: MonthlyData[]
    categoryData: CategoryData[]
  } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        const dashboardData = await DataService.getDashboardData()
        setData(dashboardData)
      } catch (err) {
        setError('加载数据失败，请稍后重试')
        console.error('Failed to fetch dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

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

  if (error || !data) {
    return (
      <Layout>
        <main className="p-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error || '数据加载失败'}</p>
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

  const { totalBalance, totalIncome, totalExpense, netIncome, accounts, monthlyData, categoryData } = data

  return (
    <Layout>
      <main className="p-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">首页总览</h1>
          <p className="text-gray-600 mt-2">查看您的财务状况概览</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Wallet className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">总资产</p>
                <p className="text-2xl font-bold text-gray-900">¥{totalBalance.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">本月收入</p>
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
                <p className="text-sm font-medium text-gray-600">本月支出</p>
                <p className="text-2xl font-bold text-gray-900">¥{totalExpense.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <PiggyBank className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">净收入</p>
                <p className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ¥{netIncome.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 图表区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 收支趋势图 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">收支趋势</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} name="收入" />
                <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} name="支出" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 支出分类饼图 */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">支出分类</h3>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 账户列表 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">账户概览</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {accounts.map((account) => (
              <div key={account.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-900">{account.name}</p>
                    <p className="text-sm text-gray-500">{account.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">¥{account.balance.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    {((account.balance / totalBalance) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  )
}
