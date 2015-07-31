interface IDestinyDataService
{
    getClassHashes(): Array<IHash>;
}

interface IHash
{
    hash: number;
    value: string;
}

interface IBucketHash extends IHash {
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