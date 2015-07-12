///<reference path="../Scripts/definitelytyped/angular.d.ts"/>
///<reference path="../Scripts/definitelytyped/angular-ui-router.d.ts"/>
var masterSite = angular.module("masterSite", ["ui.router"]);
masterSite.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/destiny");
        $stateProvider
            .state("destinyHome", {
            url: "/destiny",
            templateUrl: "app/destiny/templates/destinyHomeTemplate.html",
            controller: "destinyHomeController"
        }).state("destinyDetails", {
            url: "/destinydetails/:platform/:displayName",
            templateUrl: "app/destiny/templates/destinyDetailsTemplate.html",
            controller: "destinyDetailsController",
        });
    }]);
///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyDetailsScope.ts"/>
var DestinyDetailsController = (function () {
    function DestinyDetailsController(scope, destinyApiService, $stateParams) {
        var _this = this;
        this.scope = scope;
        this.destinyApiService = destinyApiService;
        this.handleSearchPlayerResponse = function (data) {
            var dataObject = JSON.parse(data).Response[0];
            console.log(dataObject);
            _this.scope.message = dataObject;
        };
        scope.VM = this;
        var platform = $stateParams.platform;
        ;
        var displayName = $stateParams.displayName;
        destinyApiService.searchPlayer(platform, displayName).then(function (data) { return _this.handleSearchPlayerResponse(data.data); }, function () { return _this.scope.errorMessage = "An Error has occured"; });
    }
    return DestinyDetailsController;
})();
masterSite.controller("destinyDetailsController", ["$scope", "destinyApiService", "$stateParams", DestinyDetailsController]);
///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyHomeScope.ts"/>
var DestinyHomeController = (function () {
    function DestinyHomeController(scope, destinyApiService, $state) {
        this.scope = scope;
        this.destinyApiService = destinyApiService;
        this.$state = $state;
        scope.VM = this;
        scope.platform = 1;
    }
    DestinyHomeController.prototype.searchPlayer = function (platform, displayName) {
        this.$state.go('destinyDetails', { platform: this.scope.platform, displayName: this.scope.displayName });
    };
    return DestinyHomeController;
})();
masterSite.controller("destinyHomeController", ["$scope", "destinyApiService", "$state", DestinyHomeController]);
///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyApiService.ts"/>
var DestinyApiService = (function () {
    function DestinyApiService($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    DestinyApiService.prototype.test = function () {
        var deferred = this.$q.defer();
        deferred.resolve();
        return deferred.promise;
    };
    DestinyApiService.prototype.searchPlayer = function (platform, displayName) {
        if (platform && displayName)
            return this.$http.get("/api/DestinyApi/One?platform=" + platform + "&displayName=" + displayName);
        var dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    };
    return DestinyApiService;
})();
masterSite.service("destinyApiService", ["$http", "$q", DestinyApiService]);
//# sourceMappingURL=appCombined.js.map