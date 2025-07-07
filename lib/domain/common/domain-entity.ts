export abstract class DomainEntity {
    public readonly createTime: Date;
    public readonly createdBy: string;
    public lastUpdateTime: Date;
    public lastUpdatedBy: string;
    public deleteFlag: 0 | 1;

    protected constructor(params: {
        createTime: Date;
        createdBy: string;
        lastUpdateTime: Date;
        lastUpdatedBy: string;
        deleteFlag: 0 | 1;
    }) {
        this.createTime = params.createTime;
        this.createdBy = params.createdBy;
        this.lastUpdateTime = params.lastUpdateTime;
        this.lastUpdatedBy = params.lastUpdatedBy;
        this.deleteFlag = params.deleteFlag;
    }
}