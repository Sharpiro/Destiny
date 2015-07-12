///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyHomeScope.ts"/>

class DestinyHomeController
{
    private random: number;

    constructor(private scope: IDestinyHomeScope, private destinyApiService: DestinyApiService, private $state: any)
    {
        scope.VM = this;
        this.scope.platformRadio = 1;
        this.scope.characterNumber = 0;
        //Service API Calls
    }

    private searchPlayer(platform: number, displayName: string)
    {
        console.log(`Platform: ${this.scope.platformRadio}`);
        this.$state.go('destinyDetails', { platform: this.scope.platformRadio, displayName: this.scope.displayName, characterNumber: this.scope.characterNumber });
    }
}

masterSite.controller("destinyHomeController", ["$scope", "destinyApiService", "$state", DestinyHomeController]); 
