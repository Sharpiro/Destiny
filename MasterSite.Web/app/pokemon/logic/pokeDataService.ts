class PokeDataService
{
    //private pokemonNames = { 0: { name: "Bulbasaur" }, 1: { name: "Ivysaur" }, 3: { name: "Venusaur" } }
    //private static moves: any = { bite: { name: "Bite", damage: 10, accuracy: 95 }, crunch: { name: "Crunch", damage: 20, accuracy: 75 } };
    private static abilities: Array<IAbility> = [{ name: "Bite", damage: 10, accuracy: 90 }, { name: "Crunch", damage: 15, accuracy: 75 }, { name: "Tackle", damage: 5, accuracy: 100 }, { name: "Vine Whip", damage: 8, accuracy: 100 }, { name: "godmode", damage: 100, accuracy: 100 }];
    private static pokemonList: Array<IPokemon> = [{ id: 1, name: "Bulbasaur", abilityNames: ["tackle", "vine whip"] }, { id: 2, name: "Ivysaur", abilityNames: ["tackle", "vine whip"] }, { id: 3, name: "Venusaur", abilityNames: ["tackle", "vine whip"] }];
    //private static pokemonList: Array<IPokemon> = [{ id: 1, name: "Bulbasaur" }, { id: 2, name: "Ivysaur" }, { id: 3, name: "Venusaur" }];
    private static playerInput: string;


    public static getRandomPokemon = (): IPokemon =>
    {
        const randomNumber = Math.floor(Math.random() * PokeDataService.pokemonList.length);
        return PokeDataService.pokemonList[randomNumber];
    }

    public static getAllMoves = () =>
    {
        return PokeDataService.abilities;
    }

    public static getAllMovesByPokemon = (moveName: string): Array<string> =>
    {
        for (let i = 0; i < PokeDataService.pokemonList.length; i++)
        {
            if (PokeDataService.pokemonList[i].name.toLowerCase() === moveName.toLowerCase())
            {
                return PokeDataService.pokemonList[i].abilityNames;
            }
        }
        return null;
    }

    public static getMoveByName = (moveName: string): IAbility =>
    {
        for (let i = 0; i < PokeDataService.abilities.length; i++)
        {
            if (PokeDataService.abilities[i].name.toLowerCase() === moveName.toLowerCase())
            {
                return PokeDataService.abilities[i];
            }
        }
        return null;
    }

    public static getPlayerInput = () =>
    {
        return PokeDataService.playerInput;
    }

    public static setCurrentInput = (input: string) =>
    {
        PokeDataService.playerInput = input;
    }
}