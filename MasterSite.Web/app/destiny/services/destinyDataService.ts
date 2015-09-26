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
        { starred: false, hash: 3118679308, category: ITEMCATEGORY.Weapon, value: "Ice Breaker", icon: "/common/destiny_content/icons/c1bc7a09b4042a26e0bbfe36fab78842.jpg" },
        { starred: false, hash: 1274330687, category: ITEMCATEGORY.Weapon, value: "Gjallarhorn", icon: "/common/destiny_content/icons/eb8377390504838c0190d8d56e70d28e.jpg" },
        { starred: false, hash: 1550781863, category: ITEMCATEGORY.Weapon, value: "The Scholar (Adept)", icon: "/common/destiny_content/icons/050ef13595025cf39b7f96456efeb6b2.jpg" },
        { starred: false, hash: 2344494719, category: ITEMCATEGORY.Weapon, value: "Lord of Wolves", icon: "/common/destiny_content/icons/ee5a93a819b51f395781a3175efa2005.jpg" },
        { starred: false, hash: 2612834019, category: ITEMCATEGORY.Weapon, value: "Queenbreakers' Bow", icon: "/common/destiny_content/icons/c41001ba36e4a32cd223573f1a150e81.jpg" },
        { starred: false, hash: 2809229973, category: ITEMCATEGORY.Weapon, value: "Necrochasm", icon: "/common/destiny_content/icons/d5f5eff03eb6952beeb78bda5316d359.jpg" },
        { starred: false, hash: 346443849, category: ITEMCATEGORY.Weapon, value: "Vex Mythoclast", icon: "/common/destiny_content/icons/bb7c710c5c143ff80997fdfb7b1216c3.jpg" },
        { starred: true, hash: 3688594188, category: ITEMCATEGORY.Weapon, value: "Boolean Gemini", icon: "/common/destiny_content/icons/2fc2da2b4dc4c0a4ca034a8cf0a5df54.jpg" },
        { starred: true, hash: 3675783241, category: ITEMCATEGORY.Weapon, value: "The Chaperone", icon: "/common/destiny_content/icons/31ebf0d88cfa310be9aa7ab5fb25c4c4.jpg" },
        { starred: true, hash: 3012398148, category: ITEMCATEGORY.Weapon, value: "Telesto", icon: "/common/destiny_content/icons/0f282e925a856d0d77924cf8d3e67ba2.jpg" },
        { starred: true, hash: 255654879, category: ITEMCATEGORY.Weapon, value: "Zhalo Supercell", icon: "/common/destiny_content/icons/4b485eff91fb941b12a69c9f18191068.jpg" },
        { starred: true, hash: 2748609458, category: ITEMCATEGORY.Weapon, value: "Fabian Strategy", icon: "/common/destiny_content/icons/345b954d6e650201b93942bd332ddcf2.jpg" },
        { starred: true, hash: 552354419, category: ITEMCATEGORY.Weapon, value: "Ace of Spades", icon: "/common/destiny_content/icons/5457f39e4bf30f875d0a445d5b234af7.jpg" },
        { starred: true, hash: 803312564, category: ITEMCATEGORY.Weapon, value: "Tlaloc", icon: "/common/destiny_content/icons/4e9c55ea26034047aa07823c9c6c7689.jpg" },
        { starred: true, hash: 987423912, category: ITEMCATEGORY.Weapon, value: "The First Curse", icon: "/common/destiny_content/icons/e6039a08ae23d6853651154a5397d015.jpg" },
        { starred: true, hash: 3227022823, category: ITEMCATEGORY.Weapon, value: "Hereafter", icon: "/common/destiny_content/icons/f680592704842cba76aec140291ab7db.jpg" },
        { starred: true, hash: 4100639362, category: ITEMCATEGORY.Weapon, value: "Bolt-Caster", icon: "/common/destiny_content/icons/29e92609abd13888c9ef0aa1660dd6e6.jpg" },
        { starred: true, hash: 4100639364, category: ITEMCATEGORY.Weapon, value: "Dark-Drinker", icon: "/common/destiny_content/icons/2c963ee0f41829ef361c71560bd9a74c.jpg" },
        { starred: true, hash: 4100639365, category: ITEMCATEGORY.Weapon, value: "Raze-Lighter", icon: "/common/destiny_content/icons/c217646ddd8c12674126633cc4a51481.jpg" },
        { starred: true, hash: 3688594189, category: ITEMCATEGORY.Weapon, value: "Touch of Malice", icon: "/common/destiny_content/icons/5c889853185590c437899711566a4771.jpg" },
        { starred: false, hash: 4100639363, category: ITEMCATEGORY.Weapon, value: "Void Edge", icon: "/common/destiny_content/icons/f9d8242f2f6ad362cbde98887eabae6e.jpg" },
        { starred: true, hash: 3227022822, category: ITEMCATEGORY.Weapon, value: "Black Spindle", icon: "/common/destiny_content/icons/5ba84f54745b74a1099608a29d2a974f.jpg" },
        { starred: true, hash: 2201079123, category: ITEMCATEGORY.Weapon, value: "Silence of A'arn", icon: "/common/destiny_content/icons/4cb0affbcfcd7e97320291b1ecd13be4.jpg" },
        { starred: true, hash: 2536361593, category: ITEMCATEGORY.Weapon, value: "Smite of Merain", icon: "/common/destiny_content/icons/6c6d5be53bc12ee5b669a328b7a075f0.jpg" },
        { starred: true, hash: 3042333086, category: ITEMCATEGORY.Weapon, value: "Midha's Reckoning", icon: "/common/destiny_content/icons/c3ecb9d6fb9ca71dedcb236474db4917.jpg" },
        { starred: true, hash: 1397524040, category: ITEMCATEGORY.Weapon, value: "Elulim's Frenzy", icon: "/common/destiny_content/icons/160234fe43be0c031203ad17f8acdc46.jpg" },

    ];

    //spec-guns-gear-misc//old way!
    //private itemOrder: Array<number> = [0, 4, 5, 6, 7, 8, 1, 2, 3, 11, 10, 9, 13, 12];

    //spec-guns-gear-misc//new way
    private itemOrder: Array<number> = [0, 6, 7, 8, 1, 2, 3, 4, 5, 15, 11, 10, 9, 13, 12, 14];

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
        { hash: 434908299, value: "Artifact", category: ITEMCATEGORY.Armor },
        { hash: 4023194814, value: "Ghost Shell", category: ITEMCATEGORY.Armor },
        { hash: 2025709351, value: "Sparrow", category: ITEMCATEGORY.Misc },
        { hash: 284967655, value: "Ship", category: ITEMCATEGORY.Misc },
        { hash: 2973005342, value: "Shader", category: ITEMCATEGORY.Misc },
        { hash: 4274335291, value: "Emblem", category: ITEMCATEGORY.Misc },
        { hash: 3054419239, value: "Emotes", category: ITEMCATEGORY.Misc }
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
