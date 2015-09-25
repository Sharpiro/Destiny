///<reference path="../app.ts"/>

class DestinyHeaderController
{

    private toggled = true;
    private myElement = angular.element(document.querySelector('.side-nav'));
    private myFunElement = angular.element(document.querySelector('body'));
    private myPageElement = angular.element(document.querySelector('#page-wrapper'));

    constructor(private scope: IDestinyHeaderScope, private location: ng.ILocationService, stateParams: any)
    {
        scope.vm = this;
    }

    private slideOut = () =>
    {
        console.log("slide all Out");
        this.myElement.addClass('slideOut');
        this.myElement.removeClass('slideIn');
        this.myPageElement.addClass('slideOut');
        this.myPageElement.removeClass('slideIn');
    }

    private slideIn = () =>
    {
        console.log("slide all In");
        this.myElement.addClass('slideIn');
        this.myElement.removeClass('slideOut');
        this.myPageElement.addClass('slideIn');
        this.myPageElement.removeClass('slideOut');
    }

    private toggleHideAll = () =>
    {
        console.log("toggling all");
        this.myElement.removeClass('side-nav-partial');
        this.myElement.toggleClass('toggle');
        this.toggled = !this.toggled;
        this.myPageElement.toggleClass('toggle');
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
    message: string;
}

masterSite.controller("destinyHeaderController", ["$scope", "$location", "$stateParams", DestinyHeaderController]); 
