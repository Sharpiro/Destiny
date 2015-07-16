///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyPlayerScope.ts"/>
/////<reference path="../services/destinyDataService.ts"/>

class DestinyPlayerController
{
    private membershipId: number;

    constructor(private scope: IDestinyPlayerScope, private destinyApiService: DestinyApiService, private destinyDataService: DestinyDataService, $stateParams: any, private $state: any)
    {
        scope.VM = this;
        scope.platform = $stateParams.platform;
        scope.displayName = $stateParams.displayName;
        scope.characterNumber = $stateParams.characterNumber - 1;
        scope.state = true;
        
        //Service API Calls
        destinyApiService.searchPlayer(this.getPlatformNumber(scope.platform), scope.displayName).then(
            (data: any) => this.handleSearchPlayerResponse(data.data),
            () => this.scope.errorMessage = "An Error has occured while searching for player");
    }

    private test = (testValue: any) =>
    {
        console.log(testValue);
        this.scope.displayName = testValue;
        this.$state.go('destinyPlayer', { platform: this.scope.platform, displayName: this.scope.displayName, characterNumber: 1 });

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
        const charactersOverview: Array<ICharacterOverview> = [
            { "level": accountInfoData.characters[0].characterLevel, "className": this.matchDestinyHashes(this.destinyDataService.getClassHashes(), accountInfoData.characters[0].characterBase.classHash) },
            { "level": accountInfoData.characters[1].characterLevel, "className": this.matchDestinyHashes(this.destinyDataService.getClassHashes(), accountInfoData.characters[1].characterBase.classHash) },
            { "level": accountInfoData.characters[2].characterLevel, "className": this.matchDestinyHashes(this.destinyDataService.getClassHashes(), accountInfoData.characters[2].characterBase.classHash) }];
        const fullCharacterData = accountInfoData.characters[this.scope.characterNumber];
        if (!fullCharacterData)
        {
            this.scope.errorMessage = "Error: Character not found";
            return;
        }
        const equipmentData: Array<IEquipmentData> = fullCharacterData.characterBase.peerView.equipment;
        const className = this.matchDestinyHashes(this.destinyDataService.getClassHashes(), fullCharacterData.characterBase.classHash);
        const raceName = this.matchDestinyHashes(this.destinyDataService.getRaceHashes(), fullCharacterData.characterBase.raceHash);
        const level: number = fullCharacterData.characterLevel;
        this.scope.characterData = { charactersOverview: charactersOverview, equipmentData: equipmentData, className: className, raceName: raceName, level: level };
        this.getEquipmentInfo(equipmentData);
    }

    private handleGetItemResponse = (data: any) =>
    {
        let dataObject = JSON.parse(data);
        let responseId = dataObject.ListPosition;
        let itemData = dataObject.Response.Response.data.inventoryItem;
        this.scope.characterData.equipmentData.splice(responseId, 1, itemData);
        console.log(`Name: ${itemData.itemName}, Position: ${responseId}`);
    }

    private getEquipmentInfo = (equipmentList: Array<IEquipmentData>) =>
    {
        for (let i = 0; i < equipmentList.length; i++)
        {
            this.destinyApiService.getItem(equipmentList[i].itemHash, i).then((data: any) => this.handleGetItemResponse(data.data));
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
}

masterSite.controller("destinyPlayerController", ["$scope", "destinyApiService", "destinyDataService", "$stateParams", "$state", DestinyPlayerController]); 
