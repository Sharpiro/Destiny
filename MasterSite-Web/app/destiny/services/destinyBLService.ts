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
        let characterData: Array<ICharacterData> = [];
        for (let i = 0; i < accountInfoData.characters.length; i++)
        {
            let currentCharacterData = accountInfoData.characters[i];
            const charactersOverview: string = this.getCharacterOverviewObject(currentCharacterData);
            const equipmentData: Array<IEquipmentData> = this.getEquipmentDataObject(currentCharacterData);
            const characterId = currentCharacterData.characterBase.characterId;
            characterData.push({ charactersOverview: charactersOverview, equipmentData: equipmentData, characterId: characterId });
        }
        return characterData;
    }



    public handleGetUniqueWeaponDataResponse = (data: any): Array<ITriumphs> =>
    {
        const exoticData: Array<IExoticData> = data.Response.data.weapons;
        const popularItems = this.destinyDataService.getPopularItems();
        let gearScoreList: Array<ITriumphs> = [];
        for (let i = 0; i < exoticData.length; i++)
        {
            for (let j = 0; j < popularItems.length; j++)
            {
                if (exoticData[i].referenceId === popularItems[j].hash)
                {
                    if (popularItems[j].starred)
                    {
                        let gearObj: ITriumphs = { title: popularItems[j].value, complete: true };
                        gearScoreList.push(gearObj);
                    }
                }
            }
        }
        return gearScoreList;
    }

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

        let orderedList: Array<IEquipmentData> = [];
        //re-order list
        for (let j = 0; j < unorderedList.length; j++)
        {
            const orderedListPosition = this.destinyDataService.getItemOrderValue(j);
            orderedList.push(unorderedList[orderedListPosition]);
        }
        return orderedList;
    }

    //#endregion
}

masterSite.service("destinyBlService", ["destinyDataService", "sharedFunctionsService", DestinyBlService]); 
