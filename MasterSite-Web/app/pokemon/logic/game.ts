///<reference path="../logic/interfaces/gameInterfaces.ts"/>

class Game implements IPokeGame
{
    private static textArray: Array<string> = [];
    private gameState = GameState.Normal;
    private battleState = BattleState.BattleStart;
    private currentInput: string;
    private enemyHealth = 100;
    private playerHealth = 100;
    private abilities: Array<IAbility>;/*[{ name: "bite", damage: 10, accuracy: 95 }, { name: "crunch", damage: 20, accuracy: 75 }];*/
    private gameLoop: number;


    constructor() {
        this.abilities = PokeDataService.getAllMoves();
        let move = PokeDataService.getMoveByName("crunch");
    }

    public static writeToConsole = (input: string): void =>
    {
        let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("textArea");
        let textBox: HTMLInputElement = <HTMLInputElement>document.getElementById("inputTextBox");
        textarea.scrollTop = textarea.scrollHeight;
        Game.textArray.push(input);
        textarea.value += `${input}\n`;
        textBox.value = "";
        //console.log(input);
    }

    public start = (): void =>
    {
        Game.writeToConsole("Starting...");
        this.gameLoop = setInterval(() =>
        {
            this.loop();
        }, 3000);
    }

    public stop = (): void =>
    {
        Game.writeToConsole("Stopping...");
        clearInterval(this.gameLoop);
    }

    public updateInput = (input: string): void =>
    {
        this.currentInput = input;
    }

    private loop = (): void =>
    {
        switch (this.gameState)
        {
            case GameState.Normal:
                this.updateNormalGameState();
                break;
            case GameState.Battle:
                this.updateBattleGameState();
                break;
        }
    }

    private updateNormalGameState = (): void =>
    {
        let chance = 1;
        let startBattle: boolean = Math.floor(Math.random() * chance) === 0;
        if (startBattle)
        {
            const randomPokemon = PokeDataService.getRandomPokemon();
            Game.writeToConsole(`a wild ${randomPokemon.name} appeared!`);
            this.gameState = GameState.Battle;
        }
    }

    private updateBattleGameState = (): void =>
    {
        //check win condition
        if (this.enemyHealth <= 0 || this.playerHealth <= 0)
        {
            Game.writeToConsole("Game Over!");
            this.stop();
            return;
        }
        switch (this.battleState)
        {
            case BattleState.BattleStart:
                Game.writeToConsole("Go Mr. Pokemon!");
                this.battleState = BattleState.PlayerTurnStart;
                break;
            case BattleState.PlayerTurnStart:
                Game.writeToConsole(`Select a move: 1: ${this.abilities[0].name}, 2: ${this.abilities[1].name}`);
                this.updateInput(null);
                this.battleState = BattleState.SelectMove;
                break;
            case BattleState.SelectMove:
                this.attack();
                break;
            case BattleState.EnemyMove:
                this.enemyAttack();
                break;
        }
    }

    private attack = (): void =>
    {
        if (this.currentInput)
        {
            let moveNumber = parseInt(this.currentInput) - 1;
            let hitSuccess = this.chance(this.abilities[moveNumber].accuracy);
            if (hitSuccess)
            {
                this.enemyHealth -= this.abilities[moveNumber].damage;
                Game.writeToConsole(`Player's ${this.abilities[moveNumber].name} successfully hit!`);
            }
            else
                Game.writeToConsole(`Player's ${this.abilities[moveNumber].name} missed!`);
            Game.writeToConsole(`Enemy HP: ${this.enemyHealth}%`);

            this.battleState = BattleState.EnemyMove;
        }
    }

    private enemyAttack = () =>
    {
        let moveNumber = this.getRandomNumber(0, 1);
        let hitSuccess = this.chance(this.abilities[moveNumber].accuracy);
        if (hitSuccess)
        {
            this.playerHealth -= this.abilities[moveNumber].damage;
            Game.writeToConsole(`Enemy's ${this.abilities[moveNumber].name} successfully hit!`);
        }
        else
            Game.writeToConsole(`Enemy's ${this.abilities[moveNumber].name} missed!`);
        Game.writeToConsole(`Player HP: ${this.playerHealth}%`);

        this.battleState = BattleState.PlayerTurnStart;
    }

    private chance = (chanceRating: number): boolean =>
    {
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        let isTrue = randomNumber <= chanceRating;
        console.log(`${isTrue}: ${randomNumber}`);
        return isTrue;
    }

    private getRandomNumber = (min: number, max: number) =>
    {
        return Math.floor(Math.random() * (max + 1)) + min;
    }
}