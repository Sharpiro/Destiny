///<reference path="../../../Scripts/definitelytyped/angular.d.ts"/>
///<reference path="../../app.ts"/>

class DestinyApiService implements IDestinyApiService
{

    constructor(private $http: ng.IHttpService, private $q: ng.IQService)
    {
    }

    public test(): ng.IPromise<any>
    {
        var deferred = this.$q.defer();
        deferred.resolve();
        return deferred.promise;
    }

    public searchPlayer(platform: number, displayName: string): ng.IPromise<any>
    {
        return this.$http.get(`/api/Home/One?platform=${platform}&displayName=${displayName}`);
    }


}
masterSite.service("destinyApiService", ["$http", "$q", DestinyApiService]); 
