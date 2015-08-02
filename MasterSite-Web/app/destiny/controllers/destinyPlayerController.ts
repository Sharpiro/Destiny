///<reference path="../app.ts"/>
///<reference path="../services/destinyDataService.ts"/>

class DestinyPlayerController
{
    constructor(private scope: IDestinyPlayerScope, private destinyApiService: DestinyApiService, private destinyDataService: DestinyDataService, $stateParams: any, private $state: any)
    {
        scope.vm = this;
        scope.accountDetails = new AccountDetails();
        scope.accountDetails.platform = this.getPlatformNumber($stateParams.platform);
        scope.accountDetails.displayName = $stateParams.displayName;
        const storedPlayerData = destinyDataService.getStoredPlayerData();
        scope.accountDetails.platformIcon = storedPlayerData.platformIcon;
        scope.accountDetails.membershipId = storedPlayerData.membershipId;

        if (storedPlayerData.displayName !== scope.accountDetails.displayName || !scope.accountDetails.membershipId)
        {
            this.searchPlayer(scope.accountDetails.displayName);
        }
        else
        {
            //get general account information
            this.destinyApiService.getAccountInfo(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(
                (innerData: any) => this.handleGetAccountInfoResponse(innerData.data),
                () => this.scope.errorMessage = "An Error has occured while getting account info");
            //get Account triumphs
            this.destinyApiService.getAccountTriumphs(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(
                (innerData: any) => this.handleGetAccountTriumphsResponse(innerData.data),
                () => this.scope.errorMessage = "An Error has occured while getting account info");
        }
    }

    //#region API Call Wrappers

    private getEquipmentInfo = (equipmentList: Array<Array<IEquipmentData>>) =>
    {
        //TODO: Find a better way to organize character data to get # of characters etc.
        for (let i = 0; i < 3; i++)
        {
            const currentEquipmentList = equipmentList[i];
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
            const characterId = charactersDataList[i].characterBase.characterId;
            this.destinyApiService.getCharacterInventory(this.scope.accountDetails.platform,
                this.scope.accountDetails.membershipId, characterId, i).then((data: any) =>
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

    private handleGetAccountInfoResponse = (data: any) =>
    {
        const accountInfoData = JSON.parse(data).Response.data;
        let charactersDataList: any = [];
        for (let i = 0; i < accountInfoData.characters.length; i++)
        {
            charactersDataList.push(accountInfoData.characters[i]);
        }
        if (!charactersDataList[0])
        {
            this.scope.errorMessage = "Error: Character not found";
            return;
        }
        const charactersOverview: Array<string> = this.getCharacterOverviewObject(charactersDataList);
        const equipmentData: Array<Array<IEquipmentData>> = this.getEquipmentDataObject(charactersDataList);
        this.scope.characterData = [
            { charactersOverview: charactersOverview[0], equipmentData: equipmentData[0] },
            { charactersOverview: charactersOverview[1], equipmentData: equipmentData[1] },
            { charactersOverview: charactersOverview[2], equipmentData: equipmentData[2] },
        ];

        //get inventory data for characters
        this.getCharactersInventory(charactersDataList);
        //get generic equipment data
        this.getEquipmentInfo(equipmentData);
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
        this.scope.characterData[listNumber].equipmentData[listPosition].icon = itemData.icon;
        this.scope.characterData[listNumber].equipmentData[listPosition].itemName = itemData.itemName;
    }

    private handleGetCharactersInventoryResponse = (data: any) =>
    {
        const dataResponse = JSON.parse(data);
        const characterNumberResponse = dataResponse.CharacterNumber;
        const inventoryDataResponse = dataResponse.Response.Response.data.buckets.Equippable;
        for (let i = 0; i < inventoryDataResponse.length; i++)
        {
            const currentCharacterEquipment = this.scope.characterData[characterNumberResponse].equipmentData;
            for (let j = 0; j < currentCharacterEquipment.length; j++)
            {
                if (inventoryDataResponse[i].items[0].itemHash === currentCharacterEquipment[j].itemHash)
                {
                    const bucketHash = <IBucketHash>this.getHashObject(this.destinyDataService.getBucketHashes(), inventoryDataResponse[i].bucketHash);
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

    private searchPlayer = (searchValue: string) =>
    {
        this.destinyApiService.searchPlayer(searchValue).then(
            (data: any) => this.handleSearchPlayerResponse(data.data),
            () => this.scope.errorMessage = "An Error has occured while searching for player");
    }

    private rowClicked = (itemHash: any) =>
    {
        //window.open(`${this.destinyDataService.getDestinyLinks().databases.destinydb}${itemHash}`, "_blank");
    }

    private mouseOverRow(row: any)
    {
        console.log("row");
    }

    private getHashObject = (hashArray: Array<IHash>, hash: number): IHash =>
    {
        for (let i = 0; i < hashArray.length; i++)
        {
            if (hashArray[i].hash === hash)
                return hashArray[i];
        }
        console.warn(`Warning: Unknown Hash: ${hash}`);
        return null;
    }

    private getPlatformString(platform: number): string
    {
        return platform === PLATFORM.Xbox ? PLATFORM[PLATFORM.Xbox] : PLATFORM[PLATFORM.Psn];
    }

    private getPlatformNumber(platform: string): number
    {
        return platform === PLATFORM[PLATFORM.Xbox] ? PLATFORM.Xbox : PLATFORM.Psn;
    }

    private getCharacterOverviewObject = (charactersDataList: Array<any>): Array<string> =>
    {
        const raceHashes = this.destinyDataService.getRaceHashes();
        const classHashes = this.destinyDataService.getClassHashes();
        const genderHashes = this.destinyDataService.getGenderHashes();
        let characterOverviewObject: Array<string> = [];

        for (let i = 0; i < charactersDataList.length; i++)
        {
            const characterOneRace = this.getHashObject(raceHashes, charactersDataList[i].characterBase.raceHash).value;
            const characterOneClass = this.getHashObject(classHashes, charactersDataList[i].characterBase.classHash).value;
            const characterOneGender = this.getHashObject(genderHashes, charactersDataList[i].characterBase.genderHash).value;
            const characterOneLevel = charactersDataList[i].characterLevel;
            const characterOverview = `${characterOneLevel} ${characterOneRace} ${characterOneClass} - ${characterOneGender}`;
            characterOverviewObject.push(characterOverview);
        }

        return characterOverviewObject;
    }

    private getEquipmentDataObject = (charactersDataList: Array<any>): Array<Array<IEquipmentData>> =>
    {
        const unorderedList: Array<Array<IEquipmentData>> = [];

        for (let i = 0; i < charactersDataList.length; i++)
        {
            unorderedList.push(charactersDataList[i].characterBase.peerView.equipment);
        }
        let orderedList: Array<Array<IEquipmentData>> = [[], [], []];
        //re-order list
        for (let i = 0; i < charactersDataList.length; i++)
        {
            for (let j = 0; j < unorderedList[i].length; j++)
            {
                const orderedListPosition = this.destinyDataService.getItemOrderValue(j);
                orderedList[i][j] = unorderedList[i][orderedListPosition];
            }
        }
        return orderedList;
    }
}

//#endregion

masterSite.controller("destinyPlayerController", ["$scope", "destinyApiService",
    "destinyDataService", "$stateParams", "$state", DestinyPlayerController]); 
