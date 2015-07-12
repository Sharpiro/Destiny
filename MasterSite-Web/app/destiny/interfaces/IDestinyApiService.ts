interface IDestinyApiService
{
    getAccountInfo(platform: number, displayName: number): ng.IPromise<any>;
    searchPlayer(platform: number, displayName: string): ng.IPromise<any>;
}