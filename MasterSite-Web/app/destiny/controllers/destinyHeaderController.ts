///<reference path="../../app.ts"/>

class DestinyHeaderController
{
    constructor(private scope: IDestinyHeaderScope, private location: ng.ILocationService, stateParams: any)
    {
        scope.vm = this;
    }

    public isActive(viewLocation: string): boolean
    {
        const path = this.location.path();
        if (viewLocation === "/destiny/details" && path !== "/destiny")
            viewLocation = path;
        return viewLocation === path;
    }
}

interface IDestinyHeaderScope
{
    vm: DestinyHeaderController;
    platform: number;
    displayName: string;
    characterNumber: number;
}

masterSite.controller("destinyHeaderController", ["$scope", "$location", "$stateParams", DestinyHeaderController]); 
