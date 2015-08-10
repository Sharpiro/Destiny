///<reference path="../app.ts"/>

class PokeDataService
{
    //private pokemonNames = { 0: { name: "Bulbasaur" }, 1: { name: "Ivysaur" }, 3: { name: "Venusaur" } }
    //private static moves: any = { bite: { name: "Bite", damage: 10, accuracy: 95 }, crunch: { name: "Crunch", damage: 20, accuracy: 75 } };
    private static abilities: Array<IAbility> = [{ name: "Bite", damage: 10, accuracy: 95 }, { name: "Crunch", damage: 20, accuracy: 75 }];
    private static pokemonList: Array<IPokemon> = [{ id: 1, name: "Bulbasaur" }, { id: 2, name: "Ivysaur" }, { id: 3, name: "Venusaur" }];
    //private static pokemonList: Array<IPokemon> = [{ id: 1, name: "Bulbasaur" }, { id: 2, name: "Ivysaur" }, { id: 3, name: "Venusaur" }];


    public static getRandomPokemon = (): IPokemon =>
    {
        const randomNumber = Math.floor(Math.random() * PokeDataService.pokemonList.length);
        return PokeDataService.pokemonList[randomNumber];
    }

    public static getAllMoves = () =>
    {
        return PokeDataService.abilities;
    }

    public static getMoveByName = (name: string): IAbility =>
    {
        for (let i = 0; i < PokeDataService.abilities.length; i++)
        {
            if (PokeDataService.abilities[i].name.toLowerCase() === name.toLowerCase())
            {
                return PokeDataService.abilities[i];
            }
        }
        return null;
    }
}

pokeApp.service("pokeDataService", [PokeDataService]); 
