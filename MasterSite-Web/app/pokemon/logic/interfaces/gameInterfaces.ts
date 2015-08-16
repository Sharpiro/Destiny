interface IPokeGame
{
    start(): void;
    updateInput(input: string): void;
}

interface IAbility
{
    accuracy: number;
    name: string;
    damage: number;
    hitSuccess?: boolean;
    critSuccess?: boolean;
}

interface IAttack
{
    damageDone: number;
    attackType: ATTACK_TYPE;
    hitSuccess: boolean;
}

interface IImageObject {
    image: HTMLImageElement;
    name: string;
}

enum GameState
{
    Normal, Battle
}

enum BattleState
{
    Started, PlayerTurnStart, SelectMove, EnemyMove, Ended
}

enum ActorType
{
    Player, Trainer, Monster
}

enum ATTACK_TYPE
{
    Damage, Status
}