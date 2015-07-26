///<reference path="../app.ts"/>
///<reference path="../interfaces/IDestinyDataService.ts"/>

class DestinyDataService implements IDestinyDataService
{

    private classHashes: Array<IHash> = [
        { "hash": 3655393761, "value": "Titan" },
        { "hash": 671679327, "value": "Hunter" },
        { "hash": 2271682572, "value": "Warlock" }
    ];

    private raceHashes: Array<IHash> = [
        { "hash": 898834093, "value": "Exo" },
        { "hash": 2803282938, "value": "Awoken" },
        { "hash": 3887404748, "value": "Human" }
    ];

    private genderHashes: Array<IHash> = [
        { "hash": 3111576190, "value": "Male" },
        { "hash": 2204441813, "value": "Female" }
    ];

    private statHashes: Array<IHash> = [
        { "hash": 368428387, "value": "Attack" },
        { "hash": 4284893193, "value": "Rate of Fire" },
        { "hash": 4043523819, "value": "Impact" },
        { "hash": 1240592695, "value": "Range" },
        { "hash": 155624089, "value": "Stability" },
        { "hash": 4188031367, "value": "Reload" },
        { "hash": 3871231066, "value": "Magazine" },
        { "hash": -100, "value": "Charge Rate" }
    ];

    constructor(private $http: ng.IHttpService, private $q: ng.IQService)
    {
    }

    public getClassHashes = (): Array<IHash>=>
    {
        return this.classHashes;
    }

    public getRaceHashes = (): Array<IHash> =>
    {
        return this.raceHashes;
    }

    public getGenderHashes = (): Array<IHash> =>
    {
        return this.genderHashes;
    }

    public getStatHashes = (): Array<IHash> =>
    {
        return this.genderHashes;
    }
}

interface IHash
{
    hash: number;
    value: string;
}

masterSite.service("destinyDataService", ["$http", "$q", DestinyDataService]); 
