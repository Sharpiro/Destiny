///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyPlayerScope.ts"/>
/////<reference path="../services/destinyDataService.ts"/>

class DestinyPlayerController
{
    private membershipId: number;

    constructor(private scope: IDestinyPlayerScope, private destinyApiService: DestinyApiService, private destinyDataService: DestinyDataService, $stateParams: any)
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

    private toggleState = () =>
    {
        this.scope.state = !this.scope.state;
        console.log(this.scope.state);
        menubar.visible = false;
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
        const equipmentData = fullCharacterData.characterBase.peerView.equipment;
        const className = this.matchDestinyHashes(this.destinyDataService.getClassHashes(), fullCharacterData.characterBase.classHash);
        const raceName = this.matchDestinyHashes(this.destinyDataService.getRaceHashes(), fullCharacterData.characterBase.raceHash);
        const level: number = fullCharacterData.characterLevel;
        this.scope.characterData = { charactersOverview: charactersOverview, equipmentData: equipmentData, className: className, raceName: raceName, level: level };
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
}

masterSite.controller("destinyPlayerController", ["$scope", "destinyApiService", "destinyDataService", "$stateParams", DestinyPlayerController]); 
