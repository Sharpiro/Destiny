///<reference path="actor.ts"/>
///<reference path="./pokeDataService.ts"/>
///<reference path="./sharedFunctions.ts"/>

class WildPokemon extends Actor
{
    constructor(name: string)
    {
        super(name, ActorType.Monster);
        let abilityNames = PokeDataService.getAllMovesByPokemon(this.getName());
        for (let i = 0; i < abilityNames.length; i++)
        {
            this.abilities.push(PokeDataService.getMoveByName(abilityNames[i]));
        }
    }

    public attack = (): IAbility =>
    {
        const abilityNumber = SharedFunctions.getRandomNumber(0, 1);
        const ability = this.abilities[abilityNumber];
        ability.hitSuccess = SharedFunctions.chance(ability.accuracy);
        if (ability.hitSuccess)
        {
            ability.damage = this.abilities[abilityNumber].damage;
        }
        return ability;
    }
}