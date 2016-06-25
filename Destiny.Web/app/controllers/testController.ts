///<reference path="../app.ts"/>
///<reference path="../services/destinyDataService.ts"/>

class TestController
{
    private data: any;
    private membershipId: string;
    private cardId: number;
    private cardDetails: boolean;

    constructor(private scope: any, private destinyApiService: DestinyApiService, private destinyDataService: DestinyDataService, $stateParams: any, private $state: any)
    {
        scope.vm = this;
        this.membershipId = "4611686018432239086";
        this.cardId = 700470;
        this.cardDetails = false;
        const cardIds = ["700470", "603070", "601076", "601904"];
        destinyApiService.getGrimoireCardBulk(1, this.membershipId, cardIds, true).then((data: any) =>
        {
            this.data = data.data.Response;
        });
    }

    private getPlayerGrimoire(membershipId: string)
    {
        this.destinyApiService.getPlayerGrimoire(1, membershipId).then((data: any) =>
        {
            this.data = data.data;
        });
    }

    private getGrimoireCard(membershipId: string, cardId: number, cardDetails: boolean)
    {
        this.destinyApiService.getGrimoireCard(1, membershipId, cardId, cardDetails).then((data: any) =>
        {
            this.data = data.data;
        });
    }

}

destiny.controller("testController", ["$scope", "destinyApiService", "destinyDataService", "$stateParams", "$state", TestController]); 
