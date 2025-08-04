"use client"

import { useState, useEffect } from "react"
import { Layout } from "@/components/layout"
import { 
  TransactionStats,
  TransactionFilters,
  TransactionList,
  AddTransactionModal,
  LoadingState,
  ErrorState
} from "@/components/transaction"
import { TransactionService } from "@/lib/service/transaction/transaction.service"
import { StandardTransaction } from "@/lib/domain/transaction/standard-transaction.entity"
import { TransactionType } from "@/lib/domain/transaction/enum/transaction-type.enum"
import { TransactionCategory } from "@/lib/domain/transaction/enum/transaction-category.enum"

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<StandardTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | TransactionType>("all")
  const [filterCategory, setFilterCategory] = useState<"all" | TransactionCategory>("all")
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    netAmount: 0,
    transactionCount: 0,
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [transactionsData, statsData] = await Promise.all([
        TransactionService.getTransactions(),
        TransactionService.getTransactionStats(),
      ])
      
      setTransactions(transactionsData)
      setStats(statsData)
    } catch (err) {
      setError('加载交易数据失败，请稍后重试')
      console.error('Failed to fetch transactions:', err)
    } finally {
      setLoading(false)
    }
  }

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.note?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.sourceAccount.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || transaction.type === filterType
    const matchesCategory = filterCategory === "all" || transaction.category === filterCategory
    
    return matchesSearch && matchesType && matchesCategory
  })

  const handleAddTransaction = async (transactionData: {
    sourceAccount: string
    targetAccount: string
    type: TransactionType
    amount: number
    category: TransactionCategory
    transactionTime: string
    note?: string
  }) => {
    try {
      const newTransaction = await TransactionService.addTransaction(transactionData)
      setTransactions([newTransaction, ...transactions])
      setShowAddModal(false)
      
      // 更新统计信息
      const updatedStats = await TransactionService.getTransactionStats()
      setStats(updatedStats)
    } catch (err) {
      console.error('Failed to add transaction:', err)
      alert('添加交易记录失败，请重试')
    }
  }

  if (loading) {
    return (
      <Layout>
        <main className="p-8">
          <LoadingState />
        </main>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <main className="p-8">
          <ErrorState error={error} onRetry={fetchData} />
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
        <TransactionStats 
          totalIncome={stats.totalIncome}
          totalExpense={stats.totalExpense}
          netAmount={stats.netAmount}
        />

        {/* 筛选和搜索 */}
        <TransactionFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterType={filterType}
          onFilterTypeChange={setFilterType}
          filterCategory={filterCategory}
          onFilterCategoryChange={setFilterCategory}
          onAddTransaction={() => setShowAddModal(true)}
        />

        {/* 交易列表 */}
        <TransactionList transactions={filteredTransactions} />

        {/* 添加交易记录模态框 */}
        <AddTransactionModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTransaction}
        />
      </main>
    </Layout>
  )
} 