interface IDestinyApiService
{
    getAccountInfo(platform: number, displayName: number): ng.IPromise<any>;
    searchPlayer(displayName: string): ng.IPromise<any>;
    getItem(itemId: number, listPosition?: number): ng.IPromise<any>;
}