///<reference path="../Scripts/definitelytyped/angular.d.ts"/>
///<reference path="../Scripts/definitelytyped/angular-ui-router.d.ts"/>

var destiny = angular.module("destiny", ["ui.router", "ngAnimate", "ui.bootstrap"]);

destiny.config(["$stateProvider", "$urlRouterProvider", ($stateProvider: any, $urlRouterProvider: any) =>
{
    $urlRouterProvider.otherwise("/player/xbox/sharpirox");
    //$urlRouterProvider.otherwise("/test");

    //Destiny Routes
    $stateProvider
        .state("destinyPlayer", {
            url: "/player/:platform/:displayName",
            templateUrl: "/app/templates/destinyPlayerTemplate.html",
            controller: "destinyPlayerController"
        })
        .state("test", {
            url: "/test",
            templateUrl: "/app/templates/testTemplate.html",
            controller: "testController"
        });
}]);