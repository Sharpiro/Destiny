///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyDetailsScope.ts"/>

class DestinyDetailsController
{
    private platform: number;
    private displayName: string;
    private membershipId: number;
    private characterNumber: number;

    constructor(private scope: IDestinyDetailsScope, private destinyApiService: DestinyApiService, $stateParams: any)
    {
        scope.VM = this;
        this.platform = $stateParams.platform;;
        this.displayName = $stateParams.displayName;
        this.characterNumber = $stateParams.characterNumber;
        
        //Service API Calls
        destinyApiService.searchPlayer(this.platform, this.displayName).then(
            (data: any) => this.handleSearchPlayerResponse(data.data),
            () => this.scope.errorMessage = "An Error has occured");
    }

    private handleSearchPlayerResponse = (data: any) =>
    {
        let dataObject = JSON.parse(data).Response[0];
        this.membershipId = dataObject.membershipId;
        this.scope.playerSearchData = dataObject;

        this.destinyApiService.getAccountInfo(this.platform, this.membershipId).then(
            (data: any) => this.handleGetAccountInfoResponse(data.data),
            () => this.scope.errorMessage = "An Error has occured");
    }

    private handleGetAccountInfoResponse(data: any)
    {
        let dataObject = JSON.parse(data).Response.data;
        console.log(dataObject);
        this.scope.equipmentData = dataObject.characters[this.characterNumber].characterBase.peerView.equipment;
        //this.scope.message = dataObject;

    }
}

masterSite.controller("destinyDetailsController", ["$scope", "destinyApiService", "$stateParams", DestinyDetailsController]); 
