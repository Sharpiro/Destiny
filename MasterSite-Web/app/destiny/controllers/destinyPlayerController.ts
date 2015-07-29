///<reference path="../app.ts"/>
///<reference path="../services/destinyDataService.ts"/>

class DestinyPlayerController
{
    private membershipId: number;

    constructor(private scope: IDestinyPlayerScope, private destinyApiService: DestinyApiService, private destinyDataService: DestinyDataService, $stateParams: any, private $state: any)
    {
        scope.VM = this;
        scope.platform = $stateParams.platform;
        scope.displayName = $stateParams.displayName;
        
        //Service API Calls
        destinyApiService.searchPlayer(this.getPlatformNumber(scope.platform), scope.displayName).then(
            (data: any) => this.handleSearchPlayerResponse(data.data),
            () => this.scope.errorMessage = "An Error has occured while searching for player");
    }

    //#region API Call Wrappers

    private getEquipmentInfo = (equipmentList: Array<Array<IEquipmentData>>) =>
    {
        for (let i = 0; i < 3; i++)
        {
            const currentEquipmentList = equipmentList[i];
            for (let j = 0; j < equipmentList[i].length; j++)
            {
                const test = this.destinyDataService.getItemOrderValue(j);
                this.destinyApiService.getItem(currentEquipmentList[j].itemHash, i, j).then((data: any) =>
                {
                    this.handleGetItemResponse(data.data);
                });
            }
        }
    }

    private getCharactersInventory = (charactersDataList: any) =>
    {
        for (let i = 0; i < charactersDataList.length; i++)
        {
            const characterId = charactersDataList[i].characterBase.characterId;
            this.destinyApiService.getCharacterInventory(this.getPlatformNumber(this.scope.platform),
                this.membershipId, characterId, i).then((data: any) =>
                {
                    this.handleGetCharactersInventoryResponse(data.data);
                });
        }
    }

    //#endregion API Call Wrappers

    //#region Callback Functions

    private handleSearchPlayerResponse = (data: any) =>
    {
        const dataResponse = JSON.parse(data).Response[0];
        if (!dataResponse)
        {
            this.scope.errorMessage = "Error: Player not found";
            return;
        }
        this.membershipId = dataResponse.membershipId || null;
        this.scope.playerSearchData = dataResponse;

        //get general account information
        this.destinyApiService.getAccountInfo(this.getPlatformNumber(this.scope.platform), this.membershipId).then(
            (innerData: any) => this.handleGetAccountInfoResponse(innerData.data),
            () => this.scope.errorMessage = "An Error has occured while getting account info");
        //get Account triumphs
        this.destinyApiService.GetAccountTriumphs(this.getPlatformNumber(this.scope.platform), this.membershipId).then(
            (innerData: any) => this.handleGetAccountTriumphsResponse(innerData.data),
            () => this.scope.errorMessage = "An Error has occured while getting account info");
    }

    private handleGetAccountInfoResponse = (data: any) =>
    {
        const accountInfoData = JSON.parse(data).Response.data;
        const charactersDataList = [accountInfoData.characters[0], accountInfoData.characters[1], accountInfoData.characters[2]];
        if (!charactersDataList[0])
        {
            this.scope.errorMessage = "Error: Character not found";
            return;
        }
        const charactersOverviewTwo: Array<string> = this.getCharacterOverviewObject(charactersDataList);
        const equipmentData: Array<Array<IEquipmentData>> = this.getEquipmentDataObject(charactersDataList);
        this.scope.characterData = { charactersOverview: charactersOverviewTwo, equipmentData: equipmentData };

        //get generic equipment data
        this.getEquipmentInfo(equipmentData);
        //get inventory data for characters
        //this.getCharactersInventory(charactersDataList);
    }

    private handleGetAccountTriumphsResponse = (data: any) =>
    {
        const triumphs = data.Response.data.triumphSets[0].triumphs;
        const staticTriumphData = this.destinyDataService.getAccountTriumphs().yearOne;
        this.scope.triumphs = [];
        for (let i = 0; i < triumphs.length; i++)
        {
            this.scope.triumphs[i] = { title: staticTriumphData[i].title, complete: triumphs[i].complete };
            //console.log(`${staticTriumphData[i].title}: ${triumphs[i].complete}`);
        }
    }

    private handleGetItemResponse = (data: any) =>
    {
        const dataObject = JSON.parse(data);
        const listNumber = dataObject.ListNumber;
        const listPosition = dataObject.ListPosition;
        const itemData = dataObject.Response.Response.data.inventoryItem;
        const orderedListPosition = this.destinyDataService.getItemOrderValue(listPosition);
        this.scope.characterData.equipmentData[listNumber].splice(orderedListPosition, 1, itemData);
        //console.log(`List Number: ${listNumber}, Position: ${listPosition}, Name: ${itemData.itemName}`);
    }

    private handleGetCharactersInventoryResponse = (data: any) =>
    {
        const dataResponse = JSON.parse(data);
        const characterNumberResponse = dataResponse.CharacterNumber;
        const inventoryDataResponse = dataResponse.Response.Response.data.buckets.Equippable;
        for (let i = 0; i < inventoryDataResponse.length; i++)
        {
            const currentCharacterEquipment = this.scope.characterData.equipmentData[characterNumberResponse];
            for (let j = 0; j < currentCharacterEquipment.length; j++)
            {
                if (inventoryDataResponse[i].items[0].itemHash == currentCharacterEquipment[j].itemHash)
                {
                    this.scope.characterData.equipmentData[characterNumberResponse][j].details = inventoryDataResponse[i].items[0];
                }
            }
        }
    }

    //#endregion

    //#region Member Methods

    private searchPlayer = (searchValue: any) =>
    {
        this.scope.displayName = searchValue;
        this.$state.go("destinyPlayer", {
            platform: this.scope.platform,
            displayName: this.scope.displayName,
        });
    }

    private matchDestinyHashes = (hashArray: Array<IHash>, classHash: number): string =>
    {
        for (let i = 0; i < hashArray.length; i++)
        {
            if (hashArray[i].hash === classHash)
                return hashArray[i].value;
        }
        console.log(`Error: Unknown Hash: ${classHash}`);
        return null;
    }

    private getPlatformNumber(platformName: string): number
    {
        return this.scope.platform === PLATFORM[1] ? PLATFORM.xbox : PLATFORM.playstation;
    }

    private isCharacterActive = (number: number) => this.scope.characterNumber === number;

    private getCharacterOverviewObject = (charactersDataList: Array<any>) =>
    {
        const raceHashes = this.destinyDataService.getRaceHashes();
        const classHashes = this.destinyDataService.getClassHashes();
        const genderHashes = this.destinyDataService.getGenderHashes();
        const match = this.matchDestinyHashes;
        const characterOneRace = match(raceHashes, charactersDataList[0].characterBase.raceHash);
        const characterTwoRace = match(raceHashes, charactersDataList[1].characterBase.raceHash);
        const characterThreeRace = match(raceHashes, charactersDataList[2].characterBase.raceHash);
        const characterOneClass = match(classHashes, charactersDataList[0].characterBase.classHash);
        const characterTwoClass = match(classHashes, charactersDataList[1].characterBase.classHash);
        const characterThreeClass = match(classHashes, charactersDataList[2].characterBase.classHash);
        const characterOneGender = match(genderHashes, charactersDataList[0].characterBase.genderHash);
        const characterTwoGender = match(genderHashes, charactersDataList[1].characterBase.genderHash);
        const characterThreeGender = match(genderHashes, charactersDataList[2].characterBase.genderHash);
        return [
            `${charactersDataList[0].characterLevel} ${characterOneRace} ${characterOneClass} - ${characterOneGender}`,
            `${charactersDataList[1].characterLevel} ${characterTwoRace} ${characterTwoClass} - ${characterTwoGender}`,
            `${charactersDataList[2].characterLevel} ${characterThreeRace} ${characterThreeClass} - ${characterThreeGender}`
        ];
    }

    private getEquipmentDataObject = (charactersDataList: Array<any>): Array<Array<IEquipmentData>> =>
    {
        return [
            charactersDataList[0].characterBase.peerView.equipment,
            charactersDataList[1].characterBase.peerView.equipment,
            charactersDataList[2].characterBase.peerView.equipment
        ];
    }
}

//#endregion

masterSite.controller("destinyPlayerController", ["$scope", "destinyApiService",
    "destinyDataService", "$stateParams", "$state", DestinyPlayerController]); 
