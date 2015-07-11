///<reference path="../Scripts/definitelytyped/angular.d.ts"/>
///<reference path="../Scripts/definitelytyped/angular-ui-router.d.ts"/>

var masterSite = angular.module("masterSite", ["ui.router"]);

masterSite.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider: any, $urlRouterProvider: any)
{
    $urlRouterProvider.otherwise("/destiny");

    //Destiny Routes
    $stateProvider
        .state("destinyHome", {
        url: "/destiny",
        templateUrl: "app/destiny/templates/homeTemplate.html",
        controller: "destinyHomeController"
    });
}]);