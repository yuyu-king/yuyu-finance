import { Transaction } from "./transaction";

export class TransactionService {
  transactions: Transaction[] = [];

  addTransaction(tx: Transaction) {
    this.transactions.push(tx);
  }

  getAllTransactions() {
    return this.transactions;
  }

  getTotalExpenses() {
    return this.transactions.filter(tx => tx.isExpense()).reduce((sum, tx) => sum + tx.amount, 0);
  }
}
