"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { DataService, type Account } from "@/lib/data"
import { 
  Plus, 
  Edit, 
  Trash2, 
  CreditCard, 
  Wallet,
  PiggyBank,
  Building2,
  Loader2
} from "lucide-react"

const accountTypes = [
  { value: "savings", label: "储蓄卡", icon: CreditCard },
  { value: "credit", label: "信用卡", icon: CreditCard },
  { value: "digital", label: "电子钱包", icon: Wallet },
  { value: "investment", label: "投资账户", icon: PiggyBank },
  { value: "other", label: "其他", icon: Building2 },
]

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingAccount, setEditingAccount] = useState<Account | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    type: "savings",
    balance: 0,
    currency: "CNY",
    description: "",
  })

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true)
        setError(null)
        const accountsData = await DataService.getAccounts()
        setAccounts(accountsData)
      } catch (err) {
        setError('加载账户数据失败，请稍后重试')
        console.error('Failed to fetch accounts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchAccounts()
  }, [])

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
  const activeAccounts = accounts.filter(account => account.isActive)

  const handleAddAccount = async () => {
    try {
      const newAccount = await DataService.addAccount({
        ...formData,
        isActive: true,
      })
      setAccounts([...accounts, newAccount])
      setShowAddModal(false)
      setFormData({
        name: "",
        type: "savings",
        balance: 0,
        currency: "CNY",
        description: "",
      })
    } catch (err) {
      console.error('Failed to add account:', err)
      alert('添加账户失败，请重试')
    }
  }

  const handleEditAccount = async () => {
    if (!editingAccount) return
    try {
      const updatedAccount = await DataService.updateAccount(editingAccount.id, formData)
      setAccounts(accounts.map(account => 
        account.id === editingAccount.id ? updatedAccount : account
      ))
      setEditingAccount(null)
      setFormData({
        name: "",
        type: "savings",
        balance: 0,
        currency: "CNY",
        description: "",
      })
    } catch (err) {
      console.error('Failed to update account:', err)
      alert('更新账户失败，请重试')
    }
  }

  const handleDeleteAccount = async (id: string) => {
    try {
      await DataService.deleteAccount(id)
      setAccounts(accounts.map(account => 
        account.id === id 
          ? { ...account, isActive: false }
          : account
      ))
    } catch (err) {
      console.error('Failed to delete account:', err)
      alert('删除账户失败，请重试')
    }
  }

  const openEditModal = (account: Account) => {
    setEditingAccount(account)
    setFormData({
      name: account.name,
      type: account.type,
      balance: account.balance,
      currency: account.currency,
      description: account.description || "",
    })
  }

  const getTypeIcon = (type: string) => {
    const accountType = accountTypes.find(t => t.value === type)
    return accountType ? accountType.icon : Building2
  }

  const getTypeLabel = (type: string) => {
    const accountType = accountTypes.find(t => t.value === type)
    return accountType ? accountType.label : "其他"
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
          <h1 className="text-3xl font-bold text-gray-900">账户管理</h1>
          <p className="text-gray-600 mt-2">管理您的所有账户信息</p>
        </div>

        {/* 统计卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">活跃账户</p>
                <p className="text-2xl font-bold text-gray-900">{activeAccounts.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <PiggyBank className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">账户类型</p>
                <p className="text-2xl font-bold text-gray-900">{new Set(accounts.map(a => a.type)).size}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 账户列表 */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">账户列表</h3>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              添加账户
            </button>
          </div>
          <div className="divide-y divide-gray-200">
            {activeAccounts.map((account) => {
              const IconComponent = getTypeIcon(account.type)
              return (
                <div key={account.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-900">{account.name}</p>
                      <p className="text-sm text-gray-500">{getTypeLabel(account.type)}</p>
                      {account.description && (
                        <p className="text-xs text-gray-400">{account.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className={`text-sm font-medium ${account.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                        ¥{account.balance.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">{account.currency}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => openEditModal(account)}
                        className="p-2 text-gray-400 hover:text-gray-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteAccount(account.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 添加/编辑账户模态框 */}
        {(showAddModal || editingAccount) && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  {editingAccount ? "编辑账户" : "添加账户"}
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">账户名称</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">账户类型</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      {accountTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">余额</label>
                    <input
                      type="number"
                      value={formData.balance}
                      onChange={(e) => setFormData({...formData, balance: parseFloat(e.target.value) || 0})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">货币</label>
                    <select
                      value={formData.currency}
                      onChange={(e) => setFormData({...formData, currency: e.target.value})}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="CNY">人民币 (CNY)</option>
                      <option value="USD">美元 (USD)</option>
                      <option value="EUR">欧元 (EUR)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">描述</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={() => {
                      setShowAddModal(false)
                      setEditingAccount(null)
                      setFormData({
                        name: "",
                        type: "savings",
                        balance: 0,
                        currency: "CNY",
                        description: "",
                      })
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
                  >
                    取消
                  </button>
                  <button
                    onClick={editingAccount ? handleEditAccount : handleAddAccount}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    {editingAccount ? "保存" : "添加"}
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