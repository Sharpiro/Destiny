interface IDestinyApiService
{
    test(): ng.IPromise<any>;
    searchPlayer(platform: number, displayName: string): ng.IPromise<any>;
}