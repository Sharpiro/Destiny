class BattleStateController
{
    private battleState = BattleState.Started;

    constructor(private player: Player, private currentEnemy: WildPokemon)
    {

    }

    public update = (): void =>
    {
        this.checkWinCondition();
        switch (this.battleState)
        {
            case BattleState.Started:
                GameConsole.writeToConsole("Go Mr. Pokemon!");
                this.battleState = BattleState.PlayerTurnStart;
                break;
            case BattleState.PlayerTurnStart:
                GameConsole.writeToConsole(`Select a move: 1: ${this.player.getAbilities()[0].name}, 2: ${this.player.getAbilities()[1].name}`);
                PokeDataService.setCurrentInput(null);
                this.battleState = BattleState.SelectMove;
                break;
            case BattleState.SelectMove:
                this.playerMove();
                break;
            case BattleState.EnemyMove:
                this.enemyMove();
                break;
            case BattleState.Ended:
                break;
        }
    }

    private playerMove = (): void =>
    {
        const playerInput = PokeDataService.getPlayerInput();
        if (playerInput)
        {
            const attackData = this.player.attack(playerInput);
            if (attackData.hitSuccess)
            {
                //TODO: Should this be modifying values?
                this.currentEnemy.doDamage(attackData.damage);
                GameConsole.writeToConsole(`${this.player.getName() }'s ${attackData.name} successfully hit for ${attackData.damage}!`);
            }
            else
                GameConsole.writeToConsole(`${this.player.getName() }'s ${attackData.name} missed!`);
            GameConsole.writeToConsole(`Enemy HP: ${this.currentEnemy.getHealth() }%`);
            this.battleState = BattleState.EnemyMove;
        }
    }


    private enemyMove = () =>
    {
        const attackData = this.currentEnemy.attack();
        if (attackData.hitSuccess)
        {
            this.player.doDamage(attackData.damage);
            GameConsole.writeToConsole(`Enemy ${this.currentEnemy.getName() }'s ${attackData.name} successfully hit for ${attackData.damage}!`);
        }
        else
            GameConsole.writeToConsole(`Enemy ${this.currentEnemy.getName() }'s ${attackData.name} missed!`);
        GameConsole.writeToConsole(`Player HP: ${this.player.getHealth() }%`);
        this.battleState = BattleState.PlayerTurnStart;
    }

    private checkWinCondition = () =>
    {
        //check win condition
        if (this.currentEnemy.getHealth() <= 0 || this.player.getHealth() <= 0)
        {
            //download.click();
            GameConsole.writeToConsole("Game Over!");
            this.battleState = BattleState.Ended;
            //this.stop();
            return;
        }
    }

    public getBattleState = () =>
    {
        return this.battleState;
    }
}