///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyHomeScope.ts"/>

class DestinyHomeController
{
    private random: number;

    constructor(private scope: IDestinyHomeScope, private destinyApiService: DestinyApiService, private $state: any)
    {
        scope.VM = this;
        scope.platform = 1;
        //Service API Calls
        //destinyApiService.searchPlayer(platform, displayName).then((data: any) => this.handleSearchPlayerResponse(data.data));
    }

    private searchPlayer(platform: number, displayName: string)
    {
        this.$state.go('destinyDetails', { platform: this.scope.platform, displayName: this.scope.displayName });
        //this.destinyApiService.searchPlayer(platform, displayName).then((data: any) => this.handleSearchPlayerResponse(data.data));
        //console.log("logging....");
    }
}

masterSite.controller("destinyHomeController", ["$scope", "destinyApiService", "$state", DestinyHomeController]); 
