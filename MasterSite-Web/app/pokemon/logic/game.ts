///<reference path="../logic/interfaces/gameInterfaces.ts"/>
///<reference path="../logic/wildPokemon.ts"/>

class Game implements IPokeGame
{
    private gameState = GameState.Normal;
    private gameLoop: number;
    private currentEnemy: WildPokemon;
    private player: Player;
    private battleStateController: BattleStateController;
    public static canInput = true;
    private startTime: number = null;
    public static currentMap: Array<Array<any>>;
    private window: Window2D;
    private assetManager: AssetManager;
    private levelManager: LevelManager;
    private textarea = <HTMLTextAreaElement>document.getElementById("textArea");
    private keys: any = {
        40: { value: KEYS.Down, type: "movement", animationIndex: 0 },
        38: { value: KEYS.Up, type: "movement", animationIndex: 3 },
        39: { value: KEYS.Right, type: "movement", animationIndex: 6 },
        37: { value: KEYS.Left, type: "movement", animationIndex: 9 },
        67: KEYS.C, 69: KEYS.E, 82: KEYS.R, 81: KEYS.Q, 46: KEYS.Delete, 86: KEYS.V
    };


    constructor()
    {
        this.window = new Window2D();
        this.assetManager = new AssetManager();
        this.levelManager = new LevelManager();
        this.levelManager.startLevel(1);
        Game.currentMap = this.levelManager.getCurrentMap();
        this.player = new Player("Sharpiro");
        this.player.setPlayerImages(this.assetManager.getPlayerImages());
        window.addEventListener("keydown", this.keyDownCallback.bind(this));
        //window.addEventListener("keyup", this.keyUpCallback.bind(this));
        const mapForm = document.getElementById("fileUpload");
        mapForm.onchange = (event: any) => this.uploadMap(event);
    }

    private keyDownCallback = (event: KeyboardEvent) =>
    {
        const currentKey = this.keys[event.keyCode];
        if (GameConsole.showConsole)
        {
            if (this.keys[event.keyCode] === KEYS.C)
            {
                GameConsole.nextText();
            }
        } else if (Game.canInput)
        {
            //console.log(event.keyCode);
            if (currentKey && currentKey.type === "movement")
            {
                this.player.oldDirection = this.player.direction;
                this.player.direction = currentKey.value;
                if (this.player.playerTextures[currentKey.animationIndex])
                    this.player.spriteIndex = currentKey.animationIndex;
                    //this.player.currentPlayerTexture = this.player.playerTextures[currentKey.animationIndex].image;
                else
                    console.warn("No textures loaded for player");
                const directionChanged = this.player.direction !== this.player.oldDirection;
                if (!directionChanged)
                    this.player.move();
            }
            else if (this.keys[event.keyCode] === KEYS.R)
            {
                this.player.placeRock();
            }
            else if (this.keys[event.keyCode] === KEYS.Q)
            {
                this.player.deleteItem();
            }
            else if (this.keys[event.keyCode] === KEYS.C)
            {
                this.player.interact();
            }
            else if (this.keys[event.keyCode] === KEYS.V)
            {
                this.player.setValue();
            }
        }
    }

    private drawTile(x: number, y: number, tile: string)
    {
        const rx = x * 16 + this.player.offsetX;
        const ry = y * 16 + this.player.offsetY;
        const currentTileImage = this.assetManager.getImage(tile);
        const grassImage = this.assetManager.getImage({ type: "grass" });
        const playerPosition = this.player.getPosition();
        if (tile !== " ")
            this.window.context.drawImage(grassImage, rx, ry);
        this.window.context.drawImage(currentTileImage, rx, ry);
        const playerTexture = this.player.playerTextures[this.player.spriteIndex];
        if (playerTexture)
            this.window.context.drawImage(playerTexture.image, playerPosition.left, playerPosition.top);
    }

    private drawMap(x?: number, y?: number, mapData?: Array<Array<any>>)
    {
        //console.log(`drawing map from ${Game.window.viewport.x},${Game.window.viewport.y} to ${Game.window.viewport.x + Game.window.screen.tilesX},${Game.window.viewport.y + Game.window.screen.tilesY}`);
        for (let j = -1; j < Window2D.screen.tilesY + 1; j++)
        {
            for (let i = -1; i < Window2D.screen.tilesX + 1; i++)
            {
                let mapX = i + Window2D.viewPort.x;
                let mapY = j + Window2D.viewPort.y;

                let tile = (mapData[mapY] && mapData[mapY][mapX]) ? mapData[mapY][mapX] : { type: " " };

                this.drawTile(i, j, tile);
            }
        }
    }

    private updateScoreboard = (enemyHealth: number, playerHealth: number) =>
    {
        //this.context.strokeStyle = "White";
        //this.context.font = "40px Consolas";
        //this.context.strokeText(`Enemy: ${enemyHealth}%`, 50, 50);
        //this.context.strokeText(`Player: ${playerHealth}%`, 350, 50);
    }

    public start = (): void =>
    {
        //Game.writeToConsole("Starting...");
        window.requestAnimationFrame(this.tick.bind(this));
    }

    public stop = (): void =>
    {
        GameConsole.writeToConsole("Stopping...");

        this.createDownloadFile("battleTextDownload", this.textarea.value);
        clearInterval(this.gameLoop);
    }

    private createDownloadFile = (elementId: string, content: string) =>
    {
        const download = <HTMLAnchorElement>document.getElementById(elementId);
        download.href = `data:text/plain,${encodeURIComponent(content) }`;
    }

    public updateConsoleInput = (input: string): void =>
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
                GameConsole.writeToConsole(input);
            //Game.writeToConsole("Error: Unknown Command");
        }
    }

    private tick = (timeStamp?: number): void =>
    {
        if (!this.startTime)
            this.startTime = timeStamp;
        let progress = timeStamp - this.startTime;
        if (progress > 500)
        {
            this.update();
            this.startTime = timeStamp;
        }
        this.render();
        window.requestAnimationFrame(this.tick.bind(this));
    }

    private update()
    {
        switch (this.gameState)
        {
            case GameState.Normal:
                this.updateGameState();
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

    private renderText()
    {
        this.window.context.fillRect(0, Window2D.height / 1.5, Window2D.width, Window2D.height);
        this.window.context.fillStyle = "black";
        this.window.context.font = "16px Consolas";
        this.window.context.fillText(GameConsole.currentConsoleText, 15, 200);
    }

    private render = (): void =>
    {
        this.window.context.clearRect(0, 0, Window2D.width, Window2D.height);
        this.window.context.fillStyle = "white";
        this.drawMap(6, 9, this.levelManager.getCurrentMap());
        if (GameConsole.showConsole)
        {
            this.renderText();
        }
        switch (this.gameState)
        {
            case GameState.Normal:
                break;
            case GameState.Battle:
                this.updateScoreboard(this.currentEnemy.getHealth(), this.player.getHealth());
                break;
        }
    }

    private uploadMap = (evt: any) =>
    {
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = (data: any) =>
        {
            const result = data.currentTarget.result;
            if (result)
            {
                this.levelManager.currentLevel.setMapData(JSON.parse(result));
            }
        };
        reader.readAsText(file);
    }

    private updateGameState = (): void =>
    {
        this.createDownloadFile("mapDownload", JSON.stringify(this.levelManager.getCurrentMap()));
        this.createDownloadFile("battleTextDownload", this.textarea.value);
        //let chance = 1;
        //let startBattle: boolean = Math.floor(Math.random() * chance) === 0;
        //if (startBattle)
        //{
        //    const randomPokemonName = PokeDataService.getRandomPokemon().name;
        //    this.currentEnemy = new WildPokemon(randomPokemonName);
        //    Game.writeToConsole(`a wild ${this.currentEnemy.getName() } appeared!`);
        //    this.gameState = GameState.Battle;
        //    this.battleStateController = new BattleStateController(this.player, this.currentEnemy);
        //}
    }
}