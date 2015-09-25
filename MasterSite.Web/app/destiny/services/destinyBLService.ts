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
        const triumphs = data.Response.data.triumphSets[0].triumphs;
        const staticTriumphData = this.destinyDataService.getAccountTriumphs().yearOne;
        let triumphObjects: Array<ITriumphs> = [];
        for (let i = 0; i < triumphs.length; i++)
        {
            triumphObjects[i] = { title: staticTriumphData[i].title, complete: triumphs[i].complete };
        }
        return triumphObjects;
    }

    public handleGetAccountInfoResponse = (data: any): Array<ICharacterData> =>
    {
        const accountInfoData = data.Response.data;
        const itemDefinitions: Array<any> = data.Response.definitions.items;
        let characterData: Array<ICharacterData> = [];
        for (let i = 0; i < accountInfoData.characters.length; i++)
        {
            let currentCharacterData = accountInfoData.characters[i];
            const charactersOverview: string = this.getCharacterOverviewObject(currentCharacterData);
            const equipmentData: Array<IEquipmentData> = this.getEquipmentDataObject(currentCharacterData);
            const characterId = currentCharacterData.characterBase.characterId;
            for (let j = 0; j < equipmentData.length; j++)
            {
                if (equipmentData[j])
                {
                    const hash = equipmentData[j].itemHash;
                    if (itemDefinitions[hash])
                    {
                        equipmentData[j].itemName = itemDefinitions[hash].itemName;
                        equipmentData[j].icon = itemDefinitions[hash].icon;
                    } else
                    {
                        equipmentData[j].itemName = "LOL not in DB";
                        equipmentData[j].icon = "/common/destiny_content/icons/01e92aa9288da062ef7cd735e6b25909.jpg";
                    }
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
                if (inputList[i].referenceId === popularItems[j].hash)
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
                if (inputList[i].items[0] && inputList[i].items[0].itemHash === popularItems[j].hash)
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
        const inventoryDataResponse = rawData.Response.Response.data.buckets.Equippable;
        const characterNumberResponse = rawData.CharacterNumber;
        for (let i = 0; i < inventoryDataResponse.length; i++)
        {
            const currentCharacterEquipment = characterData[characterNumberResponse].equipmentData;
            for (let j = 0; j < currentCharacterEquipment.length; j++)
            {
                if (inventoryDataResponse[i].items[0] && currentCharacterEquipment[j] && inventoryDataResponse[i].items[0].itemHash === currentCharacterEquipment[j].itemHash)
                {
                    const bucketHash = <ICategoryHash>this.sharedFunctionsService.getHashObject(this.destinyDataService.getBucketHashes(), inventoryDataResponse[i].bucketHash);
                    if (!bucketHash) return;
                    if (bucketHash.category === ITEMCATEGORY.Weapon || bucketHash.category === ITEMCATEGORY.Armor)
                    {
                        const itemDetails: IEquipmentDataDetails = {
                            primaryStat: inventoryDataResponse[i].items[0].primaryStat.value,
                            damageType: inventoryDataResponse[i].items[0].damageType
                        };
                        characterData[characterNumberResponse].equipmentData[j].details = itemDetails;
                    }
                    //else if (bucketHash.category === ITEMCATEGORY.Armor)
                    //{
                    //    if (inventoryDataResponse[i].items[0].stats[0])
                    //    {
                    //        const itemDetails: IEquipmentDataDetails = {
                    //            primaryStat: inventoryDataResponse[i].items[0].stats[0].value,
                    //            damageType: null
                    //        };
                    //        characterData[characterNumberResponse].equipmentData[j].details = itemDetails;
                    //    }
                    //}
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

        const characterOneRace = this.sharedFunctionsService.getHashObject(raceHashes, charactersDataList.characterBase.raceHash).value;
        const characterOneClass = this.sharedFunctionsService.getHashObject(classHashes, charactersDataList.characterBase.classHash).value;
        const characterOneGender = this.sharedFunctionsService.getHashObject(genderHashes, charactersDataList.characterBase.genderHash).value;
        const characterOneLevel = charactersDataList.characterLevel;
        const characterOverview = `${characterOneLevel} ${characterOneRace} ${characterOneClass} - ${characterOneGender}`;

        return characterOverview;
    }

    private getEquipmentDataObject = (charactersDataList: any): Array<IEquipmentData> =>
    {
        const unorderedList: Array<IEquipmentData> = charactersDataList.characterBase.peerView.equipment;
        if (unorderedList.length === 13)
            return unorderedList;
        let orderedList: Array<IEquipmentData> = [];
        //re-order list
        for (let j = 0; j < unorderedList.length; j++)
        {
            //if (unorderedList.length === 13) {
            //    console.log(unorderedList[j].itemHash);
            //}
            const orderedListPosition = this.destinyDataService.getItemOrderValue(j);
            if (unorderedList[orderedListPosition])
                orderedList.push(unorderedList[orderedListPosition]);
        }
        return orderedList;
    }

    //#endregion
}

masterSite.service("destinyBlService", ["destinyDataService", "sharedFunctionsService", DestinyBlService]); 
