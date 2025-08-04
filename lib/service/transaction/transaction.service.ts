import { StandardTransaction } from "@/lib/domain/transaction/standard-transaction.entity";
import { TransactionType } from "@/lib/domain/transaction/enum/transaction-type.enum";
import { TransactionCategory } from "@/lib/domain/transaction/enum/transaction-category.enum";
import { SourceSystem } from "@/lib/domain/transaction/enum/source-system.enum";

// Mock 数据
const mockTransactions: StandardTransaction[] = [
  new StandardTransaction({
    id: "1",
    busId: "manual_1",
    sourceSystem: SourceSystem.Manual,
    sourceRecordId: "manual_1",
    sourceAccount: "工商银行储蓄卡",
    targetAccount: "",
    type: TransactionType.Expense,
    amount: 120,
    category: TransactionCategory.Food,
    transactionTime: "2024-01-15T12:00:00Z",
    note: "午餐",
    createTime: new Date("2024-01-15"),
    createdBy: "user",
    lastUpdateTime: new Date("2024-01-15"),
    lastUpdatedBy: "user",
    deleteFlag: 0,
  }),
  new StandardTransaction({
    id: "2",
    busId: "manual_2",
    sourceSystem: SourceSystem.Manual,
    sourceRecordId: "manual_2",
    sourceAccount: "支付宝",
    targetAccount: "",
    type: TransactionType.Expense,
    amount: 50,
    category: TransactionCategory.Transport,
    transactionTime: "2024-01-15T08:00:00Z",
    note: "地铁费",
    createTime: new Date("2024-01-15"),
    createdBy: "user",
    lastUpdateTime: new Date("2024-01-15"),
    lastUpdatedBy: "user",
    deleteFlag: 0,
  }),
  new StandardTransaction({
    id: "3",
    busId: "manual_3",
    sourceSystem: SourceSystem.Manual,
    sourceRecordId: "manual_3",
    sourceAccount: "招商银行信用卡",
    targetAccount: "",
    type: TransactionType.Expense,
    amount: 300,
    category: TransactionCategory.Shopping,
    transactionTime: "2024-01-14T15:00:00Z",
    note: "购买衣服",
    createTime: new Date("2024-01-14"),
    createdBy: "user",
    lastUpdateTime: new Date("2024-01-14"),
    lastUpdatedBy: "user",
    deleteFlag: 0,
  }),
  new StandardTransaction({
    id: "4",
    busId: "manual_4",
    sourceSystem: SourceSystem.Manual,
    sourceRecordId: "manual_4",
    sourceAccount: "工商银行储蓄卡",
    targetAccount: "",
    type: TransactionType.Income,
    amount: 8000,
    category: TransactionCategory.Salary,
    transactionTime: "2024-01-14T09:00:00Z",
    note: "工资",
    createTime: new Date("2024-01-14"),
    createdBy: "user",
    lastUpdateTime: new Date("2024-01-14"),
    lastUpdatedBy: "user",
    deleteFlag: 0,
  }),
  new StandardTransaction({
    id: "5",
    busId: "manual_5",
    sourceSystem: SourceSystem.Manual,
    sourceRecordId: "manual_5",
    sourceAccount: "微信钱包",
    targetAccount: "",
    type: TransactionType.Expense,
    amount: 200,
    category: TransactionCategory.Entertainment,
    transactionTime: "2024-01-13T20:00:00Z",
    note: "电影票",
    createTime: new Date("2024-01-13"),
    createdBy: "user",
    lastUpdateTime: new Date("2024-01-13"),
    lastUpdatedBy: "user",
    deleteFlag: 0,
  }),
  new StandardTransaction({
    id: "6",
    busId: "manual_6",
    sourceSystem: SourceSystem.Manual,
    sourceRecordId: "manual_6",
    sourceAccount: "工商银行储蓄卡",
    targetAccount: "",
    type: TransactionType.Expense,
    amount: 1500,
    category: TransactionCategory.Housing,
    transactionTime: "2024-01-12T10:00:00Z",
    note: "房租",
    createTime: new Date("2024-01-12"),
    createdBy: "user",
    lastUpdateTime: new Date("2024-01-12"),
    lastUpdatedBy: "user",
    deleteFlag: 0,
  }),
];

// 模拟 API 延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class TransactionService {
  // 获取所有交易记录
  static async getTransactions(): Promise<StandardTransaction[]> {
    await delay(500);
    return mockTransactions.filter(t => t.deleteFlag === 0);
  }

  // 根据ID获取交易记录
  static async getTransactionById(id: string): Promise<StandardTransaction | null> {
    await delay(200);
    return mockTransactions.find(t => t.id === id && t.deleteFlag === 0) || null;
  }

  // 添加交易记录
  static async addTransaction(transactionData: {
    sourceAccount: string;
    targetAccount: string;
    type: TransactionType;
    amount: number;
    category: TransactionCategory;
    transactionTime: string;
    note?: string;
  }): Promise<StandardTransaction> {
    await delay(300);
    
    const newTransaction = new StandardTransaction({
      id: Date.now().toString(),
      busId: `manual_${Date.now()}`,
      sourceSystem: SourceSystem.Manual,
      sourceRecordId: `manual_${Date.now()}`,
      sourceAccount: transactionData.sourceAccount,
      targetAccount: transactionData.targetAccount,
      type: transactionData.type,
      amount: transactionData.amount,
      category: transactionData.category,
      transactionTime: transactionData.transactionTime,
      note: transactionData.note,
      createTime: new Date(),
      createdBy: "user",
      lastUpdateTime: new Date(),
      lastUpdatedBy: "user",
      deleteFlag: 0,
    });

    mockTransactions.unshift(newTransaction);
    return newTransaction;
  }

  // 更新交易记录
  static async updateTransaction(id: string, updates: Partial<StandardTransaction>): Promise<StandardTransaction> {
    await delay(300);
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error('Transaction not found');
    }

    const updatedTransaction = new StandardTransaction({
      ...mockTransactions[index],
      ...updates,
      lastUpdateTime: new Date(),
      lastUpdatedBy: "user",
    });

    mockTransactions[index] = updatedTransaction;
    return updatedTransaction;
  }

  // 删除交易记录（软删除）
  static async deleteTransaction(id: string): Promise<void> {
    await delay(300);
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTransactions[index].deleteFlag = 1;
    }
  }

  // 获取统计信息
  static async getTransactionStats(): Promise<{
    totalIncome: number;
    totalExpense: number;
    netAmount: number;
    transactionCount: number;
  }> {
    await delay(200);
    const activeTransactions = mockTransactions.filter(t => t.deleteFlag === 0);
    
    const totalIncome = activeTransactions
      .filter(t => t.type === TransactionType.Income)
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpense = activeTransactions
      .filter(t => t.type === TransactionType.Expense)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      totalIncome,
      totalExpense,
      netAmount: totalIncome - totalExpense,
      transactionCount: activeTransactions.length,
    };
  }

  // 根据条件筛选交易记录
  static async getTransactionsByFilter(filters: {
    type?: TransactionType;
    category?: TransactionCategory;
    sourceAccount?: string;
    startDate?: string;
    endDate?: string;
    searchTerm?: string;
  }): Promise<StandardTransaction[]> {
    await delay(300);
    let filteredTransactions = mockTransactions.filter(t => t.deleteFlag === 0);

    if (filters.type) {
      filteredTransactions = filteredTransactions.filter(t => t.type === filters.type);
    }

    if (filters.category) {
      filteredTransactions = filteredTransactions.filter(t => t.category === filters.category);
    }

    if (filters.sourceAccount) {
      filteredTransactions = filteredTransactions.filter(t => 
        t.sourceAccount.toLowerCase().includes(filters.sourceAccount!.toLowerCase())
      );
    }

    if (filters.startDate) {
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.transactionTime) >= new Date(filters.startDate!)
      );
    }

    if (filters.endDate) {
      filteredTransactions = filteredTransactions.filter(t => 
        new Date(t.transactionTime) <= new Date(filters.endDate!)
      );
    }

    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filteredTransactions = filteredTransactions.filter(t => 
        t.note?.toLowerCase().includes(searchTerm) ||
        t.sourceAccount.toLowerCase().includes(searchTerm)
      );
    }

    return filteredTransactions;
  }
} 