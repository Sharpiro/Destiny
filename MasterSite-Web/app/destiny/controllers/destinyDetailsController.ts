///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyDetailsScope.ts"/>

class DestinyDetailsController {
    private random: number;

    constructor(private scope: IDestinyDetailsScope, private destinyApiService: DestinyApiService, $stateParams: any) {
        scope.VM = this;
        const platform = $stateParams.platform;;
        const displayName = $stateParams.displayName;
        
        //Service API Calls
        destinyApiService.searchPlayer(platform, displayName).then(
            (data: any) => this.handleSearchPlayerResponse(data.data),
            () => this.scope.errorMessage = "An Error has occured");
    }

    private handleSearchPlayerResponse = (data: any) => {
        var dataObject = JSON.parse(data).Response[0];
        console.log(dataObject);
        this.scope.message = dataObject;
    }
}

masterSite.controller("destinyDetailsController", ["$scope", "destinyApiService", "$stateParams", DestinyDetailsController]); 
