///<reference path="../app.ts"/>
///<reference path="../services/destinyDataService.ts"/>

class DestinyPlayerController
{
    //#region Constructor
    constructor(private scope: IDestinyPlayerScope, private destinyApiService: DestinyApiService, private destinyDataService: DestinyDataService,
        $stateParams: any, private $state: any, private destinyBlService: DestinyBlService, private sharedFunctionsService: SharedFunctionsService)
    {
        scope.vm = this;
        this.scope.showPageContent = true;

        if (this.updateAccountDetails($stateParams))
        {
            this.searchPlayer(scope.accountDetails.displayName, scope.accountDetails.platform);
        }
        else
        {
            //get general account information
            this.destinyApiService.getAccountInfo(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(
                (data: any) =>
                {
                    this.scope.characterData = destinyBlService.handleGetAccountInfoResponse(data.data);
                    this.getCharactersInventory(this.scope.characterData);
                    this.getEquipmentInfo(this.scope.characterData);
                },
                (data: any) => this.setPageError(data.ExceptionMessage));
            //get Account triumphs
            this.destinyApiService.getAccountTriumphs(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(
                (data: any) => this.scope.triumphs = destinyBlService.handleGetAccountTriumphsResponse(data.data),
                (data: any) => this.setPageError(data));
            //get unique weapon data
            this.destinyApiService.getUniqueWeaponData(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(
                (data: any) => this.scope.weaponScore = destinyBlService.handleGetUniqueWeaponDataResponse(data.data),
                (data: any) => this.setPageError(data));
        }
    }

    //#endregion Constructor

    //#region API Call Wrappers

    private getEquipmentInfo = (characterDataList: Array<ICharacterData>) =>
    {
        //TODO: Create Plunker demonstrating TS bug where "scope" is not accessible via breakpoint in the context
        for (let i = 0; i < characterDataList.length; i++)
        {
            const currentEquipmentList = characterDataList[i].equipmentData;
            for (let j = 0; j < characterDataList[i].equipmentData.length; j++)
            {
                this.destinyApiService.getItem(currentEquipmentList[j].itemHash, i, j).then((data: any) =>
                {
                    //this.handleGetItemResponse(data.data);
                    const listNumber = data.data.ListNumber;
                    const listPosition = data.data.ListPosition;
                    const itemData = data.data.Response.Response.data.inventoryItem;
                    this.scope.characterData[listNumber].equipmentData[listPosition].icon = itemData.icon;
                    this.scope.characterData[listNumber].equipmentData[listPosition].itemName = itemData.itemName;
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
                    this.handleGetCharactersInventoryResponse(data.data);
                });
        }
    }

    //#endregion API Call Wrappers

    //#region Callback Functions

    private handleSearchPlayerResponse = (data: any) =>
    {
        const dataResponse = data.Response[0];
        if (!dataResponse)
        {
            this.scope.errorMessage = "Error: Player not found";
            return;
        }
        this.scope.accountDetails.membershipId = dataResponse.membershipId;
        this.scope.accountDetails.platform = dataResponse.membershipType;
        this.scope.accountDetails.displayName = dataResponse.displayName;
        this.scope.accountDetails.platformIcon = dataResponse.iconPath;
        this.destinyDataService.setStoredPlayerData(this.scope.accountDetails);

        this.$state.go("destinyPlayer", {
            platform: this.getPlatformString(dataResponse.membershipType),
            displayName: dataResponse.displayName
        }, { reload: true });
    }

    private handleGetCharactersInventoryResponse = (data: any) =>
    {
        const characterNumberResponse = data.CharacterNumber;
        const inventoryDataResponse = data.Response.Response.data.buckets.Equippable;
        for (let i = 0; i < inventoryDataResponse.length; i++)
        {
            const currentCharacterEquipment = this.scope.characterData[characterNumberResponse].equipmentData;
            for (let j = 0; j < currentCharacterEquipment.length; j++)
            {
                if (inventoryDataResponse[i].items[0].itemHash === currentCharacterEquipment[j].itemHash)
                {
                    const bucketHash = <ICategoryHash>this.sharedFunctionsService.getHashObject(this.destinyDataService.getBucketHashes(), inventoryDataResponse[i].bucketHash);
                    if (bucketHash.category === ITEMCATEGORY.Weapon)
                    {
                        const itemDetails: IEquipmentDataDetails = {
                            primaryStat: inventoryDataResponse[i].items[0].primaryStat.value,
                            damageType: inventoryDataResponse[i].items[0].damageType
                        };
                        this.scope.characterData[characterNumberResponse].equipmentData[j].details = itemDetails;
                    }
                    else if (bucketHash.category === ITEMCATEGORY.Armor)
                    {
                        if (inventoryDataResponse[i].items[0].stats[0])
                        {
                            const itemDetails: IEquipmentDataDetails = {
                                primaryStat: inventoryDataResponse[i].items[0].stats[0].value,
                                damageType: null
                            };
                            this.scope.characterData[characterNumberResponse].equipmentData[j].details = itemDetails;
                        }
                    }
                }
            }
        }
    }

    //#endregion

    //#region Member Methods

    private searchPlayer = (searchValue: string, platform?: number) =>
    {
        this.destinyApiService.searchPlayer(searchValue, platform).then(
            (data: any) => this.handleSearchPlayerResponse(data.data),
            (data: any) => this.setPageError(data));
    }

    private rowClicked = (itemHash: any) =>
    {
        //window.open(`${this.destinyDataService.getDestinyLinks().databases.destinydb}${itemHash}`, "_blank");
    }

    private mouseOverRow(item: IEquipmentData)
    {
        //console.log(item.itemName);
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
        this.scope.errorMessage = errorDetails;
        console.error(errorDetails);
    }
}

//#endregion

masterSite.controller("destinyPlayerController", ["$scope", "destinyApiService",
    "destinyDataService", "$stateParams", "$state", "destinyBlService", "sharedFunctionsService", DestinyPlayerController]); 
