interface IDestinyDataService
{
    getClassHashes(): Array<IHash>;
}

interface IHash
{
    hash: number;
    value: string;
}

interface IBucketHash extends IHash
{
    category: number;
}

interface IStaticTriumphsData
{
    yearOne: Array<IYearOneTriumph>;
}

interface IYearOneTriumph
{
    title: string;
    description: string;
}

interface IAccountDetails
{
    platform: number;
    displayName: string;
    membershipId: number;
    platformIcon: string;
}

class AccountDetails implements IAccountDetails
{
    public platform: number = null;
    public displayName: string = null;
    public membershipId: number = null;
    public platformIcon: string = null;
}