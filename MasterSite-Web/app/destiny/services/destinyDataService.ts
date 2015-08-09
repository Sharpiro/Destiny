///<reference path="../app.ts"/>

class DestinyDataService implements IDestinyDataService
{
    public bungieBaseUrl = "http://bungie.net";
    public bungieBaseUrlSecure = "https://bungie.net";

    private currentPlayerData: IAccountDetails = {
        membershipId: null,
        displayName: null,
        platform: null,
        platformIcon: null
    };

    private destinyLinks = {
        icons: {
            damageTypeIcons: {
                regular: {
                    arc: "/content/images/destiny/damageTypeIcons/regular/2_arc.png",
                    solar: "/content/images/destiny/damageTypeIcons/regular/3_solar.png",
                    void: "/content/images/destiny/damageTypeIcons/regular/4_void.png"
                },
                transparent: {
                    arc: "/content/images/destiny/damageTypeIcons/transparent/2_arc.png",
                    solar: "/content/images/destiny/damageTypeIcons/transparent/3_solar.png",
                    void: "/content/images/destiny/damageTypeIcons/transparent/4_void.png"
                }
            },
            booleanIcons: {
                trueIcon: "/content/images/destiny/boolean/true.png",
                falseIcon: "/content/images/destiny/boolean/false.png"
            }
        },
        databases: {
            destinydb: "http://www.destinydb.com/items/"
        }
    };

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

    private popularItems: Array<IPopularItemHash> = [
        { starred: true, hash: 3118679308, category: ITEMCATEGORY.Weapon, value: "Ice Breaker", icon: "/common/destiny_content/icons/c1bc7a09b4042a26e0bbfe36fab78842.jpg" },
        { starred: true, hash: 1274330687, category: ITEMCATEGORY.Weapon, value: "Gjallarhorn", icon: "/common/destiny_content/icons/eb8377390504838c0190d8d56e70d28e.jpg" },
        { starred: true, hash: 2344494719, category: ITEMCATEGORY.Weapon, value: "Lord of Wolves", icon: "/common/destiny_content/icons/64ef3ce089b88d09b7b8ee72ab2ddc20.jpg" },
        { starred: true, hash: 2612834019, category: ITEMCATEGORY.Weapon, value: "Queenbreakers' Bow", icon: "/common/destiny_content/icons/1f1477bd77c6eb0e7e7a1b082bb62eed.jpg" },
        { starred: true, hash: 2809229973, category: ITEMCATEGORY.Weapon, value: "Necrochasm", icon: "/common/destiny_content/icons/e1594f119b3219eeda9fd3f7216e0881.jpg" },
        { starred: true, hash: 346443849, category: ITEMCATEGORY.Weapon, value: "Vex Mythoclast", icon: "/common/destiny_content/icons/bb7c710c5c143ff80997fdfb7b1216c3.jpg" },
        { starred: true, hash: 3399255907, category: ITEMCATEGORY.Weapon, value: "347 Vesta Dynasty", icon: "/common/destiny_content/icons/8ccecb1bc9c98201d63394de0fe94ab9.jpg" },
        { starred: true, hash: 1557422751, category: ITEMCATEGORY.Weapon, value: "Dreg's Promise", icon: "/common/destiny_content/icons/54bf749f882fef3c09367f5e8a8f191b.jpg" }
    ];

    //spec-guns-gear-misc//old way!
    //private itemOrder: Array<number> = [0, 4, 5, 6, 7, 8, 1, 2, 3, 11, 10, 9, 13, 12];

    //spec-guns-gear-misc//new way
    private itemOrder: Array<number> = [0, 6, 7, 8, 1, 2, 3, 4, 5, 11, 10, 9, 13, 12];

    //account triumphs
    private accountTriumphs: IStaticTriumphsData = {
        yearOne: [
            { title: "Apprentice of Light", description: "A character reached the maximum level" },
            { title: "Light of the Garden", description: "Defeated the dark heart of the Black Garden" },
            { title: "Light in the Dark", description: "Prevented the summoning of Crota's Soul" },
            { title: "Light of the Reef", description: "Captured Skolas in the Vex Citadel" },
            { title: "Bane of Skolas", description: "Defeated Prison of Elders on Hard Difficulty" },
            { title: "Bane of Atheon", description: "Defeated Atheon on Hard Difficulty" },
            { title: "Bane of Crota", description: "Defeated Crota on Hard Difficulty" },
            { title: "Public Servant", description: "Completed 50 Public Events" },
            { title: "Crucible Gladiator", description: "Won 100 Crucible Matches" },
            { title: "Chest Hunter", description: "Found all Golden Chests" }
        ]
    };

    private bucketHashes: Array<ICategoryHash> = [
        { hash: 3284755031, value: "Subclass", category: null },
        { hash: 1498876634, value: "Primary", category: ITEMCATEGORY.Weapon },
        { hash: 2465295065, value: "Special", category: ITEMCATEGORY.Weapon },
        { hash: 953998645, value: "Heavy", category: ITEMCATEGORY.Weapon },
        { hash: 3448274439, value: "Head", category: ITEMCATEGORY.Armor },
        { hash: 3551918588, value: "Hands", category: ITEMCATEGORY.Armor },
        { hash: 14239492, value: "Chest", category: ITEMCATEGORY.Armor },
        { hash: 20886954, value: "Legs", category: ITEMCATEGORY.Armor },
        { hash: 1585787867, value: "Class Item", category: ITEMCATEGORY.Armor },
        { hash: 4023194814, value: "Ghost Shell", category: ITEMCATEGORY.Misc },
        { hash: 2025709351, value: "Sparrow", category: ITEMCATEGORY.Misc },
        { hash: 284967655, value: "Ship", category: ITEMCATEGORY.Misc },
        { hash: 2973005342, value: "Shader", category: ITEMCATEGORY.Misc },
        { hash: 4274335291, value: "Emblem", category: ITEMCATEGORY.Misc }
    ];

    private damageTypeHahes: Array<IHash> = [
        { hash: 1498876634, value: "Arc", category: DAMAGETYPE.Arc }
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
        return this.statHashes;
    }

    public getItemOrderValue = (inputNumber: number): number =>
    {
        return this.itemOrder[inputNumber];
    }

    public getAccountTriumphs = (): IStaticTriumphsData =>
    {
        return this.accountTriumphs;
    }

    public getBucketHashes = (): Array<IHash> =>
    {
        return this.bucketHashes;
    }

    public getDestinyLinks = (): any =>
    {
        return this.destinyLinks;
    }

    public getStoredPlayerData = (): IAccountDetails =>
    {
        return this.currentPlayerData;
    }

    public setStoredPlayerData = (accountDetails: IAccountDetails): void =>
    {
        this.currentPlayerData = accountDetails;
        //{ membershipId: id, displayName: displayName, platform: null, platformIcon: null }
    }

    public getPopularItems = (): Array<IPopularItemHash> =>
    {
        return this.popularItems;
    }
}

masterSite.service("destinyDataService", ["$http", "$q", DestinyDataService]); 
