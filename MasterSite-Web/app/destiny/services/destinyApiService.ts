﻿///<reference path="../app.ts"/>
///<reference path="../interfaces/IDestinyApiService.ts"/>

class DestinyApiService implements IDestinyApiService
{

    constructor(private $http: ng.IHttpService, private $q: ng.IQService)
    {
    }

    public searchPlayer(displayName: string, platform: number = 1): ng.IPromise<any>
    {
        const dfd = this.$q.defer();
        if (displayName)
        {
            this.$http.get(`/api/DestinyApi/SearchDestinyPlayer?platform=${platform}&displayName=${displayName}`).then((data: any) =>
            {
                const dataObject = data.data;
                if (dataObject.Response[0])
                {
                    dfd.resolve(data);
                }
                else
                {
                    this.$http.get(`/api/DestinyApi/SearchDestinyPlayer?platform=2&displayName=${displayName}`).then((data: any) =>
                    {
                        const dataObject = data.data;
                        if (dataObject.Response[0])
                        {
                            dfd.resolve(data);
                        }
                    });
                }
            }, (data: any) => dfd.reject(data.data.ExceptionMessage));

        }
        else
        {
            dfd.reject();
        }
        return dfd.promise;
    }

    public getAccountInfo(platform: number, membershipId: number): ng.IPromise<any>
    {
        if (platform && membershipId)
            return this.$http.get(`/api/DestinyApi/GetAccountInfo?platform=${platform}&membershipId=${membershipId}`);
        const dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    }

    public getItem(itemId: number, listNumber?: number, listPosition?: number): ng.IPromise<any>
    {
        if (itemId !== undefined)
            return this.$http.get(`/api/DestinyApi/GetItem?itemId=${itemId}&listNumber=${listNumber}&listPosition=${listPosition}`);
        const dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    }

    public getCharacterInventory = (platform: number, membershipId: number, characterId: number, characterNumber?: number): ng.IPromise<any> =>
    {
        if (characterId !== undefined)
            return this.$http.get(`/api/DestinyApi/GetCharacterInventory?platform=${platform}&membershipId=${membershipId}&characterId=${characterId}&characterNumber=${characterNumber}`);
        const dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    }

    public getAccountTriumphs = (platform: number, membershipId: number): ng.IPromise<any> =>
    {
        return this.$http.get(`/api/DestinyApi/GetAccountTriumphs?platform=${platform}&membershipId=${membershipId}`);
    }

    public getUniqueWeaponData = (platform: number, membershipId: number): ng.IPromise<any> =>
    {
        return this.$http.get(`/api/DestinyApi/GetUniqueWeaponData?platform=${platform}&membershipId=${membershipId}`);
    }

    //public getAllItems(itemList: Array<IEquipmentData>): ng.IPromise<any>
    //{
    //    if (itemList.length <= 0)
    //        return;

    //    for (let i = 0; i < 1; i++)
    //    {
    //        this.$http.get(`/api/DestinyApi/GetItem?itemId=${itemList[i].itemHash}`).then((data) =>
    //        {
    //        });
    //    }
    //    return null;
    //}
}
masterSite.service("destinyApiService", ["$http", "$q", DestinyApiService]); 
