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
}

enum GameState
{
    Normal, Battle
}

enum BattleState
{
    BattleStart, PlayerTurnStart, SelectMove, EnemyMove
}