///<reference path="../app.ts"/>
///<reference path="../services/destinyDataService.ts"/>

class TestController
{
    constructor(private scope: any, private destinyApiService: DestinyApiService, private destinyDataService: DestinyDataService, $stateParams: any, private $state: any)
    {
        scope.testing = [{ label: "one", popup: "popup one" }, { label: "two", popup: "popup two" }, { label: "three", popup: "popup three" }];
        scope.message = "test message";
        setTimeout(() => {
            scope.$apply();
            scope.$digest();
            console.log("Scope updated");
        }, 5000);
    }

}

masterSite.controller("testController", ["$scope", "destinyApiService",
    "destinyDataService", "$stateParams", "$state", TestController]); 