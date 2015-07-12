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
            url: "/destiny/details/:platform/:displayName/:characterNumber",
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
            _this.membershipId = dataObject.membershipId;
            _this.scope.playerSearchData = dataObject;
            _this.destinyApiService.getAccountInfo(_this.platform, _this.membershipId).then(function (data) { return _this.handleGetAccountInfoResponse(data.data); }, function () { return _this.scope.errorMessage = "An Error has occured"; });
        };
        scope.VM = this;
        this.platform = $stateParams.platform;
        ;
        this.displayName = $stateParams.displayName;
        this.characterNumber = $stateParams.characterNumber;
        destinyApiService.searchPlayer(this.platform, this.displayName).then(function (data) { return _this.handleSearchPlayerResponse(data.data); }, function () { return _this.scope.errorMessage = "An Error has occured"; });
    }
    DestinyDetailsController.prototype.handleGetAccountInfoResponse = function (data) {
        var dataObject = JSON.parse(data).Response.data;
        console.log(dataObject);
        this.scope.equipmentData = dataObject.characters[this.characterNumber].characterBase.peerView.equipment;
    };
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
        this.scope.platformRadio = 1;
        this.scope.characterNumber = 0;
    }
    DestinyHomeController.prototype.searchPlayer = function (platform, displayName) {
        console.log("Platform: " + this.scope.platformRadio);
        this.$state.go('destinyDetails', { platform: this.scope.platformRadio, displayName: this.scope.displayName, characterNumber: this.scope.characterNumber });
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
    DestinyApiService.prototype.searchPlayer = function (platform, displayName) {
        if (platform && displayName)
            return this.$http.get("/api/DestinyApi/SearchDestinyPlayer?platform=" + platform + "&displayName=" + displayName);
        var dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    };
    DestinyApiService.prototype.getAccountInfo = function (platform, membershipId) {
        if (platform && membershipId)
            return this.$http.get("/api/DestinyApi/GetAccountInfo?platform=" + platform + "&membershipId=" + membershipId);
        var dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    };
    return DestinyApiService;
})();
masterSite.service("destinyApiService", ["$http", "$q", DestinyApiService]);
//# sourceMappingURL=appCombined.js.map