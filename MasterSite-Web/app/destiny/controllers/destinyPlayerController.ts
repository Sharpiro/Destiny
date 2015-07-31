///<reference path="../app.ts"/>
///<reference path="../services/destinyDataService.ts"/>

class DestinyPlayerController
{
    private membershipId: number;
    private maxCharacterDetails = 3;

    constructor(private scope: IDestinyPlayerScope, private destinyApiService: DestinyApiService, private destinyDataService: DestinyDataService, $stateParams: any, private $state: any)
    {
        scope.VM = this;
        scope.platform = $stateParams.platform;
        scope.displayName = $stateParams.displayName;
        //scope.characterData.equipmentData = [[{}], [{}], [{}];

        
        //Service API Calls
        destinyApiService.searchPlayer(this.getPlatformNumber(scope.platform), scope.displayName).then(
            (data: any) => this.handleSearchPlayerResponse(data.data),
            () => this.scope.errorMessage = "An Error has occured while searching for player");
    }

    //#region API Call Wrappers

    private getEquipmentInfo = (equipmentList: Array<Array<IEquipmentData>>) =>
    {
        for (let i = 0; i < this.maxCharacterDetails; i++)
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
        for (let i = 0; i < this.maxCharacterDetails; i++)
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
        this.destinyApiService.getAccountTriumphs(this.getPlatformNumber(this.scope.platform), this.membershipId).then(
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
        this.scope.characterData.equipmentData[listNumber][listPosition].icon = itemData.icon;
        this.scope.characterData.equipmentData[listNumber][listPosition].itemName = itemData.itemName;
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
                if (inventoryDataResponse[i].items[0].itemHash === currentCharacterEquipment[j].itemHash)
                {
                    const bucketHash = <IBucketHash>this.getHashObject(this.destinyDataService.getBucketHashes(), inventoryDataResponse[i].bucketHash);
                    if (bucketHash.category === ITEMCATEGORY.Weapon)
                    {
                        const itemDetails: IEquipmentDataDetails = {
                            primaryStat: inventoryDataResponse[i].items[0].primaryStat.value,
                            damageType: inventoryDataResponse[i].items[0].damageType
                        };
                        this.scope.characterData.equipmentData[characterNumberResponse][j].details = itemDetails;
                    }
                    else if (bucketHash.category === ITEMCATEGORY.Armor)
                    {
                        if (inventoryDataResponse[i].items[0].stats[0])
                        {
                            const itemDetails: IEquipmentDataDetails = {
                                primaryStat: inventoryDataResponse[i].items[0].stats[0].value,
                                damageType: null
                            };
                            this.scope.characterData.equipmentData[characterNumberResponse][j].details = itemDetails;
                        }
                    }
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
        const characterOneRace = this.getHashObject(raceHashes, charactersDataList[0].characterBase.raceHash).value;
        const characterTwoRace = this.getHashObject(raceHashes, charactersDataList[1].characterBase.raceHash).value;
        const characterThreeRace = this.getHashObject(raceHashes, charactersDataList[2].characterBase.raceHash).value;
        const characterOneClass = this.getHashObject(classHashes, charactersDataList[0].characterBase.classHash).value;
        const characterTwoClass = this.getHashObject(classHashes, charactersDataList[1].characterBase.classHash).value;
        const characterThreeClass = this.getHashObject(classHashes, charactersDataList[2].characterBase.classHash).value;
        const characterOneGender = this.getHashObject(genderHashes, charactersDataList[0].characterBase.genderHash).value;
        const characterTwoGender = this.getHashObject(genderHashes, charactersDataList[1].characterBase.genderHash).value;
        const characterThreeGender = this.getHashObject(genderHashes, charactersDataList[2].characterBase.genderHash).value;
        return [
            `${charactersDataList[0].characterLevel} ${characterOneRace} ${characterOneClass} - ${characterOneGender}`,
            `${charactersDataList[1].characterLevel} ${characterTwoRace} ${characterTwoClass} - ${characterTwoGender}`,
            `${charactersDataList[2].characterLevel} ${characterThreeRace} ${characterThreeClass} - ${characterThreeGender}`
        ];
    }

    private getEquipmentDataObject = (charactersDataList: Array<any>): Array<Array<IEquipmentData>> =>
    {
        const unorderedList = [
            charactersDataList[0].characterBase.peerView.equipment,
            charactersDataList[1].characterBase.peerView.equipment,
            charactersDataList[2].characterBase.peerView.equipment
        ];
        let orderedList: any = [[], [], []];
        //re-order list
        for (let i = 0; i < this.maxCharacterDetails; i++)
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
