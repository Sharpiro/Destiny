///<reference path="../app.ts"/>
///<reference path="../interfaces/IDestinyHomeScope.ts"/>

class DestinyHomeController
{
    private random: number;

    constructor(private scope: IDestinyHomeScope, private destinyApiService: DestinyApiService, private $state: any)
    {
        scope.VM = this;
        this.scope.displayName = "sharpirox";
        this.scope.platform = PLATFORM.xbox;
        this.scope.characterNumber = 1;
        this.scope.message = "who wins?";
        //Service API Calls
    }

    private searchPlayer(platform: number, displayName: string)
    {
        this.$state.go("destinyPlayer", { platform: PLATFORM[this.scope.platform], displayName: this.scope.displayName, characterNumber: this.scope.characterNumber });
    }
}

masterSite.controller("destinyHomeController", ["$scope", "destinyApiService", "$state", DestinyHomeController]); 
