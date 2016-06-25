interface IDestinyApiService
{
    getAccountInfo(platform: number, membershipId: string): ng.IPromise<any>;
    searchPlayer(displayName: string, platform?: number): ng.IPromise<any>;
    getItem(itemId: string, listPosition?: number): ng.IPromise<any>;
}