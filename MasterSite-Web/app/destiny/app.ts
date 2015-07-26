///<reference path="../../Scripts/definitelytyped/angular.d.ts"/>
///<reference path="../../Scripts/definitelytyped/angular-ui-router.d.ts"/>

var masterSite = angular.module("masterSite", ["ui.router", "ngAnimate"]);

masterSite.config(["$stateProvider", "$urlRouterProvider", ($stateProvider: any, $urlRouterProvider: any) =>
{
    $urlRouterProvider.otherwise("/player/xbox/sharpirox/1");

    //Destiny Routes
    $stateProvider
        .state("destinyPlayer", {
        url: "/player/:platform/:displayName/:characterNumber",
        templateUrl: "/app/destiny/templates/destinyPlayerTemplate.html",
        controller: "destinyPlayerController"
    });
}]);