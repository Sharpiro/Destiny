///<reference path="../app.ts"/>
///<reference path="../services/destinyDataService.ts"/>

class DestinyPlayerController
{
    private achievements: any;
    //#region Constructor
    constructor(private scope: IDestinyPlayerScope, private destinyApiService: DestinyApiService, private destinyDataService: DestinyDataService,
        $stateParams: any, private $state: any, private destinyBlService: DestinyBlService, private sharedFunctionsService: SharedFunctionsService)
    {
        scope.vm = this;

        if (this.updateAccountDetails($stateParams))
        {
            this.searchPlayer(scope.accountDetails.displayName, scope.accountDetails.platform);
        }
        else
        {
            this.scope.weaponScore = [];
            //get general account information
            this.destinyApiService.getAccountInfo(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(
                (data: any) =>
                {
                    this.scope.characterData = destinyBlService.handleGetAccountInfoResponse(data.data);
                    this.getCharactersInventory(this.scope.characterData);
                    this.scope.showPageContent = true;
                },
                (data: any) => this.setPageError(data.ExceptionMessage));
            //get Account triumphs
            this.destinyApiService.getAccountTriumphs(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(
                (data: any) => this.scope.triumphs = destinyBlService.handleGetAccountTriumphsResponse(data.data),
                (data: any) => this.setPageError(data));
            //get grimoire cards
            this.destinyApiService.getGrimoireCardBulk(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId,
                this.destinyDataService.getAchievementHashes(), true).then(
                (data: any) => this.achievements = data.data,
                (data: any) => this.setPageError(data));
            //get unique weapon data
            this.destinyApiService.getUniqueWeaponData(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(
                (data: any) =>
                {
                    var concatArray = this.scope.weaponScore.concat(destinyBlService.handleGetExoticWeapons(data.data));
                    this.scope.weaponScore = this.getDistinct(concatArray);
                },
                (data: any) => this.setPageError(data));
        }
    }

    //#endregion Constructor

    //#region API Call Wrappers

    private getEquipmentInfo = (characterDataList: Array<ICharacterData>) =>
    {
        //TODO: Create Plunker demonstrating TS bug where "scope" is not accessible via breakpoint in this context
        for (let i = 0; i < characterDataList.length; i++)
        {
            const currentEquipmentList = characterDataList[i].equipmentData;
            for (let j = 0; j < characterDataList[i].equipmentData.length; j++)
            {
                this.destinyApiService.getItem(currentEquipmentList[j].itemHash, i, j).then((data: any) =>
                {
                    //modifying this.scope.characterData as object is passed by reference
                    this.destinyBlService.handleGetItemResponse(data.data, this.scope.characterData);
                });
            }
        }
    }

    private getCharactersInventory = (charactersData: Array<ICharacterData>) =>
    {
        for (let i = 0; i < charactersData.length; i++)
        {
            this.destinyApiService.getCharacterInventory(this.scope.accountDetails.platform,
                this.scope.accountDetails.membershipId, charactersData[i].characterId, i).then((data: any) =>
                {
                    //modifying this.scope.characterData as object is passed by reference
                    this.destinyBlService.handleGetCharactersInventoryResponse(data.data, this.scope.characterData);
                    var uniqueEquippedWeapons = this.destinyBlService.handleLegendaries(data.data.items);
                    let concatArray = this.scope.weaponScore.concat(uniqueEquippedWeapons);
                    this.scope.weaponScore = this.getDistinct(concatArray);
                });
        }
    }

    //#endregion API Call Wrappers

    //#region private member methods

    private searchPlayer = (searchValue: string, platform?: number) =>
    {
        this.destinyApiService.searchPlayer(searchValue, platform).then(
            (data: any) =>
            {
                this.scope.accountDetails = this.destinyBlService.handleSearchPlayerResponse(data.data);

                this.$state.go("destinyPlayer", {
                    platform: this.getPlatformString(this.scope.accountDetails.platform),
                    displayName: this.scope.accountDetails.displayName
                }, { reload: true });
            },
            (data: any) => this.setPageError(data));
    }

    private rowClicked = (itemHash: any) =>
    {
        var temp = this.scope.weaponScore;
        //window.open(`${this.destinyDataService.getDestinyLinks().databases.destinydb}${itemHash}`, "_blank");
    }

    private mouseOverRow(item: IEquipmentData)
    {
        var temp = this.scope.weaponScore;
        //console.log(item.itemName);
    }

    private getDistinct(list: Array<any>)
    {
        let n: any = {}
        let r: any = [];
        for (let i = 0; i < list.length; i++)
        {
            if (!n[list[i].hash])
            {
                n[list[i].hash] = true;
                r.push(list[i]);
            }
        }
        return r;
    }

    private updateAccountDetails = (stateParams: any): boolean =>
    {
        this.scope.accountDetails = new AccountDetails();
        this.scope.accountDetails.platform = this.getPlatformNumber(stateParams.platform);
        this.scope.accountDetails.displayName = stateParams.displayName;
        const storedPlayerData = this.destinyDataService.getStoredPlayerData();
        this.scope.accountDetails.platformIcon = storedPlayerData.platformIcon;
        this.scope.accountDetails.membershipId = storedPlayerData.membershipId;
        if (!this.scope.accountDetails.membershipId)
        {
            return true;
        }
        if (storedPlayerData.platform !== this.scope.accountDetails.platform)
        {
            return true;
        }
        if (storedPlayerData.displayName !== this.scope.accountDetails.displayName)
        {
            return true;
        }
        return false;
    }

    private getPlatformString(platform: number): string
    {
        return platform === PLATFORM.xbox ? PLATFORM[PLATFORM.xbox] : PLATFORM[PLATFORM.ps];
    }

    private getPlatformNumber(platform: string): number
    {
        platform = platform.toLowerCase();
        return platform === PLATFORM[PLATFORM.xbox] ? PLATFORM.xbox : PLATFORM.ps;
    }

    private setPageError = (errorDetails: string) =>
    {
        this.scope.pageIsErrored = true;
        this.scope.showPageContent = false;
        this.scope.errorMessage = errorDetails;
        console.error(errorDetails);
    }
}

//#endregion

destiny.controller("destinyPlayerController", ["$scope", "destinyApiService",
    "destinyDataService", "$stateParams", "$state", "destinyBlService", "sharedFunctionsService", DestinyPlayerController]); 
