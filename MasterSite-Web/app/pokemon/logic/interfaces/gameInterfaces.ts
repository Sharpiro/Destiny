interface IPokeGame
{
    start(): void;
    updateConsoleInput(input: string): void;
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

interface ITexture {
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

enum KEYS {
    Left, Right, Up, Down, E, R, Q, Delete, C
}