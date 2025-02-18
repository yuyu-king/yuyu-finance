export class Transaction {
    constructor(
      public id: string,
      public amount: number,
      public category: string,
      public accountId: string,
      public date: Date
    ) {}
  
    isIncome(): boolean {
      return this.amount > 0;
    }
  
    isExpense(): boolean {
      return this.amount < 0;
    }
  }
  