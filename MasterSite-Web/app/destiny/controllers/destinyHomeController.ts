///<reference path="../interfaces/iHomeScope.ts"/>

class DestinyHomeController
{
    private random: number;

    constructor(private scope: IHomeScope, private destinyApiService: DestinyApiService)
    {
        scope.VM = this;
        const platform = 1;
        const displayName = "sharpirox"; 
        
        //Service API Calls
        destinyApiService.searchPlayer(platform, displayName).then((data: any) => this.handleSearchPlayerResponse(data.data));
    }

    private searchPlayer(platform: number, displayName: string)
    {
        this.destinyApiService.searchPlayer(platform, displayName).then((data: any) => this.handleSearchPlayerResponse(data.data));
        console.log("logging....");
    }

    private handleSearchPlayerResponse = (data: any) =>
    {
        var dataObject = JSON.parse(data).Response[0];
        console.log(dataObject);
        this.scope.message = dataObject;
    }
}

masterSite.controller("destinyHomeController", ["$scope", "destinyApiService", DestinyHomeController]); 
