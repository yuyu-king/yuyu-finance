import {DomainEntity} from "@/lib/domain/common/domain-entity";
import {SourceSystem} from "@/lib/domain/transaction/enum/source-system.enum";
import {TransactionType} from "@/lib/domain/transaction/enum/transaction-type.enum";

export class StandardTransaction extends DomainEntity {
    // 主键
    public readonly id: string;

    // 业务主键（来源ID + 来源类型）
    public readonly busId: string;

    // 来源系统
    public readonly sourceSystem: SourceSystem;

    // 来源记录ID（如支付宝交易号、微信订单号等）
    public readonly sourceRecordId: string;

    // 来源账户
    private sourceAccount: string;

    // 目标账户（如转账到的账户）
    private targetAccount: string;

    // 交易类型
    private type: TransactionType;

    // 交易金额
    private amount: number;

    // 交易分类
    private category: string;

    // 交易时间
    private transactionTime: string;

    // 备注信息
    private note?: string;

    constructor({
        id: string;
        busId: string;
        sourceSystem: SourceSystem;
        sourceRecordId: string;
        sourceAccount: string;
        targetAccount: string;
        type: TransactionType;
        amount: number;
        category: string;
        transactionTime: string;
        note?: string;
        createTime: Date,
        createdBy: string;
        lastUpdateTime: Date,
        lastUpdatedBy: string,
        deleteFlag: 0 | 1;
    }) {
        super({createTime, createdBy, lastUpdateTime, lastUpdatedBy, deleteFlag});
        this.id = init.id;
        this.busId = init.busId;
        this.sourceSystem = init.sourceSystem;
        this.sourceRecordId = init.sourceRecordId;

        this.sourceAccount = init.sourceAccount;
        this.targetAccount = init.targetAccount;
        this.type = init.type;
        this.amount = init.amount;
        this.category = init.category;
        this.transactionTime = init.transactionTime;
        this.note = init.note;

        this.validate();
    }

    private validate() {
        if (this.amount <= 0) throw new Error('交易金额必须为正数');
        if (!this.category) throw new Error('必须指定分类');
    }

    // 获取方法（按需暴露）
    public getAmount(): number {
        return this.amount;
    }

    public getType(): TransactionType {
        return this.type;
    }

    public getTransactionTime(): string {
        return this.transactionTime;
    }

    public getNote(): string | undefined {
        return this.note;
    }

    // 修改方法（示例）
    public updateNote(note: string): void {
        this.note = note;
    }
}