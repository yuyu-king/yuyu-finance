import {SourceSystem} from "@/lib/domain/transaction/enum/source-system.enum";
import {TransactionType} from "@/lib/domain/transaction/enum/transaction-type.enum";

export class StandardTransaction {
    constructor(
        public readonly id: string,
        public readonly busId: string,
        public readonly sourceSystem: SourceSystem,
        public readonly sourceRecordId: string,
        public readonly sourceAccount: string,
        public readonly targetAccount: string,
        public readonly type: TransactionType,
        public readonly amount: number,
        public readonly category: string,
        public readonly transactionTime: string,
        public readonly createdAt: string,
        public readonly note?: string
    ) {
        this.validate();
    }

    private validate(): void {
        if (!this.id) throw new Error('id is required');
        if (!this.busId) throw new Error('busId is required');
        if (this.amount <= 0) throw new Error('amount must be positive');
        if (!['income', 'expense'].includes(this.type)) {
            throw new Error('invalid transaction type');
        }
        if (!this.transactionTime) throw new Error('transaction_time is required');
        // 可继续添加更多校验
    }
}