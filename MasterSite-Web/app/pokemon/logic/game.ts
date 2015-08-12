///<reference path="../logic/interfaces/gameInterfaces.ts"/>
///<reference path="../logic/wildPokemon.ts"/>

class Game implements IPokeGame
{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    private gameState = GameState.Normal;
    private gameLoop: number;
    private currentEnemy: WildPokemon;
    private player: Player;
    private battleStateController: BattleStateController;


    constructor()
    {
        this.initCanvas();
        this.battleStateController;
        this.player = new Player("Sharpiro");
    }

    private initCanvas = () =>
    {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas";
        this.canvas.width = 1024;
        this.canvas.height = 500;
        this.canvas.style.position = "absolute";
        this.canvas.style.border = "1px solid";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
    }

    private updateScoreboard = (enemyHealth: number, playerHealth: number) =>
    {
        this.context.strokeStyle = "White";
        this.context.font = "40px Consolas";
        this.context.strokeText(`Enemy: ${enemyHealth}%`, 50, 50);
        this.context.strokeText(`Player: ${playerHealth}%`, 350, 50);
    }

    public static writeToConsole = (input: string): void =>
    {
        let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("textArea");
        let textBox: HTMLInputElement = <HTMLInputElement>document.getElementById("inputTextBox");
        textarea.scrollTop = textarea.scrollHeight;
        //Game.textArray.push(input);
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
            this.render();
        }, 3000);
    }

    public stop = (): void =>
    {
        Game.writeToConsole("Stopping...");
        this.createDownloadFile();
        clearInterval(this.gameLoop);
    }

    private createDownloadFile = () =>
    {
        let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("textArea");
        let content = textarea.value;
        let download = <HTMLAnchorElement>document.getElementById("dl");
        download.href = `data:text/plain,${encodeURIComponent(content) }`;
    }

    public updateInput = (input: string): void =>
    {
        if (input === "start")
        {
            this.start();
        }
        else if (input === ".win")
        {
            this.currentEnemy.setHealth(0);
        }
        else
        {
            PokeDataService.setCurrentInput(input);
            if (input)
                Game.writeToConsole(input);
            //Game.writeToConsole("Error: Unknown Command");
        }
    }

    private loop = (): void =>
    {
        switch (this.gameState)
        {
            case GameState.Normal:
                this.updateNormalGameState();
                break;
            case GameState.Battle:
                this.updateBattleState();
                break;
        }
    }

    private updateBattleState = (): void =>
    {
        if (this.battleStateController.getBattleState() === BattleState.Ended)
        {
            this.gameState = GameState.Normal;
            this.battleStateController = null;
            return;
        }
        this.battleStateController.update();
    }

    private render = (): void =>
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        switch (this.gameState)
        {
            case GameState.Normal:
                break;
            case GameState.Battle:
                this.updateScoreboard(this.currentEnemy.getHealth(), this.player.getHealth());
                break;
        }
    }

    private updateNormalGameState = (): void =>
    {
        let chance = 1;
        let startBattle: boolean = Math.floor(Math.random() * chance) === 0;
        if (startBattle)
        {
            const randomPokemonName = PokeDataService.getRandomPokemon().name;
            this.currentEnemy = new WildPokemon(randomPokemonName);
            Game.writeToConsole(`a wild ${this.currentEnemy.getName() } appeared!`);
            this.gameState = GameState.Battle;
            this.battleStateController = new BattleStateController(this.player, this.currentEnemy);
        }
    }
}