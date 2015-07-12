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


}
masterSite.service("destinyApiService", ["$http", "$q", DestinyApiService]); 
