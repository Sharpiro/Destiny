///<reference path="actor.ts"/>
///<reference path="./pokeDataService.ts"/>
///<reference path="./sharedFunctions.ts"/>

class Player extends Actor
{
    constructor(name: string)
    {
        super(name, ActorType.Player);
        this.abilities.push(PokeDataService.getMoveByName("bite"));
        this.abilities.push(PokeDataService.getMoveByName("godmode"));

    }

    public attack = (currentInput: string): IAbility =>
    {
        const moveNumber = parseInt(currentInput) - 1;
        const move = this.abilities[moveNumber];
        move.hitSuccess = SharedFunctions.chance(move.accuracy);
        if (move.hitSuccess)
        {
            move.damage = this.abilities[moveNumber].damage;
        }
        return move;
    }

    public test = () =>
    {
    }
}