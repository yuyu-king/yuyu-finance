// 数据类型定义
export interface Account {
  id: string
  name: string
  type: string
  balance: number
  currency: string
  description?: string
  isActive: boolean
}

export interface Transaction {
  id: string
  date: string
  type: "income" | "expense"
  amount: number
  category: string
  account: string
  description: string
  tags: string[]
}

export interface MonthlyData {
  month: string
  income: number
  expense: number
}

export interface CategoryData {
  name: string
  value: number
  color: string
}

// Mock 数据
const accounts: Account[] = [
  {
    id: "1",
    name: "工商银行储蓄卡",
    type: "savings",
    balance: 25000,
    currency: "CNY",
    description: "主要储蓄账户",
    isActive: true,
  },
  {
    id: "2",
    name: "招商银行信用卡",
    type: "credit",
    balance: -1800,
    currency: "CNY",
    description: "日常消费信用卡",
    isActive: true,
  },
  {
    id: "3",
    name: "支付宝",
    type: "digital",
    balance: 8500,
    currency: "CNY",
    description: "电子支付账户",
    isActive: true,
  },
  {
    id: "4",
    name: "微信钱包",
    type: "digital",
    balance: 3200,
    currency: "CNY",
    description: "社交支付账户",
    isActive: true,
  },
]

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "expense",
    amount: 120,
    category: "food",
    account: "工商银行储蓄卡",
    description: "午餐",
    tags: ["日常", "餐饮"],
  },
  {
    id: "2",
    date: "2024-01-15",
    type: "expense",
    amount: 50,
    category: "transport",
    account: "支付宝",
    description: "地铁费",
    tags: ["交通"],
  },
  {
    id: "3",
    date: "2024-01-14",
    type: "expense",
    amount: 300,
    category: "shopping",
    account: "招商银行信用卡",
    description: "购买衣服",
    tags: ["购物", "服装"],
  },
  {
    id: "4",
    date: "2024-01-14",
    type: "income",
    amount: 8000,
    category: "salary",
    account: "工商银行储蓄卡",
    description: "工资",
    tags: ["收入", "工资"],
  },
  {
    id: "5",
    date: "2024-01-13",
    type: "expense",
    amount: 200,
    category: "entertainment",
    account: "微信钱包",
    description: "电影票",
    tags: ["娱乐"],
  },
  {
    id: "6",
    date: "2024-01-12",
    type: "expense",
    amount: 1500,
    category: "housing",
    account: "工商银行储蓄卡",
    description: "房租",
    tags: ["住房", "固定支出"],
  },
]

const monthlyData: MonthlyData[] = [
  { month: "1月", income: 8000, expense: 5000 },
  { month: "2月", income: 7500, expense: 4800 },
  { month: "3月", income: 9000, expense: 5200 },
  { month: "4月", income: 8500, expense: 4900 },
  { month: "5月", income: 9200, expense: 5500 },
  { month: "6月", income: 8800, expense: 5100 },
]

const categoryData: CategoryData[] = [
  { name: "餐饮", value: 2000, color: "#FF6B6B" },
  { name: "交通", value: 1500, color: "#4ECDC4" },
  { name: "购物", value: 3000, color: "#45B7D1" },
  { name: "娱乐", value: 1000, color: "#96CEB4" },
  { name: "其他", value: 800, color: "#FFEAA7" },
]

// 模拟 API 延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// API 服务类
export class DataService {
  // 获取账户列表
  static async getAccounts(): Promise<Account[]> {
    await delay(500) // 模拟网络延迟
    return accounts
  }

  // 添加账户
  static async addAccount(account: Omit<Account, 'id'>): Promise<Account> {
    await delay(300)
    const newAccount: Account = {
      ...account,
      id: Date.now().toString(),
    }
    accounts.push(newAccount)
    return newAccount
  }

  // 更新账户
  static async updateAccount(id: string, updates: Partial<Account>): Promise<Account> {
    await delay(300)
    const index = accounts.findIndex(account => account.id === id)
    if (index === -1) {
      throw new Error('Account not found')
    }
    accounts[index] = { ...accounts[index], ...updates }
    return accounts[index]
  }

  // 删除账户（软删除）
  static async deleteAccount(id: string): Promise<void> {
    await delay(300)
    const index = accounts.findIndex(account => account.id === id)
    if (index !== -1) {
      accounts[index].isActive = false
    }
  }

  // 获取交易记录
  static async getTransactions(): Promise<Transaction[]> {
    await delay(500)
    return transactions
  }

  // 添加交易记录
  static async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    await delay(300)
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    }
    transactions.unshift(newTransaction) // 添加到开头
    return newTransaction
  }

  // 获取月度数据
  static async getMonthlyData(): Promise<MonthlyData[]> {
    await delay(400)
    return monthlyData
  }

  // 获取分类数据
  static async getCategoryData(): Promise<CategoryData[]> {
    await delay(400)
    return categoryData
  }

  // 获取首页概览数据
  static async getDashboardData() {
    await delay(600)
    const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)
    const totalIncome = monthlyData.reduce((sum, item) => sum + item.income, 0)
    const totalExpense = monthlyData.reduce((sum, item) => sum + item.expense, 0)
    const netIncome = totalIncome - totalExpense

    return {
      totalBalance,
      totalIncome,
      totalExpense,
      netIncome,
      accounts: accounts.filter(account => account.isActive),
      monthlyData,
      categoryData,
    }
  }
} 