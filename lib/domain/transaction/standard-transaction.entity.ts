import {DomainEntity} from "@/lib/domain/common/domain-entity";
import {SourceSystem} from "@/lib/domain/transaction/enum/source-system.enum";
import {TransactionType} from "@/lib/domain/transaction/enum/transaction-type.enum";
import { TransactionCategory } from "@/lib/domain/transaction/enum/transaction-category.enum";

export class StandardTransaction extends DomainEntity {
    // 主键
    readonly id: string;

    // 业务主键（来源ID + 来源类型）
    readonly busId: string;

    // 来源系统
    readonly sourceSystem: SourceSystem;

    // 来源记录ID（如支付宝交易号、微信订单号等）
    readonly sourceRecordId: string;

    // 来源账户
    sourceAccount: string;

    // 目标账户（如转账到的账户）
    targetAccount: string;

    // 交易类型
    type: TransactionType;

    // 交易金额
    amount: number;

    // 交易分类
    category: TransactionCategory;

    // 交易时间
    transactionTime: string;

    // 备注信息
    note?: string;

    constructor(init:{
        id: string;
        busId: string;
        sourceSystem: SourceSystem;
        sourceRecordId: string;
        sourceAccount: string;
        targetAccount: string;
        type: TransactionType;
        amount: number;
        category: TransactionCategory;
        transactionTime: string;
        note?: string;
        createTime: Date,
        createdBy: string;
        lastUpdateTime: Date,
        lastUpdatedBy: string,
        deleteFlag: 0 | 1;
    }) {
        super({
            createTime: init.createTime,
            createdBy: init.createdBy,
            lastUpdateTime: init.lastUpdateTime,
            lastUpdatedBy: init.lastUpdatedBy,
            deleteFlag: init.deleteFlag,
        });

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
}