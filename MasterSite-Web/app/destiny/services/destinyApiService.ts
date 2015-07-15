///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyApiService.ts"/>

class DestinyApiService implements IDestinyApiService
{

    constructor(private $http: ng.IHttpService, private $q: ng.IQService)
    {
    }

    public searchPlayer(platform: number, displayName: string): ng.IPromise<any>
    {
        if (platform && displayName)
            return this.$http.get(`/api/DestinyApi/SearchDestinyPlayer?platform=${platform}&displayName=${displayName}`);
        let dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    }

    public getAccountInfo(platform: number, membershipId: number): ng.IPromise<any>
    {
        if (platform && membershipId)
            return this.$http.get(`/api/DestinyApi/GetAccountInfo?platform=${platform}&membershipId=${membershipId}`);
        let dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    }

    public getItem(itemId: number, listPosition?: number): ng.IPromise<any>
    {
        if (itemId !== undefined)
            return this.$http.get(`/api/DestinyApi/GetItem?itemId=${itemId}&listPosition=${listPosition}`);
        let dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    }

    public getAllItems(itemList: Array<IEquipmentData>): ng.IPromise<any>
    {
        if (itemList.length <= 0)
            return;

        for (let i = 0; i < 1; i++)
        {
            this.$http.get(`/api/DestinyApi/GetItem?itemId=${itemList[i].itemHash}`).then((data) =>
            {
            });
        }
        return null;
    }
}
masterSite.service("destinyApiService", ["$http", "$q", DestinyApiService]); 
