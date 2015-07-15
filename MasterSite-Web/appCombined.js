///<reference path="../Scripts/definitelytyped/angular.d.ts"/>
///<reference path="../Scripts/definitelytyped/angular-ui-router.d.ts"/>
var masterSite = angular.module("masterSite", ["ui.router", "ngAnimate"]);
masterSite.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/destiny");
        $stateProvider
            .state("destinyHome", {
            url: "/destiny",
            templateUrl: "app/destiny/templates/destinyHomeTemplate.html",
            controller: "destinyHomeController"
        }).state("destinyPlayer", {
            url: "/destiny/player/:platform/:displayName/:characterNumber",
            templateUrl: "app/destiny/templates/destinyPlayerTemplate.html",
            controller: "destinyPlayerController",
        });
    }]);
///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyHomeScope.ts"/>
var DestinyHeaderController = (function () {
    function DestinyHeaderController(scope, location, stateParams) {
        this.scope = scope;
        this.location = location;
        scope.vm = this;
    }
    DestinyHeaderController.prototype.isActive = function (viewLocation) {
        var path = this.location.path();
        if (viewLocation === "/destiny/details" && path !== "/destiny")
            viewLocation = path;
        return viewLocation === path;
    };
    return DestinyHeaderController;
})();
masterSite.controller("destinyHeaderController", ["$scope", "$location", "$stateParams", DestinyHeaderController]);
///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyHomeScope.ts"/>
var DestinyHomeController = (function () {
    function DestinyHomeController(scope, destinyApiService, $state) {
        this.scope = scope;
        this.destinyApiService = destinyApiService;
        this.$state = $state;
        scope.VM = this;
        this.scope.displayName = "sharpirox";
        this.scope.platform = PLATFORM.xbox;
        this.scope.characterNumber = 1;
    }
    DestinyHomeController.prototype.searchPlayer = function (platform, displayName) {
        this.$state.go('destinyPlayer', { platform: PLATFORM[this.scope.platform], displayName: this.scope.displayName, characterNumber: this.scope.characterNumber });
    };
    return DestinyHomeController;
})();
masterSite.controller("destinyHomeController", ["$scope", "destinyApiService", "$state", DestinyHomeController]);
///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyPlayerScope.ts"/>
/////<reference path="../services/destinyDataService.ts"/>
var DestinyPlayerController = (function () {
    function DestinyPlayerController(scope, destinyApiService, destinyDataService, $stateParams) {
        var _this = this;
        this.scope = scope;
        this.destinyApiService = destinyApiService;
        this.destinyDataService = destinyDataService;
        this.toggleState = function () {
            _this.scope.state = !_this.scope.state;
            console.log(_this.scope.state);
            menubar.visible = false;
        };
        this.handleSearchPlayerResponse = function (data) {
            var dataResponse = JSON.parse(data).Response[0];
            if (!dataResponse) {
                _this.scope.errorMessage = "Error: Player not found";
                return;
            }
            _this.membershipId = dataResponse.membershipId || null;
            _this.scope.playerSearchData = dataResponse;
            _this.destinyApiService.getAccountInfo(_this.getPlatformNumber(_this.scope.platform), _this.membershipId).then(function (innerData) { return _this.handleGetAccountInfoResponse(innerData.data); }, function () { return _this.scope.errorMessage = "An Error has occured while getting account info"; });
        };
        this.handleGetAccountInfoResponse = function (data) {
            var accountInfoData = JSON.parse(data).Response.data;
            var charactersOverview = [
                { "level": accountInfoData.characters[0].characterLevel, "className": _this.matchDestinyHashes(_this.destinyDataService.getClassHashes(), accountInfoData.characters[0].characterBase.classHash) },
                { "level": accountInfoData.characters[1].characterLevel, "className": _this.matchDestinyHashes(_this.destinyDataService.getClassHashes(), accountInfoData.characters[1].characterBase.classHash) },
                { "level": accountInfoData.characters[2].characterLevel, "className": _this.matchDestinyHashes(_this.destinyDataService.getClassHashes(), accountInfoData.characters[2].characterBase.classHash) }];
            var fullCharacterData = accountInfoData.characters[_this.scope.characterNumber];
            if (!fullCharacterData) {
                _this.scope.errorMessage = "Error: Character not found";
                return;
            }
            var equipmentData = fullCharacterData.characterBase.peerView.equipment;
            var className = _this.matchDestinyHashes(_this.destinyDataService.getClassHashes(), fullCharacterData.characterBase.classHash);
            var raceName = _this.matchDestinyHashes(_this.destinyDataService.getRaceHashes(), fullCharacterData.characterBase.raceHash);
            var level = fullCharacterData.characterLevel;
            _this.scope.characterData = { charactersOverview: charactersOverview, equipmentData: equipmentData, className: className, raceName: raceName, level: level };
        };
        this.matchDestinyHashes = function (hashArray, classHash) {
            for (var i = 0; i < hashArray.length; i++) {
                if (hashArray[i].hash === classHash)
                    return hashArray[i].value;
            }
            console.log("Error: Unknown Hash: " + classHash);
            return null;
        };
        scope.VM = this;
        scope.platform = $stateParams.platform;
        scope.displayName = $stateParams.displayName;
        scope.characterNumber = $stateParams.characterNumber - 1;
        scope.state = true;
        destinyApiService.searchPlayer(this.getPlatformNumber(scope.platform), scope.displayName).then(function (data) { return _this.handleSearchPlayerResponse(data.data); }, function () { return _this.scope.errorMessage = "An Error has occured while searching for player"; });
    }
    DestinyPlayerController.prototype.getPlatformNumber = function (platformName) {
        return this.scope.platform === PLATFORM[1] ? PLATFORM.xbox : PLATFORM.playstation;
    };
    return DestinyPlayerController;
})();
masterSite.controller("destinyPlayerController", ["$scope", "destinyApiService", "destinyDataService", "$stateParams", DestinyPlayerController]);
///<reference path="../../app.ts"/>
var SidebarDirective = (function () {
    function SidebarDirective() {
        this.scope = {};
        this.link = function (scope, element, attrs) {
            scope.$watch(attrs.sidebar, function (newVal) {
                if (newVal) {
                    element.addClass("show");
                    return;
                }
                element.removeClass("show");
            });
        };
    }
    SidebarDirective.factory = function () {
        var directive = function () {
            return new SidebarDirective();
        };
        directive["$inject"] = [];
        return directive;
    };
    return SidebarDirective;
})();
masterSite.directive("sidebar", SidebarDirective.factory());
var PLATFORM;
(function (PLATFORM) {
    PLATFORM[PLATFORM["xbox"] = 1] = "xbox";
    PLATFORM[PLATFORM["playstation"] = 2] = "playstation";
})(PLATFORM || (PLATFORM = {}));
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
///<reference path="../../app.ts"/>
///<reference path="../interfaces/IDestinyDataService.ts"/>
var DestinyDataService = (function () {
    function DestinyDataService($http, $q) {
        this.$http = $http;
        this.$q = $q;
        this.classHashes = [
            { "hash": 3655393761, "value": "Titan" },
            { "hash": 671679327, "value": "Hunter" },
            { "hash": 2271682572, "value": "Warlock" }];
        this.raceHashes = [
            { "hash": 898834093, "value": "Exo" },
            { "hash": 2803282938, "value": "Awoken" },
            { "hash": 3887404748, "value": "Human" }];
    }
    DestinyDataService.prototype.getClassHashes = function () {
        return this.classHashes;
    };
    DestinyDataService.prototype.getRaceHashes = function () {
        return this.raceHashes;
    };
    return DestinyDataService;
})();
masterSite.service("destinyDataService", ["$http", "$q", DestinyDataService]);
//# sourceMappingURL=appCombined.js.map