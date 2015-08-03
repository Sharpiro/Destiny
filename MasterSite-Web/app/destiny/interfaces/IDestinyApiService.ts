interface IDestinyApiService
{
    getAccountInfo(platform: number, displayName: number): ng.IPromise<any>;
    searchPlayer(displayName: string, platform?: number): ng.IPromise<any>;
    getItem(itemId: number, listPosition?: number): ng.IPromise<any>;
}