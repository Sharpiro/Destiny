///<reference path="../app.ts"/>

class PokeDataController
{
    constructor(private scope: any, private pokeApiService: PokeApiService)
    {
        scope.message = "test pokeDataController";
        scope.inputName = "psychic";
        scope.vm = this;
    }

    private getAllMoves = () =>
    {
        this.pokeApiService.getMovesList().then((data: any) =>
        {
            this.scope.moves = data.data;
            console.log(data);
        });
    }

    private getMoveByName(name: string)
    {
        this.pokeApiService.getMoveByName(name).then((data: any) => {
            this.scope.moves = <any>[];
            this.scope.moves.push(data.data);
            console.log(data);
        });
        console.log(name);
    }

    private getMoveByType(name: string)
    {
        this.pokeApiService.getMovesByType(name).then((data: any) =>
        {
            this.scope.moves = data.data;
            console.log(data);
        });
        console.log(name);
    }

    private getMoveByPokemon(pokemonName: string)
    {
        this.pokeApiService.getMoveByPokemon(pokemonName).then((data: any) =>
        {
            this.scope.moves = data.data;
            console.log(data);
        });
        console.log(name);
    }
}
pokeApp.controller("pokeDataController", ["$scope", "pokeApiService", PokeDataController]); 