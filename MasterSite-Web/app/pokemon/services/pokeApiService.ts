///<reference path="../app.ts"/>

class PokeApiService
{

    constructor(private $http: ng.IHttpService, private $q: ng.IQService)
    {
    }

    public getMovesList(): ng.IPromise<any>
    {
        //dfd.reject();
        //const dfd = this.$q.defer();
        //return dfd.promise;
        return this.$http.get(`/api/pokeapi/getmoves`);
    }

    public getMoveByName(name: string): ng.IPromise<any> {
        return this.$http.get(`/api/pokeapi/getmovebyname?name=${name}`);
    }
        
    public getMovesByType(name: string): ng.IPromise<any>
    {
        return this.$http.get(`/api/pokeapi/getmovesbytype?type=${name}`);
    }

    public getMoveByPokemon(pokemonName: string): ng.IPromise<any>
    {
        return this.$http.get(`/api/pokeapi/getmovesbypokemon?pokemonname=${pokemonName}`);
    }
}
pokeApp.service("pokeApiService", ["$http", "$q", PokeApiService]); 
