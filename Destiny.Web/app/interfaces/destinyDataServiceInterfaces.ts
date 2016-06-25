interface IDestinyDataService
{
    getClassHashes(): Array<IHash>;
}

interface IHash
{
    hash: string;
    value: string;
}

interface ICategoryHash extends IHash
{
    category: number;
    starred?: boolean;
}

interface IPopularItemHash extends ICategoryHash
{
    icon: string;
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
    membershipId: string;
    platformIcon: string;
}

class AccountDetails implements IAccountDetails
{
    public platform: number = null;
    public displayName: string = null;
    public membershipId: string = null;
    public platformIcon: string = null;
}