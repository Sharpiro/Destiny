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
    private engine: any = {};
    private images: Array<IImageObject> = [];
    private spriteIndex: HTMLImageElement;
    private moving = false;
    private direction = "down";
    private startTime: number = null;
    private playerOffsetX = 0;
    private playerOffsetY = 0;

    constructor()
    {
        this.loadImages();
        this.spriteIndex = this.images[3].image;
        this.initCanvas();
        this.initEngine();
        this.player = new Player("Sharpiro");
        window.addEventListener("keydown", this.keyDownCallback.bind(this));
        window.addEventListener("keyup", this.keyUpCallback.bind(this));
    }

    private loadImages()
    {
        //let emptyImage = new Image();
        //emptyImage.src = "/content/images/pokemon/map/empty.png";
        this.loadImage("/content/images/pokemon/map/empty.png");
        this.loadImage("/content/images/pokemon/map/grass.png");
        this.loadImage("/content/images/pokemon/map/rock.png");
        this.loadImage("/content/images/pokemon/character/scientist_s0.png");
        this.loadImage("/content/images/pokemon/character/scientist_s1.png");
        this.loadImage("/content/images/pokemon/character/scientist_s2.png");
        this.loadImage("/content/images/pokemon/character/scientist_n0.png");
        this.loadImage("/content/images/pokemon/character/scientist_n1.png");
        this.loadImage("/content/images/pokemon/character/scientist_n2.png");
        this.loadImage("/content/images/pokemon/character/scientist_e0.png");
        this.loadImage("/content/images/pokemon/character/scientist_e1.png");
        this.loadImage("/content/images/pokemon/character/scientist_e2.png");
        this.loadImage("/content/images/pokemon/character/scientist_w0.png");
        this.loadImage("/content/images/pokemon/character/scientist_w1.png");
        this.loadImage("/content/images/pokemon/character/scientist_w2.png");
    }

    private keyDownCallback = (event: KeyboardEvent) =>
    {
        let keys: any = { 37: "left", 39: "right", 38: "up", 40: "down" };
        if (keys[event.keyCode])
        {
            this.moving = true;
            console.log(keys[event.keyCode]);
        }
        if (keys[event.keyCode] === "left")
        {
            //this.engine.viewport.x--;
            this.direction = "left";
            this.spriteIndex = this.images[12].image;
        }
        if (keys[event.keyCode] === "right")
        {
            //this.engine.viewport.x++;
            this.direction = "right";
            this.spriteIndex = this.images[9].image;

        }
        if (keys[event.keyCode] === "up")
        {
            //this.engine.viewport.y--;
            this.direction = "up";
            this.spriteIndex = this.images[6].image;

        }
        if (keys[event.keyCode] === "down")
        {
            //this.engine.viewport.y++;
            this.direction = "down";
            this.spriteIndex = this.images[3].image;
        }
        //console.log(event.keyCode);
    }

    private loadImage(imgSrc: string, name?: string)
    {
        if (!name)
        {
            const stringArr = imgSrc.split("\\");
            name = stringArr[stringArr.length];
        }
        const image = new Image();
        image.src = imgSrc;
        const imageObj: IImageObject = { image: image, name: name };
        this.images.push(imageObj);
    }

    private keyUpCallback = (event: KeyboardEvent) =>
    {
        this.moving = false;
    }

    private initEngine()
    {
        this.engine.screen = {};
        this.engine.screen.width = this.canvas.width;
        this.engine.screen.height = this.canvas.height;
        //show 10 tiles
        this.engine.screen.tilesX = this.engine.screen.width / 16;
        this.engine.screen.tilesY = this.engine.screen.height / 16;
        this.engine.viewport = {};
        this.engine.viewport.x = 0;
        this.engine.viewport.y = 0;
        this.engine.map = {};
        //this.context.translate(0, 8);
    }

    private initCanvas = () =>
    {
        this.canvas = document.createElement("canvas");
        this.canvas.id = "canvas";
        this.canvas.width = 240;
        this.canvas.height = 144;
        this.canvas.style.position = "absolute";
        this.canvas.style.border = "1px solid";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
    }

    private drawTile(x: number, y: number, tile: string)
    {
        //this.context.fillStyle = "White";
        //this.context.font = "16px Consolas";
        //this.context.fillText(tile, x * 16, y * 16);
        const rx = x * 16 + this.playerOffsetX;
        const ry = y * 16 + this.playerOffsetY;
        const img = this.retrieve(tile);
        const grass = this.retrieve("g");
        const playerPosition = this.getPlayerPosition();
        if (tile !== " ")
            this.context.drawImage(grass, rx, ry);
        this.context.drawImage(img, rx, ry);
        this.context.drawImage(this.spriteIndex, playerPosition.left, playerPosition.top);
    }

    private getPlayerPosition()
    {
        var character = {
            width: Math.ceil(14),
            height: Math.ceil(21)
        };

        var screen = {
            width: this.engine.screen.width,
            height: this.engine.screen.height
        };

        var x = (screen.width / 2) - (character.width / 2);
        var y = (screen.height / 2) + 8 - (character.height);
        return { left: x, top: y };
    }

    private retrieve(tile: string): HTMLImageElement
    {
        if (tile === " ")
            return this.images[0].image;
        if (tile === "g")
            return this.images[1].image;
        if (tile === "r")
            return this.images[2].image;
        return null;
    }

    private drawMap(x?: number, y?: number, mapData?: Array<Array<string>>)
    {
        mapData =
        [
            ["r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "r", "g", "g", "g", "g", "g", "r", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "r", "r", "g", "g", "g", "g", "r", "r", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "r", "g", "g", "g", "g", "g", "r", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "r", "g", "g", "g", "g", "g", "r", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "r", "g", "g", "g", "g", "g", "r", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "r", "g", "g", "g", "g", "g", "r", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "r", "r", "g", "g", "g", "g", "r", "r", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "r", "g", "g", "g", "g", "g", "r", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "r", "g", "g", "g", "g", "g", "r", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "r", "g", "g", "g", "g", "g", "r", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "g", "r"],
            ["r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r", "r"]
        ];

        //console.log(`drawing map from ${this.engine.viewport.x},${this.engine.viewport.y} to ${this.engine.viewport.x + this.engine.screen.tilesX},${this.engine.viewport.y + this.engine.screen.tilesY}`);

        for (let j = -1; j < this.engine.screen.tilesY + 1; j++)
        {
            for (let i = -1; i < this.engine.screen.tilesX + 1; i++)
            {
                let mapX = i + this.engine.viewport.x;
                let mapY = j + this.engine.viewport.y;

                let tile = (mapData[mapY] && mapData[mapY][mapX]) ? mapData[mapY][mapX] : " ";

                this.drawTile(i, j, tile);
            }
        }
        //this.engine.viewport.x++;
        //this.engine.viewport.y++;
    }

    private updateScoreboard = (enemyHealth: number, playerHealth: number) =>
    {
        //this.context.strokeStyle = "White";
        //this.context.font = "40px Consolas";
        //this.context.strokeText(`Enemy: ${enemyHealth}%`, 50, 50);
        //this.context.strokeText(`Player: ${playerHealth}%`, 350, 50);
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
        window.requestAnimationFrame(this.tick.bind(this));
        //this.gameLoop = setInterval(() =>
        //{
        //    this.loop();
        //    this.render();
        //}, 30);
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

    private render = (): void =>
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMap(6, 9);
        switch (this.gameState)
        {
            case GameState.Normal:
                break;
            case GameState.Battle:
                this.updateScoreboard(this.currentEnemy.getHealth(), this.player.getHealth());
                break;
        }
    }

    private move()
    {
        //console.log(this.moving);
        //console.log(this.direction);
        if (this.moving)
        {
            switch (this.direction)
            {
                case "up":
                    this.playerOffsetY = 8;
                    break;
                case "down":
                    this.playerOffsetY = -8;
                    break;
                case "left":
                    this.playerOffsetX = 8;
                    break;
                case "right":
                    this.playerOffsetX = -8;
                    break;
            }
            setTimeout(this.reset.bind(this), 300);
        }
    }

    private reset()
    {
        console.log("resetting...");
        switch (this.direction)
        {
            case "up":
                this.engine.viewport.y--;
                break;
            case "down":
                this.engine.viewport.y++;
                break;
            case "left":
                this.engine.viewport.x--;
                break;
            case "right":
                this.engine.viewport.x++;
                break;
        }
        this.playerOffsetX = 0;
        this.playerOffsetY = 0;
    }

    private updateGameState = (): void =>
    {
        this.move();
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