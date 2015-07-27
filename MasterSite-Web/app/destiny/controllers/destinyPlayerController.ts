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
        scope.characterNumber = $stateParams.characterNumber - 1;
        
        //Service API Calls
        destinyApiService.searchPlayer(this.getPlatformNumber(scope.platform), scope.displayName).then(
            (data: any) => this.handleSearchPlayerResponse(data.data),
            () => this.scope.errorMessage = "An Error has occured while searching for player");
    }

    private searchPlayer = (testValue: any) =>
    {
        this.scope.displayName = testValue;
        this.$state.go("destinyPlayer", {
            platform: this.scope.platform,
            displayName: this.scope.displayName,
            characterNumber: 1
        });

    }

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

        this.destinyApiService.getAccountInfo(this.getPlatformNumber(this.scope.platform), this.membershipId).then(
            (innerData: any) => this.handleGetAccountInfoResponse(innerData.data),
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
        this.getCharactersInventory(charactersDataList);
    }

    private handleGetItemResponse = (data: any) =>
    {
        let dataObject = JSON.parse(data);
        let listNumber = dataObject.ListNumber;
        let listPosition = dataObject.ListPosition;
        let itemData = dataObject.Response.Response.data.inventoryItem;
        this.scope.characterData.equipmentData[listNumber].splice(listPosition, 1, itemData);
        console.log(`List Number: ${listNumber}, Position: ${listPosition}, Name: ${itemData.itemName}`);
    }

    private getEquipmentInfo = (equipmentList: Array<Array<IEquipmentData>>) =>
    {
        for (let i = 0; i < 3; i++)
        {
            let currentEquipmentList = equipmentList[i];
            for (let j = 0; j < equipmentList[i].length; j++)
            {
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
            let characterId = charactersDataList[i].characterBase.characterId;
            this.destinyApiService.getCharacterInventory(this.getPlatformNumber(this.scope.platform),
                this.membershipId, characterId, i).then((data: any) =>
            {
                this.handleGetCharactersInventoryResponse(data.data);
            });
        }
    }

    private handleGetCharactersInventoryResponse = (data: any) =>
    {
        let dataObject = JSON.parse(data);
        const characterNumber = dataObject.CharacterNumber;
        let characterInventoryData = dataObject.Response.Response.data.buckets.Equippable
        for (let i = 0; i < characterInventoryData.length; i++)
        {
            this.scope.characterData.equipmentData[characterNumber][i].details = characterInventoryData[i].items[0];
        }
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
        let match = this.matchDestinyHashes;
        let characterOneRace = match(raceHashes, charactersDataList[0].characterBase.raceHash);
        let characterTwoRace = match(raceHashes, charactersDataList[1].characterBase.raceHash);
        let characterThreeRace = match(raceHashes, charactersDataList[2].characterBase.raceHash);
        let characterOneClass = match(classHashes, charactersDataList[0].characterBase.classHash);
        let characterTwoClass = match(classHashes, charactersDataList[1].characterBase.classHash);
        let characterThreeClass = match(classHashes, charactersDataList[2].characterBase.classHash);
        let characterOneGender = match(genderHashes, charactersDataList[0].characterBase.genderHash);
        let characterTwoGender = match(genderHashes, charactersDataList[1].characterBase.genderHash);
        let characterThreeGender = match(genderHashes, charactersDataList[2].characterBase.genderHash);
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

masterSite.controller("destinyPlayerController", ["$scope", "destinyApiService",
    "destinyDataService", "$stateParams", "$state", DestinyPlayerController]); 
