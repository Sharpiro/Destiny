///<reference path="../../Scripts/definitelytyped/angular.d.ts"/>
///<reference path="../../Scripts/definitelytyped/angular-ui-router.d.ts"/>
var masterSite = angular.module("masterSite", ["ui.router", "ngAnimate", "ui.bootstrap"]);
masterSite.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/player/xbox/sharpirox");
        $stateProvider
            .state("destinyPlayer", {
            url: "/player/:platform/:displayName",
            templateUrl: "/app/destiny/templates/destinyPlayerTemplate.html",
            controller: "destinyPlayerController"
        })
            .state("test", {
            url: "/test",
            templateUrl: "/app/destiny/templates/testTemplate.html",
            controller: "testController"
        });
    }]);
///<reference path="../app.ts"/>
var DestinyHeaderController = (function () {
    function DestinyHeaderController(scope, location, stateParams) {
        var _this = this;
        this.scope = scope;
        this.location = location;
        this.toggled = true;
        this.myElement = angular.element(document.querySelector('.side-nav'));
        this.myFunElement = angular.element(document.querySelector('body'));
        this.myPageElement = angular.element(document.querySelector('#page-wrapper'));
        this.slideOut = function () {
            console.log("slide all Out");
            _this.myElement.addClass('slideOut');
            _this.myElement.removeClass('slideIn');
            _this.myPageElement.addClass('slideOut');
            _this.myPageElement.removeClass('slideIn');
        };
        this.slideIn = function () {
            console.log("slide all In");
            _this.myElement.addClass('slideIn');
            _this.myElement.removeClass('slideOut');
            _this.myPageElement.addClass('slideIn');
            _this.myPageElement.removeClass('slideOut');
        };
        this.toggleHideAll = function () {
            console.log("toggling all");
            _this.myElement.removeClass('side-nav-partial');
            _this.myElement.toggleClass('toggle');
            _this.toggled = !_this.toggled;
            _this.myPageElement.toggleClass('toggle');
        };
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
///<reference path="../app.ts"/>
var DestinyDataService = (function () {
    function DestinyDataService($http, $q) {
        var _this = this;
        this.$http = $http;
        this.$q = $q;
        this.bungieBaseUrl = "http://bungie.net";
        this.bungieBaseUrlSecure = "https://bungie.net";
        this.currentPlayerData = {
            membershipId: null,
            displayName: null,
            platform: null,
            platformIcon: null
        };
        this.destinyLinks = {
            icons: {
                damageTypeIcons: {
                    regular: {
                        arc: "/content/images/destiny/damageTypeIcons/regular/2_arc.png",
                        solar: "/content/images/destiny/damageTypeIcons/regular/3_solar.png",
                        void: "/content/images/destiny/damageTypeIcons/regular/4_void.png"
                    },
                    transparent: {
                        arc: "/content/images/destiny/damageTypeIcons/transparent/2_arc.png",
                        solar: "/content/images/destiny/damageTypeIcons/transparent/3_solar.png",
                        void: "/content/images/destiny/damageTypeIcons/transparent/4_void.png"
                    }
                },
                booleanIcons: {
                    trueIcon: "/content/images/destiny/boolean/true.png",
                    falseIcon: "/content/images/destiny/boolean/false.png"
                }
            },
            databases: {
                destinydb: "http://www.destinydb.com/items/"
            }
        };
        this.classHashes = [
            { "hash": 3655393761, "value": "Titan" },
            { "hash": 671679327, "value": "Hunter" },
            { "hash": 2271682572, "value": "Warlock" }
        ];
        this.raceHashes = [
            { "hash": 898834093, "value": "Exo" },
            { "hash": 2803282938, "value": "Awoken" },
            { "hash": 3887404748, "value": "Human" }
        ];
        this.genderHashes = [
            { "hash": 3111576190, "value": "Male" },
            { "hash": 2204441813, "value": "Female" }
        ];
        this.statHashes = [
            { "hash": 368428387, "value": "Attack" },
            { "hash": 4284893193, "value": "Rate of Fire" },
            { "hash": 4043523819, "value": "Impact" },
            { "hash": 1240592695, "value": "Range" },
            { "hash": 155624089, "value": "Stability" },
            { "hash": 4188031367, "value": "Reload" },
            { "hash": 3871231066, "value": "Magazine" },
            { "hash": -100, "value": "Charge Rate" }
        ];
        this.popularItems = [
            { starred: false, hash: 3118679308, category: ITEMCATEGORY.Weapon, value: "Ice Breaker", icon: "/common/destiny_content/icons/c1bc7a09b4042a26e0bbfe36fab78842.jpg" },
            { starred: false, hash: 1274330687, category: ITEMCATEGORY.Weapon, value: "Gjallarhorn", icon: "/common/destiny_content/icons/eb8377390504838c0190d8d56e70d28e.jpg" },
            { starred: false, hash: 1550781863, category: ITEMCATEGORY.Weapon, value: "The Scholar (Adept)", icon: "/common/destiny_content/icons/050ef13595025cf39b7f96456efeb6b2.jpg" },
            { starred: false, hash: 2344494719, category: ITEMCATEGORY.Weapon, value: "Lord of Wolves", icon: "/common/destiny_content/icons/ee5a93a819b51f395781a3175efa2005.jpg" },
            { starred: false, hash: 2612834019, category: ITEMCATEGORY.Weapon, value: "Queenbreakers' Bow", icon: "/common/destiny_content/icons/c41001ba36e4a32cd223573f1a150e81.jpg" },
            { starred: false, hash: 2809229973, category: ITEMCATEGORY.Weapon, value: "Necrochasm", icon: "/common/destiny_content/icons/d5f5eff03eb6952beeb78bda5316d359.jpg" },
            { starred: false, hash: 346443849, category: ITEMCATEGORY.Weapon, value: "Vex Mythoclast", icon: "/common/destiny_content/icons/bb7c710c5c143ff80997fdfb7b1216c3.jpg" },
            { starred: true, hash: 3688594188, category: ITEMCATEGORY.Weapon, value: "Boolean Gemini", icon: "/common/destiny_content/icons/2fc2da2b4dc4c0a4ca034a8cf0a5df54.jpg" },
            { starred: true, hash: 3675783241, category: ITEMCATEGORY.Weapon, value: "The Chaperone", icon: "/common/destiny_content/icons/31ebf0d88cfa310be9aa7ab5fb25c4c4.jpg" },
            { starred: true, hash: 3012398148, category: ITEMCATEGORY.Weapon, value: "Telesto", icon: "/common/destiny_content/icons/0f282e925a856d0d77924cf8d3e67ba2.jpg" },
            { starred: true, hash: 255654879, category: ITEMCATEGORY.Weapon, value: "Zhalo Supercell", icon: "/common/destiny_content/icons/4b485eff91fb941b12a69c9f18191068.jpg" },
            { starred: true, hash: 2748609458, category: ITEMCATEGORY.Weapon, value: "Fabian Strategy", icon: "/common/destiny_content/icons/345b954d6e650201b93942bd332ddcf2.jpg" },
            { starred: true, hash: 552354419, category: ITEMCATEGORY.Weapon, value: "Ace of Spades", icon: "/common/destiny_content/icons/5457f39e4bf30f875d0a445d5b234af7.jpg" },
            { starred: true, hash: 803312564, category: ITEMCATEGORY.Weapon, value: "Tlaloc", icon: "/common/destiny_content/icons/4e9c55ea26034047aa07823c9c6c7689.jpg" },
            { starred: true, hash: 987423912, category: ITEMCATEGORY.Weapon, value: "The First Curse", icon: "/common/destiny_content/icons/e6039a08ae23d6853651154a5397d015.jpg" },
            { starred: true, hash: 3227022823, category: ITEMCATEGORY.Weapon, value: "Hereafter", icon: "/common/destiny_content/icons/f680592704842cba76aec140291ab7db.jpg" },
            { starred: true, hash: 4100639362, category: ITEMCATEGORY.Weapon, value: "Bolt-Caster", icon: "/common/destiny_content/icons/29e92609abd13888c9ef0aa1660dd6e6.jpg" },
            { starred: true, hash: 4100639364, category: ITEMCATEGORY.Weapon, value: "Dark-Drinker", icon: "/common/destiny_content/icons/2c963ee0f41829ef361c71560bd9a74c.jpg" },
            { starred: true, hash: 4100639365, category: ITEMCATEGORY.Weapon, value: "Raze-Lighter", icon: "/common/destiny_content/icons/c217646ddd8c12674126633cc4a51481.jpg" },
            { starred: true, hash: 3688594189, category: ITEMCATEGORY.Weapon, value: "Touch of Malice", icon: "/common/destiny_content/icons/5c889853185590c437899711566a4771.jpg" },
            { starred: false, hash: 4100639363, category: ITEMCATEGORY.Weapon, value: "Void Edge", icon: "/common/destiny_content/icons/f9d8242f2f6ad362cbde98887eabae6e.jpg" },
            { starred: true, hash: 3227022822, category: ITEMCATEGORY.Weapon, value: "Black Spindle", icon: "/common/destiny_content/icons/5ba84f54745b74a1099608a29d2a974f.jpg" },
            { starred: true, hash: 2201079123, category: ITEMCATEGORY.Weapon, value: "Silence of A'arn", icon: "/common/destiny_content/icons/4cb0affbcfcd7e97320291b1ecd13be4.jpg" },
            { starred: true, hash: 2536361593, category: ITEMCATEGORY.Weapon, value: "Smite of Merain", icon: "/common/destiny_content/icons/6c6d5be53bc12ee5b669a328b7a075f0.jpg" },
            { starred: true, hash: 3042333086, category: ITEMCATEGORY.Weapon, value: "Midha's Reckoning", icon: "/common/destiny_content/icons/c3ecb9d6fb9ca71dedcb236474db4917.jpg" },
            { starred: true, hash: 1397524040, category: ITEMCATEGORY.Weapon, value: "Elulim's Frenzy", icon: "/common/destiny_content/icons/160234fe43be0c031203ad17f8acdc46.jpg" },
            { starred: true, hash: 3012398149, category: ITEMCATEGORY.Weapon, value: "Sleeper Simulant", icon: "/common/destiny_content/icons/01e92aa9288da062ef7cd735e6b25909.jpg" }
        ];
        this.itemOrder = [0, 6, 7, 8, 1, 2, 3, 4, 5, 15, 11, 10, 9, 13, 12, 14];
        this.accountTriumphs = {
            yearOne: [
                { title: "Apprentice of Light", description: "A character reached the maximum level" },
                { title: "Light of the Garden", description: "Defeated the dark heart of the Black Garden" },
                { title: "Light in the Dark", description: "Prevented the summoning of Crota's Soul" },
                { title: "Light of the Reef", description: "Captured Skolas in the Vex Citadel" },
                { title: "Bane of Skolas", description: "Defeated Prison of Elders on Hard Difficulty" },
                { title: "Bane of Atheon", description: "Defeated Atheon on Hard Difficulty" },
                { title: "Bane of Crota", description: "Defeated Crota on Hard Difficulty" },
                { title: "Public Servant", description: "Completed 50 Public Events" },
                { title: "Crucible Gladiator", description: "Won 100 Crucible Matches" },
                { title: "Chest Hunter", description: "Found all Golden Chests" }
            ]
        };
        this.bucketHashes = [
            { hash: 3284755031, value: "Subclass", category: null },
            { hash: 1498876634, value: "Primary", category: ITEMCATEGORY.Weapon },
            { hash: 2465295065, value: "Special", category: ITEMCATEGORY.Weapon },
            { hash: 953998645, value: "Heavy", category: ITEMCATEGORY.Weapon },
            { hash: 3448274439, value: "Head", category: ITEMCATEGORY.Armor },
            { hash: 3551918588, value: "Hands", category: ITEMCATEGORY.Armor },
            { hash: 14239492, value: "Chest", category: ITEMCATEGORY.Armor },
            { hash: 20886954, value: "Legs", category: ITEMCATEGORY.Armor },
            { hash: 1585787867, value: "Class Item", category: ITEMCATEGORY.Armor },
            { hash: 434908299, value: "Artifact", category: ITEMCATEGORY.Armor },
            { hash: 4023194814, value: "Ghost Shell", category: ITEMCATEGORY.Armor },
            { hash: 2025709351, value: "Sparrow", category: ITEMCATEGORY.Misc },
            { hash: 284967655, value: "Ship", category: ITEMCATEGORY.Misc },
            { hash: 2973005342, value: "Shader", category: ITEMCATEGORY.Misc },
            { hash: 4274335291, value: "Emblem", category: ITEMCATEGORY.Misc },
            { hash: 3054419239, value: "Emotes", category: ITEMCATEGORY.Misc }
        ];
        this.damageTypeHahes = [
            { hash: 1498876634, value: "Arc", category: DAMAGETYPE.Arc }
        ];
        this.getClassHashes = function () {
            return _this.classHashes;
        };
        this.getRaceHashes = function () {
            return _this.raceHashes;
        };
        this.getGenderHashes = function () {
            return _this.genderHashes;
        };
        this.getStatHashes = function () {
            return _this.statHashes;
        };
        this.getItemOrderValue = function (inputNumber) {
            return _this.itemOrder[inputNumber];
        };
        this.getAccountTriumphs = function () {
            return _this.accountTriumphs;
        };
        this.getBucketHashes = function () {
            return _this.bucketHashes;
        };
        this.getDestinyLinks = function () {
            return _this.destinyLinks;
        };
        this.getStoredPlayerData = function () {
            return _this.currentPlayerData;
        };
        this.setStoredPlayerData = function (accountDetails) {
            _this.currentPlayerData = accountDetails;
        };
        this.getPopularItems = function () {
            return _this.popularItems;
        };
    }
    return DestinyDataService;
})();
masterSite.service("destinyDataService", ["$http", "$q", DestinyDataService]);
///<reference path="../app.ts"/>
///<reference path="../services/destinyDataService.ts"/>
var DestinyPlayerController = (function () {
    function DestinyPlayerController(scope, destinyApiService, destinyDataService, $stateParams, $state, destinyBlService, sharedFunctionsService) {
        var _this = this;
        this.scope = scope;
        this.destinyApiService = destinyApiService;
        this.destinyDataService = destinyDataService;
        this.$state = $state;
        this.destinyBlService = destinyBlService;
        this.sharedFunctionsService = sharedFunctionsService;
        this.getEquipmentInfo = function (characterDataList) {
            for (var i = 0; i < characterDataList.length; i++) {
                var currentEquipmentList = characterDataList[i].equipmentData;
                for (var j = 0; j < characterDataList[i].equipmentData.length; j++) {
                    _this.destinyApiService.getItem(currentEquipmentList[j].itemHash, i, j).then(function (data) {
                        _this.destinyBlService.handleGetItemResponse(data.data, _this.scope.characterData);
                    });
                }
            }
        };
        this.getCharactersInventory = function (charactersData) {
            for (var i = 0; i < charactersData.length; i++) {
                _this.destinyApiService.getCharacterInventory(_this.scope.accountDetails.platform, _this.scope.accountDetails.membershipId, charactersData[i].characterId, i).then(function (data) {
                    _this.destinyBlService.handleGetCharactersInventoryResponse(data.data, _this.scope.characterData);
                    var uniqueEquippedWeapons = _this.destinyBlService.handleLegendaries(data.data.Response.Items);
                    var concatArray = _this.scope.weaponScore.concat(uniqueEquippedWeapons);
                    _this.scope.weaponScore = _this.getDistinct(concatArray);
                });
            }
        };
        this.searchPlayer = function (searchValue, platform) {
            _this.destinyApiService.searchPlayer(searchValue, platform).then(function (data) {
                _this.scope.accountDetails = _this.destinyBlService.handleSearchPlayerResponse(data.data);
                _this.$state.go("destinyPlayer", {
                    platform: _this.getPlatformString(_this.scope.accountDetails.platform),
                    displayName: _this.scope.accountDetails.displayName
                }, { reload: true });
            }, function (data) { return _this.setPageError(data); });
        };
        this.rowClicked = function (itemHash) {
            var temp = _this.scope.weaponScore;
        };
        this.updateAccountDetails = function (stateParams) {
            _this.scope.accountDetails = new AccountDetails();
            _this.scope.accountDetails.platform = _this.getPlatformNumber(stateParams.platform);
            _this.scope.accountDetails.displayName = stateParams.displayName;
            var storedPlayerData = _this.destinyDataService.getStoredPlayerData();
            _this.scope.accountDetails.platformIcon = storedPlayerData.platformIcon;
            _this.scope.accountDetails.membershipId = storedPlayerData.membershipId;
            if (!_this.scope.accountDetails.membershipId) {
                return true;
            }
            if (storedPlayerData.platform !== _this.scope.accountDetails.platform) {
                return true;
            }
            if (storedPlayerData.displayName !== _this.scope.accountDetails.displayName) {
                return true;
            }
            return false;
        };
        this.setPageError = function (errorDetails) {
            _this.scope.pageIsErrored = true;
            _this.scope.showPageContent = false;
            _this.scope.errorMessage = errorDetails;
            console.error(errorDetails);
        };
        scope.vm = this;
        if (this.updateAccountDetails($stateParams)) {
            this.searchPlayer(scope.accountDetails.displayName, scope.accountDetails.platform);
        }
        else {
            this.scope.weaponScore = [];
            this.destinyApiService.getAccountInfo(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(function (data) {
                _this.scope.characterData = destinyBlService.handleGetAccountInfoResponse(data.data);
                _this.getCharactersInventory(_this.scope.characterData);
                _this.scope.showPageContent = true;
            }, function (data) { return _this.setPageError(data.ExceptionMessage); });
            this.destinyApiService.getAccountTriumphs(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(function (data) { return _this.scope.triumphs = destinyBlService.handleGetAccountTriumphsResponse(data.data.Response); }, function (data) { return _this.setPageError(data); });
            this.destinyApiService.getUniqueWeaponData(this.scope.accountDetails.platform, this.scope.accountDetails.membershipId).then(function (data) {
                var concatArray = _this.scope.weaponScore.concat(destinyBlService.handleGetExoticWeapons(data.data.Response));
                _this.scope.weaponScore = _this.getDistinct(concatArray);
            }, function (data) { return _this.setPageError(data); });
        }
    }
    DestinyPlayerController.prototype.mouseOverRow = function (item) {
        var temp = this.scope.weaponScore;
    };
    DestinyPlayerController.prototype.getDistinct = function (list) {
        var n = {};
        var r = [];
        for (var i = 0; i < list.length; i++) {
            if (!n[list[i].hash]) {
                n[list[i].hash] = true;
                r.push(list[i]);
            }
        }
        return r;
    };
    DestinyPlayerController.prototype.getPlatformString = function (platform) {
        return platform === PLATFORM.xbox ? PLATFORM[PLATFORM.xbox] : PLATFORM[PLATFORM.ps];
    };
    DestinyPlayerController.prototype.getPlatformNumber = function (platform) {
        platform = platform.toLowerCase();
        return platform === PLATFORM[PLATFORM.xbox] ? PLATFORM.xbox : PLATFORM.ps;
    };
    return DestinyPlayerController;
})();
masterSite.controller("destinyPlayerController", ["$scope", "destinyApiService",
    "destinyDataService", "$stateParams", "$state", "destinyBlService", "sharedFunctionsService", DestinyPlayerController]);
///<reference path="../app.ts"/>
///<reference path="../services/destinyDataService.ts"/>
var TestController = (function () {
    function TestController(scope, destinyApiService, destinyDataService, $stateParams, $state) {
        this.scope = scope;
        this.destinyApiService = destinyApiService;
        this.destinyDataService = destinyDataService;
        this.$state = $state;
        scope.testing = [{ label: "one", popup: "popup one" }, { label: "two", popup: "popup two" }, { label: "three", popup: "popup three" }];
        scope.message = "test message";
        setTimeout(function () {
            scope.$apply();
            scope.$digest();
            console.log("Scope updated");
        }, 5000);
    }
    return TestController;
})();
masterSite.controller("testController", ["$scope", "destinyApiService",
    "destinyDataService", "$stateParams", "$state", TestController]);
///<reference path="../app.ts"/>
var PopupDirective = (function () {
    function PopupDirective($compile) {
        this.scope = {};
        this.restrict = "AE";
        this.link = function (scope, element, attrs) {
            element.removeAttr("popup");
            element.attr("popover", "123 testing content");
            element.attr("popover-trigger", "mouseenter");
            element.attr("popover-placement", "bottom");
            element.attr("popover-popup-delay", 300);
            $compile(element)(scope);
        };
    }
    PopupDirective.factory = function () {
        var directive = function ($compile) {
            return new PopupDirective($compile);
        };
        directive["$inject"] = ["$compile"];
        return directive;
    };
    return PopupDirective;
})();
masterSite.directive("popup", PopupDirective.factory());
///<reference path="../app.ts"/>
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
    PLATFORM[PLATFORM["ps"] = 2] = "ps";
})(PLATFORM || (PLATFORM = {}));
var ITEMCATEGORY;
(function (ITEMCATEGORY) {
    ITEMCATEGORY[ITEMCATEGORY["Weapon"] = 0] = "Weapon";
    ITEMCATEGORY[ITEMCATEGORY["Armor"] = 1] = "Armor";
    ITEMCATEGORY[ITEMCATEGORY["Misc"] = 2] = "Misc";
})(ITEMCATEGORY || (ITEMCATEGORY = {}));
;
var DAMAGETYPE;
(function (DAMAGETYPE) {
    DAMAGETYPE[DAMAGETYPE["Dual"] = 0] = "Dual";
    DAMAGETYPE[DAMAGETYPE["Kinetic"] = 1] = "Kinetic";
    DAMAGETYPE[DAMAGETYPE["Arc"] = 2] = "Arc";
    DAMAGETYPE[DAMAGETYPE["Solar"] = 3] = "Solar";
    DAMAGETYPE[DAMAGETYPE["Void"] = 4] = "Void";
})(DAMAGETYPE || (DAMAGETYPE = {}));
;
var DestinyFilter = (function () {
    function DestinyFilter() {
    }
    DestinyFilter.itemNameFilter = function () {
        return function (input) {
            if (input) {
                var maxLength = 19;
                if (input.length >= maxLength) {
                    return input.substr(0, maxLength);
                }
                return input;
            }
        };
    };
    DestinyFilter.damageTypeFilter = function (sce, destinyDataService) {
        return function (input) {
            if (input) {
                var url;
                switch (input) {
                    case 0:
                        url = null;
                        break;
                    case 2:
                        url = destinyDataService.getDestinyLinks().icons.damageTypeIcons.regular.arc;
                        break;
                    case 3:
                        url = destinyDataService.getDestinyLinks().icons.damageTypeIcons.regular.solar;
                        break;
                    case 4:
                        url = destinyDataService.getDestinyLinks().icons.damageTypeIcons.regular.void;
                        break;
                    default:
                        url = null;
                        break;
                }
                var html = url == null ? null : "<img src=\"" + url + "\" class=\"damageTypeIcon\"/>";
                return sce.trustAsHtml(html);
            }
        };
    };
    DestinyFilter.booleanFilter = function (sce, destinyDataService) {
        return function (input) {
            if (input !== undefined) {
                var url = input ? destinyDataService.getDestinyLinks().icons.booleanIcons.trueIcon : destinyDataService.getDestinyLinks().icons.booleanIcons.falseIcon;
                var html = "<img src=\"" + url + "\" class=\"damageTypeIcon\"/>";
                return sce.trustAsHtml(html);
            }
        };
    };
    return DestinyFilter;
})();
masterSite.filter("damageTypeFilter", function ($sce, destinyDataService) { return DestinyFilter.damageTypeFilter($sce, destinyDataService); });
masterSite.filter("booleanFilter", function ($sce, destinyDataService) { return DestinyFilter.booleanFilter($sce, destinyDataService); });
masterSite.filter("itemNameFilter", function ($sce, destinyDataService) { return DestinyFilter.itemNameFilter(); });
var AccountDetails = (function () {
    function AccountDetails() {
        this.platform = null;
        this.displayName = null;
        this.membershipId = null;
        this.platformIcon = null;
    }
    return AccountDetails;
})();
///<reference path="../app.ts"/>
///<reference path="../interfaces/IDestinyApiService.ts"/>
var DestinyApiService = (function () {
    function DestinyApiService($http, $q) {
        var _this = this;
        this.$http = $http;
        this.$q = $q;
        this.getCharacterInventory = function (platform, membershipId, characterId, characterNumber) {
            if (characterId !== undefined)
                return _this.$http.get("/api/DestinyApi/GetCharacterInventory?platform=" + platform + "&membershipId=" + membershipId + "&characterId=" + characterId + "&characterNumber=" + characterNumber);
            var dfd = _this.$q.defer();
            dfd.reject();
            return dfd.promise;
        };
        this.getAccountTriumphs = function (platform, membershipId) {
            return _this.$http.get("/api/DestinyApi/GetAccountTriumphs?platform=" + platform + "&membershipId=" + membershipId);
        };
        this.getUniqueWeaponData = function (platform, membershipId) {
            return _this.$http.get("/api/DestinyApi/GetUniqueWeaponData?platform=" + platform + "&membershipId=" + membershipId);
        };
    }
    DestinyApiService.prototype.searchPlayer = function (displayName, platform) {
        var _this = this;
        if (platform === void 0) { platform = 1; }
        var dfd = this.$q.defer();
        if (displayName) {
            this.$http.get("/api/DestinyApi/SearchDestinyPlayer?platform=" + platform + "&displayName=" + displayName).then(function (data) {
                var dataObject = data.data;
                if (dataObject.Response[0]) {
                    dfd.resolve(data);
                }
                else {
                    _this.$http.get("/api/DestinyApi/SearchDestinyPlayer?platform=2&displayName=" + displayName).then(function (data) {
                        var dataObject = data.data;
                        if (dataObject.Response[0]) {
                            dfd.resolve(data);
                        }
                        else {
                            dfd.reject("Player Not Found");
                        }
                    });
                }
            }, function (data) { return dfd.reject(data.data.ExceptionMessage); });
        }
        else {
            dfd.reject();
        }
        return dfd.promise;
    };
    DestinyApiService.prototype.getAccountInfo = function (platform, membershipId) {
        if (platform && membershipId)
            return this.$http.get("/api/DestinyApi/GetAccountInfo?platform=" + platform + "&membershipId=" + membershipId);
        var dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    };
    DestinyApiService.prototype.getItem = function (itemId, listNumber, listPosition) {
        if (itemId !== undefined)
            return this.$http.get("/api/DestinyApi/GetItem?itemId=" + itemId + "&listNumber=" + listNumber + "&listPosition=" + listPosition);
        var dfd = this.$q.defer();
        dfd.reject();
        return dfd.promise;
    };
    return DestinyApiService;
})();
masterSite.service("destinyApiService", ["$http", "$q", DestinyApiService]);
///<reference path="../app.ts"/>
var DestinyBlService = (function () {
    function DestinyBlService(destinyDataService, sharedFunctionsService) {
        var _this = this;
        this.destinyDataService = destinyDataService;
        this.sharedFunctionsService = sharedFunctionsService;
        this.handleGetAccountTriumphsResponse = function (data) {
            var triumphs = data;
            var staticTriumphData = _this.destinyDataService.getAccountTriumphs().yearOne;
            var triumphObjects = [];
            for (var i = 0; i < triumphs.length; i++) {
                triumphObjects[i] = { title: staticTriumphData[i].title, complete: triumphs[i] };
            }
            return triumphObjects;
        };
        this.handleGetAccountInfoResponse = function (data) {
            var accountInfoData = data.Response;
            var itemDefinitions = accountInfoData.HashDefinitions;
            var characterData = [];
            for (var i = 0; i < accountInfoData.Characters.length; i++) {
                var currentCharacterData = accountInfoData.Characters[i];
                var charactersOverview = _this.getCharacterOverviewObject(currentCharacterData);
                var orderedEquipmentHashes = _this.getEquipmentDataObject(currentCharacterData);
                var equipmentData = [];
                var characterId = currentCharacterData.CharacterId;
                for (var j = 0; j < orderedEquipmentHashes.length; j++) {
                    if (orderedEquipmentHashes[j]) {
                        var hash = orderedEquipmentHashes[j];
                        var equipmentObject = void 0;
                        if (itemDefinitions[hash]) {
                            equipmentObject = {
                                itemHash: hash,
                                itemName: itemDefinitions[hash].ItemName,
                                itemDescription: itemDefinitions[hash].ItemDescription,
                                icon: itemDefinitions[hash].Icon,
                                bucketHash: itemDefinitions[hash].BucketHash
                            };
                        }
                        else {
                            equipmentObject = { itemHash: hash, itemName: "LOL not in DB", icon: "/common/destiny_content/icons/01e92aa9288da062ef7cd735e6b25909.jpg" };
                        }
                        equipmentData.push(equipmentObject);
                    }
                }
                characterData.push({ charactersOverview: charactersOverview, equipmentData: equipmentData, characterId: characterId });
            }
            return characterData;
        };
        this.handleGetExoticWeapons = function (inputList) {
            var popularItems = _this.destinyDataService.getPopularItems();
            var gearScoreList = [];
            for (var i = 0; i < inputList.length; i++) {
                for (var j = 0; j < popularItems.length; j++) {
                    if (inputList[i] === popularItems[j].hash) {
                        if (popularItems[j].starred) {
                            var gearObj = popularItems[j];
                            gearScoreList.push(gearObj);
                        }
                    }
                }
            }
            return gearScoreList;
        };
        this.handleLegendaries = function (inputList) {
            var popularItems = _this.destinyDataService.getPopularItems();
            var gearScoreList = [];
            for (var i = 0; i < inputList.length; i++) {
                for (var j = 0; j < popularItems.length; j++) {
                    if (inputList[i] && inputList[i].ItemHash === popularItems[j].hash) {
                        if (popularItems[j].starred) {
                            var gearObj = popularItems[j];
                            gearScoreList.push(gearObj);
                        }
                    }
                }
            }
            return gearScoreList;
        };
        this.handleSearchPlayerResponse = function (data) {
            var dataResponse = data.Response[0];
            var accountDetails = {
                membershipId: dataResponse.membershipId,
                platform: dataResponse.membershipType,
                displayName: dataResponse.displayName,
                platformIcon: dataResponse.iconPath
            };
            _this.destinyDataService.setStoredPlayerData(accountDetails);
            return accountDetails;
        };
        this.handleGetCharactersInventoryResponse = function (rawData, characterData) {
            var inventoryDataResponse = rawData.Response.Items;
            var characterNumberResponse = rawData.Response.CharacterNumber;
            for (var i = 0; i < inventoryDataResponse.length; i++) {
                var currentCharacterEquipment = characterData[characterNumberResponse].equipmentData;
                for (var j = 0; j < currentCharacterEquipment.length; j++) {
                    if (inventoryDataResponse[i] && currentCharacterEquipment[j] && inventoryDataResponse[i].ItemHash === currentCharacterEquipment[j].itemHash) {
                        var bucketHash = _this.sharedFunctionsService.getHashObject(_this.destinyDataService.getBucketHashes(), currentCharacterEquipment[j].bucketHash);
                        if (!bucketHash)
                            continue;
                        if (bucketHash.category === ITEMCATEGORY.Weapon || bucketHash.category === ITEMCATEGORY.Armor) {
                            var itemDetails = {
                                primaryStat: inventoryDataResponse[i].PrimaryStatValue,
                                damageType: inventoryDataResponse[i].DamageType
                            };
                            characterData[characterNumberResponse].equipmentData[j].details = itemDetails;
                        }
                    }
                }
            }
        };
        this.handleGetItemResponse = function (rawData, characterData) {
            var listNumber = rawData.ListNumber;
            var listPosition = rawData.ListPosition;
            var itemData = rawData.Response.Response.data.inventoryItem;
            characterData[listNumber].equipmentData[listPosition].icon = itemData.icon;
            characterData[listNumber].equipmentData[listPosition].itemName = itemData.itemName;
        };
        this.getCharacterOverviewObject = function (charactersDataList) {
            var raceHashes = _this.destinyDataService.getRaceHashes();
            var classHashes = _this.destinyDataService.getClassHashes();
            var genderHashes = _this.destinyDataService.getGenderHashes();
            var Race = _this.sharedFunctionsService.getHashObject(raceHashes, charactersDataList.RaceHash).value;
            var classType = _this.sharedFunctionsService.getHashObject(classHashes, charactersDataList.ClassHash).value;
            var gender = _this.sharedFunctionsService.getHashObject(genderHashes, charactersDataList.GenderHash).value;
            var level = charactersDataList.BaseCharacterLevel;
            var powerLevel = charactersDataList.PowerLevel;
            var characterOverview = level + " " + Race + " " + classType + " - " + gender + " " + powerLevel;
            return characterOverview;
        };
        this.getEquipmentDataObject = function (characterData) {
            var unorderedList = characterData.EquipmentList;
            if (unorderedList.length === 13)
                return unorderedList;
            var orderedList = [];
            for (var j = 0; j < unorderedList.length; j++) {
                var orderedListPosition = _this.destinyDataService.getItemOrderValue(j);
                if (unorderedList[orderedListPosition])
                    orderedList.push(unorderedList[orderedListPosition]);
            }
            return orderedList;
        };
    }
    DestinyBlService.prototype.checkInterestingGear = function (data) {
        var characterEquipmentData = data.Response.Response.data.buckets.Equippable;
        for (var i = 0; i < characterEquipmentData.length; i++) {
        }
    };
    return DestinyBlService;
})();
masterSite.service("destinyBlService", ["destinyDataService", "sharedFunctionsService", DestinyBlService]);
///<reference path="../app.ts"/>
var SharedFunctionsService = (function () {
    function SharedFunctionsService() {
        this.getHashObject = function (hashArray, hash) {
            if (!hash) {
                console.warn("Warning: The hash provided was undefined");
                return null;
            }
            for (var i = 0; i < hashArray.length; i++) {
                if (hashArray[i].hash === hash)
                    return hashArray[i];
            }
            console.warn("Warning: Unknown Hash: " + hash);
            return null;
        };
    }
    return SharedFunctionsService;
})();
masterSite.service("sharedFunctionsService", [SharedFunctionsService]);
///<reference path="../../Scripts/definitelytyped/angular.d.ts"/>
///<reference path="../../Scripts/definitelytyped/angular-ui-router.d.ts"/>
var pokeApp = angular.module("pokeApp", ["ui.router", "ngAnimate", "ui.bootstrap"]);
pokeApp.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/pokedata");
        $stateProvider
            .state("test", {
            url: "/test",
            templateUrl: "/app/pokemon/templates/pokemonTemplate.html",
            controller: "pokemonController"
        }).state("pokeData", {
            url: "/pokedata",
            templateUrl: "/app/pokemon/templates/pokeDataTemplate.html",
            controller: "pokeDataController"
        });
    }]);
///<reference path="../app.ts"/>
var PokeDataController = (function () {
    function PokeDataController(scope, pokeApiService) {
        var _this = this;
        this.scope = scope;
        this.pokeApiService = pokeApiService;
        this.getAllMoves = function () {
            _this.pokeApiService.getMovesList().then(function (data) {
                _this.scope.moves = data.data;
                console.log(data);
            });
        };
        scope.message = "test pokeDataController";
        scope.inputName = "psychic";
        scope.vm = this;
    }
    PokeDataController.prototype.getMoveByName = function (name) {
        var _this = this;
        this.pokeApiService.getMoveByName(name).then(function (data) {
            _this.scope.moves = [];
            _this.scope.moves.push(data.data);
            console.log(data);
        });
        console.log(name);
    };
    PokeDataController.prototype.getMoveByType = function (name) {
        var _this = this;
        this.pokeApiService.getMovesByType(name).then(function (data) {
            _this.scope.moves = data.data;
            console.log(data);
        });
        console.log(name);
    };
    PokeDataController.prototype.getMoveByPokemon = function (pokemonName) {
        var _this = this;
        this.pokeApiService.getMoveByPokemon(pokemonName).then(function (data) {
            _this.scope.moves = data.data;
            console.log(data);
        });
        console.log(name);
    };
    return PokeDataController;
})();
pokeApp.controller("pokeDataController", ["$scope", "pokeApiService", PokeDataController]);
var GameState;
(function (GameState) {
    GameState[GameState["Normal"] = 0] = "Normal";
    GameState[GameState["Battle"] = 1] = "Battle";
})(GameState || (GameState = {}));
var BattleState;
(function (BattleState) {
    BattleState[BattleState["Started"] = 0] = "Started";
    BattleState[BattleState["PlayerTurnStart"] = 1] = "PlayerTurnStart";
    BattleState[BattleState["SelectMove"] = 2] = "SelectMove";
    BattleState[BattleState["EnemyMove"] = 3] = "EnemyMove";
    BattleState[BattleState["Ended"] = 4] = "Ended";
})(BattleState || (BattleState = {}));
var ActorType;
(function (ActorType) {
    ActorType[ActorType["Player"] = 0] = "Player";
    ActorType[ActorType["Trainer"] = 1] = "Trainer";
    ActorType[ActorType["Monster"] = 2] = "Monster";
})(ActorType || (ActorType = {}));
var ATTACK_TYPE;
(function (ATTACK_TYPE) {
    ATTACK_TYPE[ATTACK_TYPE["Damage"] = 0] = "Damage";
    ATTACK_TYPE[ATTACK_TYPE["Status"] = 1] = "Status";
})(ATTACK_TYPE || (ATTACK_TYPE = {}));
var KEYS;
(function (KEYS) {
    KEYS[KEYS["Left"] = 0] = "Left";
    KEYS[KEYS["Right"] = 1] = "Right";
    KEYS[KEYS["Up"] = 2] = "Up";
    KEYS[KEYS["Down"] = 3] = "Down";
    KEYS[KEYS["E"] = 4] = "E";
    KEYS[KEYS["R"] = 5] = "R";
    KEYS[KEYS["Q"] = 6] = "Q";
    KEYS[KEYS["Delete"] = 7] = "Delete";
    KEYS[KEYS["C"] = 8] = "C";
    KEYS[KEYS["V"] = 9] = "V";
})(KEYS || (KEYS = {}));
var Actor = (function () {
    function Actor(name, actorType) {
        var _this = this;
        this.name = name;
        this.actorType = actorType;
        this.abilities = [];
        this.attack = function (input) { return null; };
        this.doDamage = function (damageDone) {
            _this.health -= damageDone;
        };
        this.getHealth = function () {
            return _this.health;
        };
        this.setHealth = function (newHealth) {
            _this.health = newHealth;
        };
        this.getAbilities = function () {
            return _this.abilities;
        };
        this.getName = function () {
            return _this.name;
        };
        this.getActorType = function () {
            return _this.actorType;
        };
        this.health = 100;
        this.width = 14;
        this.height = 21;
    }
    return Actor;
})();
var PokeDataService = (function () {
    function PokeDataService() {
    }
    PokeDataService.abilities = [{ name: "Bite", damage: 10, accuracy: 90 }, { name: "Crunch", damage: 15, accuracy: 75 }, { name: "Tackle", damage: 5, accuracy: 100 }, { name: "Vine Whip", damage: 8, accuracy: 100 }, { name: "godmode", damage: 100, accuracy: 100 }];
    PokeDataService.pokemonList = [{ id: 1, name: "Bulbasaur", abilityNames: ["tackle", "vine whip"] }, { id: 2, name: "Ivysaur", abilityNames: ["tackle", "vine whip"] }, { id: 3, name: "Venusaur", abilityNames: ["tackle", "vine whip"] }];
    PokeDataService.getRandomPokemon = function () {
        var randomNumber = Math.floor(Math.random() * PokeDataService.pokemonList.length);
        return PokeDataService.pokemonList[randomNumber];
    };
    PokeDataService.getAllMoves = function () {
        return PokeDataService.abilities;
    };
    PokeDataService.getAllMovesByPokemon = function (moveName) {
        for (var i = 0; i < PokeDataService.pokemonList.length; i++) {
            if (PokeDataService.pokemonList[i].name.toLowerCase() === moveName.toLowerCase()) {
                return PokeDataService.pokemonList[i].abilityNames;
            }
        }
        return null;
    };
    PokeDataService.getMoveByName = function (moveName) {
        for (var i = 0; i < PokeDataService.abilities.length; i++) {
            if (PokeDataService.abilities[i].name.toLowerCase() === moveName.toLowerCase()) {
                return PokeDataService.abilities[i];
            }
        }
        return null;
    };
    PokeDataService.getPlayerInput = function () {
        return PokeDataService.playerInput;
    };
    PokeDataService.setCurrentInput = function (input) {
        PokeDataService.playerInput = input;
    };
    return PokeDataService;
})();
var SharedFunctions = (function () {
    function SharedFunctions() {
    }
    SharedFunctions.chance = function (chanceRating) {
        var randomNumber = Math.floor(Math.random() * 100) + 1;
        return randomNumber <= chanceRating;
    };
    SharedFunctions.getRandomNumber = function (min, max) {
        return Math.floor(Math.random() * (max + 1)) + min;
    };
    return SharedFunctions;
})();
///<reference path="actor.ts"/>
///<reference path="./pokeDataService.ts"/>
///<reference path="./sharedFunctions.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WildPokemon = (function (_super) {
    __extends(WildPokemon, _super);
    function WildPokemon(name) {
        var _this = this;
        _super.call(this, name, ActorType.Monster);
        this.attack = function () {
            var abilityNumber = SharedFunctions.getRandomNumber(0, 1);
            var ability = _this.abilities[abilityNumber];
            ability.hitSuccess = SharedFunctions.chance(ability.accuracy);
            if (ability.hitSuccess) {
                ability.damage = _this.abilities[abilityNumber].damage;
            }
            return ability;
        };
        var abilityNames = PokeDataService.getAllMovesByPokemon(this.getName());
        for (var i = 0; i < abilityNames.length; i++) {
            this.abilities.push(PokeDataService.getMoveByName(abilityNames[i]));
        }
    }
    return WildPokemon;
})(Actor);
///<reference path="../logic/interfaces/gameInterfaces.ts"/>
///<reference path="../logic/wildPokemon.ts"/>
var Game = (function () {
    function Game() {
        var _this = this;
        this.gameState = GameState.Normal;
        this.startTime = null;
        this.textarea = document.getElementById("textArea");
        this.mouseData = { x: 0, y: 0, selectedBlock: { x: 0, y: 0 } };
        this.keys = {
            40: { value: KEYS.Down, type: "movement", animationIndex: 0 },
            38: { value: KEYS.Up, type: "movement", animationIndex: 3 },
            39: { value: KEYS.Right, type: "movement", animationIndex: 6 },
            37: { value: KEYS.Left, type: "movement", animationIndex: 9 },
            67: KEYS.C, 69: KEYS.E, 82: KEYS.R, 81: KEYS.Q, 46: KEYS.Delete, 86: KEYS.V
        };
        this.mouseMoveCallback = function (event) {
            _this.mouseData = { x: event.clientX, y: event.clientY, selectedBlock: { x: 0, y: 0 } };
        };
        this.mouseDownCallback = function (event) {
            var x = _this.mouseData.selectedBlock.x;
            var y = _this.mouseData.selectedBlock.y;
            var tile = { toY: y, toX: x, facingTile: Game.currentMap[y][x] };
            if (event.button === 2)
                _this.player.deleteItem(tile);
        };
        this.keyDownCallback = function (event) {
            var currentKey = _this.keys[event.keyCode];
            if (GameConsole.showConsole) {
                if (_this.keys[event.keyCode] === KEYS.C) {
                    GameConsole.nextText();
                }
            }
            else if (Game.canInput) {
                if (currentKey && currentKey.type === "movement") {
                    _this.player.oldDirection = _this.player.direction;
                    _this.player.direction = currentKey.value;
                    if (_this.player.playerTextures[currentKey.animationIndex])
                        _this.player.spriteIndex = currentKey.animationIndex;
                    else
                        console.warn("No textures loaded for player");
                    var directionChanged = _this.player.direction !== _this.player.oldDirection;
                    if (!directionChanged)
                        _this.player.move();
                    console.log();
                }
                else if (_this.keys[event.keyCode] === KEYS.R) {
                    _this.player.placeRock();
                }
                else if (_this.keys[event.keyCode] === KEYS.Q) {
                    _this.player.deleteItem();
                }
                else if (_this.keys[event.keyCode] === KEYS.C) {
                    _this.player.interact();
                }
                else if (_this.keys[event.keyCode] === KEYS.V) {
                    _this.player.setValue();
                }
            }
        };
        this.updateScoreboard = function (enemyHealth, playerHealth) {
        };
        this.start = function () {
            window.requestAnimationFrame(_this.tick.bind(_this));
        };
        this.stop = function () {
            GameConsole.writeToConsole("Stopping...");
            _this.createDownloadFile("battleTextDownload", _this.textarea.value);
            clearInterval(_this.gameLoop);
        };
        this.createDownloadFile = function (elementId, content) {
            var download = document.getElementById(elementId);
            download.href = "data:text/plain," + encodeURIComponent(content);
        };
        this.updateConsoleInput = function (input) {
            if (input === "start") {
                _this.start();
            }
            else if (input === ".win") {
                _this.currentEnemy.setHealth(0);
            }
            else {
                PokeDataService.setCurrentInput(input);
                if (input)
                    GameConsole.writeToConsole(input);
            }
        };
        this.tick = function (timeStamp) {
            if (!_this.startTime)
                _this.startTime = timeStamp;
            var progress = timeStamp - _this.startTime;
            if (progress > 500) {
                _this.update();
                _this.startTime = timeStamp;
            }
            _this.render();
            window.requestAnimationFrame(_this.tick.bind(_this));
        };
        this.updateBattleState = function () {
            if (_this.battleStateController.getBattleState() === BattleState.Ended) {
                _this.gameState = GameState.Normal;
                _this.battleStateController = null;
                return;
            }
            _this.battleStateController.update();
        };
        this.render = function () {
            _this.window.context.clearRect(0, 0, Window2D.width, Window2D.height);
            _this.drawMap(6, 9, _this.levelManager.getCurrentMap());
            _this.drawSqure();
            if (GameConsole.showConsole) {
                _this.renderText();
            }
            switch (_this.gameState) {
                case GameState.Normal:
                    break;
                case GameState.Battle:
                    _this.updateScoreboard(_this.currentEnemy.getHealth(), _this.player.getHealth());
                    break;
            }
        };
        this.uploadMap = function (evt) {
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.onload = function (data) {
                var result = data.currentTarget.result;
                if (result) {
                    _this.levelManager.currentLevel.setMapData(JSON.parse(result));
                }
            };
            reader.readAsText(file);
        };
        this.updateGameState = function () {
            _this.createDownloadFile("mapDownload", JSON.stringify(_this.levelManager.getCurrentMap()));
            _this.createDownloadFile("battleTextDownload", _this.textarea.value);
        };
        this.window = new Window2D();
        this.assetManager = new AssetManager();
        this.levelManager = new LevelManager();
        this.levelManager.startLevel(1);
        Game.currentMap = this.levelManager.getCurrentMap();
        this.player = new Player("Sharpiro");
        this.player.setPlayerImages(this.assetManager.getPlayerImages());
        window.addEventListener("keydown", function (event) { return _this.keyDownCallback(event); });
        this.window.canvas.addEventListener("mousemove", function (event) { return _this.mouseMoveCallback(event); });
        this.window.canvas.addEventListener("mousedown", function (event) { return _this.mouseDownCallback(event); });
        var mapForm = document.getElementById("fileUpload");
        mapForm.onchange = function (event) { return _this.uploadMap(event); };
    }
    Game.prototype.drawTile = function (x, y, tile) {
        var rx = x * 16 + this.player.offsetX;
        var ry = y * 16 + this.player.offsetY;
        var currentTileImage = this.assetManager.getImage(tile);
        var grassImage = this.assetManager.getImage({ type: "grass" });
        var playerPosition = this.player.getPosition();
        if (tile !== " ")
            this.window.context.drawImage(grassImage, rx, ry);
        this.window.context.drawImage(currentTileImage, rx, ry);
        var playerTexture = this.player.playerTextures[this.player.spriteIndex];
        if (playerTexture) {
            this.window.context.drawImage(playerTexture.image, playerPosition.left, playerPosition.top);
        }
    };
    Game.prototype.drawMap = function (x, y, mapData) {
        for (var j = -1; j < Window2D.screen.tilesY + 1; j++) {
            for (var i = -1; i < Window2D.screen.tilesX + 1; i++) {
                var mapX = i + Window2D.viewPort.x;
                var mapY = j + Window2D.viewPort.y;
                var tile = (mapData[mapY] && mapData[mapY][mapX]) ? mapData[mapY][mapX] : { type: " " };
                this.drawTile(i, j, tile);
            }
        }
    };
    Game.prototype.update = function () {
        switch (this.gameState) {
            case GameState.Normal:
                this.updateGameState();
                break;
            case GameState.Battle:
                this.updateBattleState();
                break;
        }
    };
    Game.prototype.renderText = function () {
        this.window.context.fillStyle = "white";
        this.window.context.fillRect(0, Window2D.height / 1.5, Window2D.width, Window2D.height);
        this.window.context.fillStyle = "black";
        this.window.context.font = "16px Consolas";
        this.window.context.fillText(GameConsole.currentConsoleText, 15, 200);
    };
    Game.prototype.drawSqure = function (x, y) {
        var tileBoardX = Math.floor((this.mouseData.x - 495) / 16);
        var tileBoardY = Math.floor((this.mouseData.y - 15) / 16);
        var rx = tileBoardX * 16;
        var ry = tileBoardY * 16;
        this.window.context.fillStyle = "rgba(255, 0, 0, .4)";
        this.window.context.fillRect(rx, ry, 16, 16);
        this.mouseData.selectedBlock = { x: tileBoardX, y: tileBoardY };
    };
    Game.canInput = true;
    return Game;
})();
///<reference path="../app.ts"/>
///<reference path="../logic/game.ts"/>
var PokemonController = (function () {
    function PokemonController(scope) {
        var _this = this;
        this.scope = scope;
        this.textarea = document.getElementById("textArea");
        this.submit = function (data) {
            _this.game.updateConsoleInput(data);
        };
        scope.testing = [{ label: "one", popup: "popup one" }, { label: "two", popup: "popup two" }, { label: "three", popup: "popup three" }];
        scope.message = "test message";
        this.game = new Game();
        this.game.start();
        scope.vm = this;
        scope.test = "";
        scope.textArray = [];
    }
    return PokemonController;
})();
pokeApp.controller("pokemonController", ["$scope", PokemonController]);
var GameConsole = (function () {
    function GameConsole() {
    }
    GameConsole.splitInput = function (input) {
        var allWords = input.split(" ");
        if (!allWords)
            return;
        for (var i = 0; i < allWords.length; i++) {
            GameConsole.consoleTextArray.push(allWords[i]);
            GameConsole.currentConsoleText += i < 5 && allWords[i] ? allWords[i] + " " : "";
        }
        GameConsole.textArrayIndex = 5;
        GameConsole.consoleTextArray = allWords;
    };
    GameConsole.nextText = function () {
        var index = GameConsole.textArrayIndex;
        if (GameConsole.consoleTextArray[index]) {
            GameConsole.currentConsoleText = "";
            var allWords = GameConsole.consoleTextArray;
            for (var i = index; i < index + 5; i++) {
                GameConsole.currentConsoleText += i < index + 5 && allWords[i] ? allWords[i] + " " : "";
            }
            GameConsole.textArrayIndex = index + 5;
        }
        else {
            GameConsole.currentConsoleText = "";
            GameConsole.textArrayIndex = 0;
            GameConsole.showConsole = false;
        }
    };
    GameConsole.currentConsoleText = "";
    GameConsole.showConsole = false;
    GameConsole.consoleTextArray = [];
    GameConsole.textArrayIndex = 0;
    GameConsole.writeToConsole = function (input) {
        var textarea = document.getElementById("textArea");
        var textBox = document.getElementById("inputTextBox");
        textarea.scrollTop = textarea.scrollHeight;
        textarea.value += input + "\n";
        textBox.value = "";
        GameConsole.showConsole = true;
        GameConsole.splitInput(input);
    };
    return GameConsole;
})();
var AssetManager = (function () {
    function AssetManager() {
        this.images = [];
        this.loadTextures();
    }
    AssetManager.prototype.loadImage = function (imgSrc, name) {
        if (!name) {
            var stringArr = imgSrc.split("\\");
            name = stringArr[stringArr.length];
        }
        var image = new Image();
        image.src = imgSrc;
        var texture = { image: image, name: name };
        this.images.push(texture);
    };
    AssetManager.prototype.getImage = function (tile) {
        switch (tile.type) {
            case " ":
                return this.images[0].image;
            case "grass":
                return this.images[1].image;
            case "rock":
                return this.images[2].image;
            case "sign":
                return this.images[15].image;
            default:
                return null;
        }
    };
    AssetManager.prototype.getImageByName = function (name) {
        for (var i = 0; i < this.images.length; i++) {
            if (this.images[i].name === name) {
                return this.images[i].image;
            }
        }
        return null;
    };
    AssetManager.prototype.getPlayerImages = function () {
        var playerImages = [];
        for (var i = 3; i < 15; i++) {
            playerImages.push(this.images[i]);
        }
        return playerImages;
    };
    AssetManager.prototype.loadTextures = function () {
        this.loadImage("/content/images/pokemon/map/empty.png");
        this.loadImage("/content/images/pokemon/map/grass.png");
        this.loadImage("/content/images/pokemon/map/rock.png");
        this.loadImage("/content/images/pokemon/character/scientist_s0.png");
        this.loadImage("/content/images/pokemon/character/scientist_s1.png");
        this.loadImage("/content/images/pokemon/character/scientist_s2.png");
        this.loadImage("/content/images/pokemon/character/scientist_n0.png");
        this.loadImage("/content/images/pokemon/character/scientist_n1.png");
        this.loadImage("/content/images/pokemon/character/scientist_n2.png");
        this.loadImage("/content/images/pokemon/character/scientist_e0.png");
        this.loadImage("/content/images/pokemon/character/scientist_e1.png");
        this.loadImage("/content/images/pokemon/character/scientist_e2.png");
        this.loadImage("/content/images/pokemon/character/scientist_w0.png");
        this.loadImage("/content/images/pokemon/character/scientist_w1.png");
        this.loadImage("/content/images/pokemon/character/scientist_w2.png");
        this.loadImage("/content/images/pokemon/map/sign.png");
    };
    return AssetManager;
})();
var Window2D = (function () {
    function Window2D() {
        this.canvas = document.getElementById("canvas");
        this.canvas.id = "canvas";
        this.canvas.width = 400;
        this.canvas.height = 240;
        this.canvas.oncontextmenu = function () { return false; };
        Window2D.width = this.canvas.width;
        Window2D.height = this.canvas.height;
        Window2D.screen.tilesX = Window2D.width / Window2D.screen.tileSize;
        Window2D.screen.tilesY = Window2D.height / Window2D.screen.tileSize;
        this.context = this.canvas.getContext("2d");
    }
    Window2D.viewPort = { x: -5, y: -4 };
    Window2D.screen = { tilesX: 0, tilesY: 0, tileSize: 16 };
    Window2D.width = 0;
    Window2D.height = 0;
    return Window2D;
})();
var Level = (function () {
    function Level() {
        this.textures = [];
        this.assetManager = new AssetManager();
    }
    Level.prototype.getMapData = function () {
        return this.mapData;
    };
    Level.prototype.setMapData = function (data) {
        this.mapData = data;
    };
    return Level;
})();
var LevelManager = (function () {
    function LevelManager() {
    }
    LevelManager.prototype.startLevel = function (id) {
        if (!this.currentLevel) {
            switch (id) {
                case 1:
                    this.currentLevel = new LevelOne();
                    break;
            }
        }
    };
    LevelManager.prototype.stopLevel = function (id) {
        if (this.currentLevel) {
            switch (id) {
                case 1:
                    this.currentLevel = null;
                    break;
            }
        }
    };
    LevelManager.prototype.getCurrentMap = function () {
        return this.currentLevel.getMapData();
    };
    return LevelManager;
})();
var LevelOne = (function (_super) {
    __extends(LevelOne, _super);
    function LevelOne() {
        _super.call(this);
        this.mapData = [[{ "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "sign", "value": "sign 1" }, { "type": "sign", "value": "sign 2" }, { "type": "sign", "value": "sign 3" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "grass" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "grass" }, { "type": "rock" }], [{ "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }, { "type": "rock" }]];
    }
    return LevelOne;
})(Level);
///<reference path="actor.ts"/>
///<reference path="./pokeDataService.ts"/>
///<reference path="./sharedFunctions.ts"/>
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(name) {
        var _this = this;
        _super.call(this, name, ActorType.Player);
        this.offsetX = 0;
        this.offsetY = 0;
        this.direction = KEYS.Up;
        this.oldDirection = KEYS.Up;
        this.spriteIndex = 3;
        this.leftLeg = false;
        this.playerTextures = [];
        this.attack = function (currentInput) {
            var moveNumber = parseInt(currentInput) - 1;
            var move = _this.abilities[moveNumber];
            move.hitSuccess = SharedFunctions.chance(move.accuracy);
            if (move.hitSuccess) {
                move.damage = _this.abilities[moveNumber].damage;
            }
            return move;
        };
        this.animate = function () {
            switch (_this.direction) {
                case KEYS.Up:
                    _this.offsetY = 11;
                    break;
                case KEYS.Down:
                    _this.offsetY = -11;
                    break;
                case KEYS.Left:
                    _this.offsetX = 11;
                    break;
                case KEYS.Right:
                    _this.offsetX = -11;
                    break;
            }
            _this.spriteIndex += (_this.leftLeg) ? 1 : 2;
            _this.leftLeg = !_this.leftLeg;
        };
        this.reset = function () {
            switch (_this.direction) {
                case KEYS.Up:
                    Window2D.viewPort.y--;
                    _this.spriteIndex = 3;
                    break;
                case KEYS.Down:
                    Window2D.viewPort.y++;
                    _this.spriteIndex = 0;
                    break;
                case KEYS.Left:
                    Window2D.viewPort.x--;
                    _this.spriteIndex = 9;
                    break;
                case KEYS.Right:
                    Window2D.viewPort.x++;
                    _this.spriteIndex = 6;
                    break;
            }
            _this.offsetX = 0;
            _this.offsetY = 0;
            Game.canInput = true;
        };
        this.abilities.push(PokeDataService.getMoveByName("bite"));
        this.abilities.push(PokeDataService.getMoveByName("godmode"));
    }
    Player.prototype.setPlayerImages = function (playerImages) {
        this.playerTextures = playerImages;
    };
    Player.prototype.getPosition = function () {
        var x = (Window2D.width / 2) - (this.width / 2);
        var y = (Window2D.height / 2) + 8 - (this.height);
        return { left: x, top: y };
    };
    Player.prototype.move = function () {
        var _this = this;
        Game.canInput = false;
        var tileInfo = this.getFacingTile();
        if (tileInfo.facingTile.type !== "grass") {
            Game.canInput = true;
            console.log("collision detected!");
        }
        else {
            this.offsetX = tileInfo.x * 5;
            this.offsetY = tileInfo.y * 5;
            setTimeout(function () { return _this.animate(); }, 100);
            setTimeout(function () { return _this.reset(); }, 200);
        }
    };
    Player.prototype.deleteItem = function (tile) {
        var tileInfo = this.getFacingTile();
        if (tile) {
            this.setTileMouse(tile);
        }
        else if (tileInfo.facingTile.type !== "grass") {
            console.log("Deleting item!");
            this.setTile(tileInfo, "grass");
        }
        Game.canInput = true;
    };
    Player.prototype.interact = function () {
        var tileInfo = this.getFacingTile();
        if (tileInfo.facingTile.value) {
            GameConsole.writeToConsole(tileInfo.facingTile.value);
        }
        Game.canInput = true;
    };
    Player.prototype.setValue = function (value) {
        var tileInfo = this.getFacingTile();
        if (tileInfo.facingTile.value) {
            var input = prompt("Enter a value");
            if (input) {
                this.setTile(tileInfo, tileInfo.facingTile.type, input);
                console.log("Value set!");
            }
        }
    };
    Player.prototype.placeRock = function () {
        var tileInfo = this.getFacingTile();
        if (tileInfo.facingTile.type !== "rock") {
            this.setTile(tileInfo, "rock");
            console.log("placing rock!");
        }
        Game.canInput = true;
    };
    Player.prototype.getFacingTile = function () {
        var x = 0;
        var y = 0;
        var facingTile = { type: " ", value: "" };
        switch (this.direction) {
            case KEYS.Up:
                y = 1;
                break;
            case KEYS.Down:
                y = -1;
                break;
            case KEYS.Left:
                x = 1;
                break;
            case KEYS.Right:
                x = -1;
                break;
        }
        var toY = Window2D.viewPort.y + (Window2D.screen.tilesY / 2 - 0.5) - y;
        var toX = Window2D.viewPort.x + (Window2D.screen.tilesX / 2 - 0.5) - x;
        if (Game.currentMap[toY] && Game.currentMap[toY][toX]) {
            facingTile = Game.currentMap[toY][toX];
        }
        return { x: x, y: y, toY: toY, toX: toX, facingTile: facingTile };
    };
    Player.prototype.setTile = function (tileInfo, type, value) {
        Game.currentMap[tileInfo.toY][tileInfo.toX] = { type: type, value: value };
    };
    Player.prototype.setTileMouse = function (tileInfo) {
        var selectedY = tileInfo.toY + Window2D.viewPort.y;
        var selectedX = tileInfo.toX + Window2D.viewPort.x;
        Game.currentMap[selectedY][selectedX] = { type: "grass" };
        console.log(selectedX + ", " + selectedY);
    };
    return Player;
})(Actor);
var BattleStateController = (function () {
    function BattleStateController(player, currentEnemy) {
        var _this = this;
        this.player = player;
        this.currentEnemy = currentEnemy;
        this.battleState = BattleState.Started;
        this.update = function () {
            _this.checkWinCondition();
            switch (_this.battleState) {
                case BattleState.Started:
                    GameConsole.writeToConsole("Go Mr. Pokemon!");
                    _this.battleState = BattleState.PlayerTurnStart;
                    break;
                case BattleState.PlayerTurnStart:
                    GameConsole.writeToConsole("Select a move: 1: " + _this.player.getAbilities()[0].name + ", 2: " + _this.player.getAbilities()[1].name);
                    PokeDataService.setCurrentInput(null);
                    _this.battleState = BattleState.SelectMove;
                    break;
                case BattleState.SelectMove:
                    _this.playerMove();
                    break;
                case BattleState.EnemyMove:
                    _this.enemyMove();
                    break;
                case BattleState.Ended:
                    break;
            }
        };
        this.playerMove = function () {
            var playerInput = PokeDataService.getPlayerInput();
            if (playerInput) {
                var attackData = _this.player.attack(playerInput);
                if (attackData.hitSuccess) {
                    _this.currentEnemy.doDamage(attackData.damage);
                    GameConsole.writeToConsole(_this.player.getName() + "'s " + attackData.name + " successfully hit for " + attackData.damage + "!");
                }
                else
                    GameConsole.writeToConsole(_this.player.getName() + "'s " + attackData.name + " missed!");
                GameConsole.writeToConsole("Enemy HP: " + _this.currentEnemy.getHealth() + "%");
                _this.battleState = BattleState.EnemyMove;
            }
        };
        this.enemyMove = function () {
            var attackData = _this.currentEnemy.attack();
            if (attackData.hitSuccess) {
                _this.player.doDamage(attackData.damage);
                GameConsole.writeToConsole("Enemy " + _this.currentEnemy.getName() + "'s " + attackData.name + " successfully hit for " + attackData.damage + "!");
            }
            else
                GameConsole.writeToConsole("Enemy " + _this.currentEnemy.getName() + "'s " + attackData.name + " missed!");
            GameConsole.writeToConsole("Player HP: " + _this.player.getHealth() + "%");
            _this.battleState = BattleState.PlayerTurnStart;
        };
        this.checkWinCondition = function () {
            if (_this.currentEnemy.getHealth() <= 0 || _this.player.getHealth() <= 0) {
                GameConsole.writeToConsole("Game Over!");
                _this.battleState = BattleState.Ended;
                return;
            }
        };
        this.getBattleState = function () {
            return _this.battleState;
        };
    }
    return BattleStateController;
})();
///<reference path="../app.ts"/>
var PokeApiService = (function () {
    function PokeApiService($http, $q) {
        this.$http = $http;
        this.$q = $q;
    }
    PokeApiService.prototype.getMovesList = function () {
        return this.$http.get("/api/pokeapi/getmoves");
    };
    PokeApiService.prototype.getMoveByName = function (name) {
        return this.$http.get("/api/pokeapi/getmovebyname?name=" + name);
    };
    PokeApiService.prototype.getMovesByType = function (name) {
        return this.$http.get("/api/pokeapi/getmovesbytype?type=" + name);
    };
    PokeApiService.prototype.getMoveByPokemon = function (pokemonName) {
        return this.$http.get("/api/pokeapi/getmovesbypokemon?pokemonname=" + pokemonName);
    };
    return PokeApiService;
})();
pokeApp.service("pokeApiService", ["$http", "$q", PokeApiService]);
//# sourceMappingURL=appCombined.js.map