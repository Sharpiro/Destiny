///<reference path="../app.ts"/>

// ReSharper disable once InconsistentNaming
class DestinyBlService implements IDestinyBlService
{

    constructor(private destinyDataService: DestinyDataService, private sharedFunctionsService: SharedFunctionsService)
    {
    }

    //#region callbacks

    public handleGetAccountTriumphsResponse = (data: any): Array<ITriumphs> =>
    {
        const triumphs: Array<boolean> = data;
        const staticTriumphData = this.destinyDataService.getAccountTriumphs().yearOne;
        let triumphObjects: Array<ITriumphs> = [];
        for (let i = 0; i < triumphs.length; i++)
        {
            triumphObjects[i] = { title: staticTriumphData[i].title, complete: triumphs[i] };
        }
        return triumphObjects;
    }

    public handleGetAccountInfoResponse = (data: any): Array<ICharacterData> =>
    {
        const accountInfoData = data.Response;
        const itemDefinitions: any = accountInfoData.HashDefinitions;
        let characterData: Array<ICharacterData> = [];
        for (let i = 0; i < accountInfoData.Characters.length; i++)
        {
            let currentCharacterData = accountInfoData.Characters[i];
            const charactersOverview: string = this.getCharacterOverviewObject(currentCharacterData);
            const orderedEquipmentHashes: Array<number> = this.getEquipmentDataObject(currentCharacterData);
            const equipmentData: Array<IEquipmentData> = [];
            const characterId = currentCharacterData.CharacterId;
            for (let j = 0; j < orderedEquipmentHashes.length; j++)
            {
                if (orderedEquipmentHashes[j])
                {
                    const hash = orderedEquipmentHashes[j];
                    let equipmentObject: any;
                    if (itemDefinitions[hash])
                    {
                        equipmentObject = {
                            itemHash: hash,
                            itemName: itemDefinitions[hash].ItemName,
                            itemDescription: itemDefinitions[hash].ItemDescription,
                            icon: itemDefinitions[hash].Icon,
                            bucketHash: itemDefinitions[hash].BucketHash
                        };
                    } else
                    {
                        equipmentObject = { itemHash: hash, itemName: "LOL not in DB", icon: "/common/destiny_content/icons/01e92aa9288da062ef7cd735e6b25909.jpg" };
                    }
                    equipmentData.push(equipmentObject);
                }
            }
            characterData.push({ charactersOverview: charactersOverview, equipmentData: equipmentData, characterId: characterId });
        }
        return characterData;
    }

    public handleGetExoticWeapons = (inputList: any): Array<IPopularItemHash> =>
    {
        const popularItems = this.destinyDataService.getPopularItems();
        let gearScoreList: Array<IPopularItemHash> = [];
        for (let i = 0; i < inputList.length; i++)
        {
            for (let j = 0; j < popularItems.length; j++)
            {
                if (inputList[i] === popularItems[j].hash)
                {
                    if (popularItems[j].starred)
                    {
                        let gearObj: IPopularItemHash = popularItems[j];
                        gearScoreList.push(gearObj);
                    }
                }
            }
        }
        return gearScoreList;
    }

    public handleLegendaries = (inputList: any): Array<IPopularItemHash> =>
    {
        const popularItems = this.destinyDataService.getPopularItems();
        let gearScoreList: Array<IPopularItemHash> = [];
        for (let i = 0; i < inputList.length; i++)
        {
            for (let j = 0; j < popularItems.length; j++)
            {
                if (inputList[i] && inputList[i].ItemHash === popularItems[j].hash)
                {
                    if (popularItems[j].starred)
                    {
                        const gearObj: IPopularItemHash = popularItems[j];
                        gearScoreList.push(gearObj);
                    }
                }
            }
        }
        return gearScoreList;
    }

    public handleSearchPlayerResponse = (data: any): IAccountDetails =>
    {
        const dataResponse = data.Response[0];
        const accountDetails: IAccountDetails = {
            membershipId: dataResponse.membershipId,
            platform: dataResponse.membershipType,
            displayName: dataResponse.displayName,
            platformIcon: dataResponse.iconPath
        };
        this.destinyDataService.setStoredPlayerData(accountDetails);
        return accountDetails;
    }

    public handleGetCharactersInventoryResponse = (rawData: any, characterData: Array<ICharacterData>) =>
    {
        const inventoryDataResponse = rawData.Response.Items;
        const characterNumberResponse = rawData.Response.CharacterNumber;
        for (let i = 0; i < inventoryDataResponse.length; i++)
        {
            const currentCharacterEquipment = characterData[characterNumberResponse].equipmentData;
            for (let j = 0; j < currentCharacterEquipment.length; j++)
            {
                if (inventoryDataResponse[i] && currentCharacterEquipment[j] && inventoryDataResponse[i].ItemHash === currentCharacterEquipment[j].itemHash)
                {
                    const bucketHash = <ICategoryHash>this.sharedFunctionsService.getHashObject(this.destinyDataService.getBucketHashes(), currentCharacterEquipment[j].bucketHash);
                    if (!bucketHash) continue;
                    if (bucketHash.category === ITEMCATEGORY.Weapon || bucketHash.category === ITEMCATEGORY.Armor)
                    {
                        const itemDetails: IEquipmentDataDetails = {
                            primaryStat: inventoryDataResponse[i].PrimaryStatValue,
                            damageType: inventoryDataResponse[i].DamageType
                        };
                        characterData[characterNumberResponse].equipmentData[j].details = itemDetails;
                    }
                }
            }
        }
    }

    public checkInterestingGear(data: any)
    {
        var characterEquipmentData = data.Response.Response.data.buckets.Equippable;
        for (let i = 0; i < characterEquipmentData.length; i++)
        {

        }
    }

    public handleGetItemResponse = (rawData: any, characterData: Array<ICharacterData>) =>
    {
        const listNumber = rawData.ListNumber;
        const listPosition = rawData.ListPosition;
        const itemData = rawData.Response.Response.data.inventoryItem;
        characterData[listNumber].equipmentData[listPosition].icon = itemData.icon;
        characterData[listNumber].equipmentData[listPosition].itemName = itemData.itemName;
    };

    //#endregion

    //#region private member methods
    private getCharacterOverviewObject = (charactersDataList: any): string =>
    {
        const raceHashes = this.destinyDataService.getRaceHashes();
        const classHashes = this.destinyDataService.getClassHashes();
        const genderHashes = this.destinyDataService.getGenderHashes();

        const Race = this.sharedFunctionsService.getHashObject(raceHashes, charactersDataList.RaceHash).value;
        const classType = this.sharedFunctionsService.getHashObject(classHashes, charactersDataList.ClassHash).value;
        const gender = this.sharedFunctionsService.getHashObject(genderHashes, charactersDataList.GenderHash).value;
        const level = charactersDataList.BaseCharacterLevel;
        const powerLevel = charactersDataList.PowerLevel;
        const characterOverview = `${level} ${Race} ${classType} - ${gender} ${powerLevel}`;

        return characterOverview;
    }

    private getEquipmentDataObject = (characterData: any): Array<number> =>
    {
        const unorderedList: Array<number> = characterData.EquipmentList;
        if (unorderedList.length === 13)
            return unorderedList;
        let orderedList: Array<number> = [];
        //re-order list
        for (let j = 0; j < unorderedList.length; j++)
        {
            const orderedListPosition = this.destinyDataService.getItemOrderValue(j);
            if (unorderedList[orderedListPosition])
                orderedList.push(unorderedList[orderedListPosition]);
        }
        return orderedList;
    }

    //#endregion
}

destiny.service("destinyBlService", ["destinyDataService", "sharedFunctionsService", DestinyBlService]); 
