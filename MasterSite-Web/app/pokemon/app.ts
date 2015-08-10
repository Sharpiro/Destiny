///<reference path="../../Scripts/definitelytyped/angular.d.ts"/>
///<reference path="../../Scripts/definitelytyped/angular-ui-router.d.ts"/>

var pokeApp = angular.module("pokeApp", ["ui.router", "ngAnimate", "ui.bootstrap"]);

pokeApp.config(["$stateProvider", "$urlRouterProvider", ($stateProvider: any, $urlRouterProvider: any) =>
{
    $urlRouterProvider.otherwise("/test");

    //pokemon Routes
    $stateProvider
        .state("test", {
            url: "/test",
            templateUrl: "/app/pokemon/templates/pokemonTemplate.html",
            controller: "pokemonController"
        });
}]);