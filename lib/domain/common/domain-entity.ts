export abstract class DomainEntity {
    public readonly createTime: string;
    public readonly createdBy: string;
    public lastUpdateTime: string;
    public lastUpdatedBy: string;
    public deleteFlag: 0 | 1;

    protected constructor(params: {
        createTime: string;
        createdBy: string;
        lastUpdateTime: string;
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