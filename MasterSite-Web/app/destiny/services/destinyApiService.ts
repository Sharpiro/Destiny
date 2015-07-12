///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyApiService.ts"/>

class DestinyApiService implements IDestinyApiService {

    constructor(private $http: ng.IHttpService, private $q: ng.IQService) {
    }

    public test(): ng.IPromise<any> {
        var deferred = this.$q.defer();
        deferred.resolve();
        return deferred.promise;
    }

    public searchPlayer(platform: number, displayName: string): ng.IPromise<any> {
        if (platform && displayName)
            return this.$http.get(`/api/DestinyApi/One?platform=${platform}&displayName=${displayName}`);
        let dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    }


}
masterSite.service("destinyApiService", ["$http", "$q", DestinyApiService]); 
