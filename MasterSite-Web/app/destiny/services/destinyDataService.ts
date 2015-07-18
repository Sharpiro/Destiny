///<reference path="../app.ts"/>
///<reference path="../interfaces/IDestinyDataService.ts"/>

class DestinyDataService implements IDestinyDataService
{

    private classHashes: Array<IHash> = [
        { "hash": 3655393761, "value": "Titan" },
        { "hash": 671679327, "value": "Hunter" },
        { "hash": 2271682572, "value": "Warlock" }];
    
    private raceHashes: Array<IHash> = [
        { "hash": 898834093, "value": "Exo" },
        { "hash": 2803282938, "value": "Awoken" },
        { "hash": 3887404748, "value": "Human" }];
    
    constructor(private $http: ng.IHttpService, private $q: ng.IQService)
    {
    }

    public getClassHashes(): Array<IHash> {
        return this.classHashes;
    }

    public getRaceHashes(): Array<IHash>
    {
        return this.raceHashes;
    }
}

interface IHash
{
    hash: number;
    value: string;
}

masterSite.service("destinyDataService", ["$http", "$q", DestinyDataService]); 
