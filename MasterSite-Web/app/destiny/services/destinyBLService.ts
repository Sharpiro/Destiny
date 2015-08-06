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
            const charactersOverview: Array<string> = this.getCharacterOverviewObject(currentCharacterData);
            const equipmentData: Array<IEquipmentData> = this.getEquipmentDataObject(currentCharacterData);
            const characterId = currentCharacterData.characterBase.characterId;
            characterData.push({ charactersOverview: charactersOverview[i], equipmentData: equipmentData, characterId: characterId });
        }
        return characterData;
    }



    public handleGetUniqueWeaponDataResponse = (data: any) => {
        console.log(data);
    }

    //#endregion

    //#region private member methods
    private getCharacterOverviewObject = (charactersDataList: Array<any>): Array<string> =>
    {
        const raceHashes = this.destinyDataService.getRaceHashes();
        const classHashes = this.destinyDataService.getClassHashes();
        const genderHashes = this.destinyDataService.getGenderHashes();
        let characterOverviewObject: Array<string> = [];

        for (let i = 0; i < charactersDataList.length; i++)
        {
            const characterOneRace = this.sharedFunctionsService.getHashObject(raceHashes, charactersDataList[i].characterBase.raceHash).value;
            const characterOneClass = this.sharedFunctionsService.getHashObject(classHashes, charactersDataList[i].characterBase.classHash).value;
            const characterOneGender = this.sharedFunctionsService.getHashObject(genderHashes, charactersDataList[i].characterBase.genderHash).value;
            const characterOneLevel = charactersDataList[i].characterLevel;
            const characterOverview = `${characterOneLevel} ${characterOneRace} ${characterOneClass} - ${characterOneGender}`;
            characterOverviewObject.push(characterOverview);
        }

        return characterOverviewObject;
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
