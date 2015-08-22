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
    private canInput = true;
    private direction = "down";
    private oldDirection = "down";
    private startTime: number = null;
    private playerOffsetX = 0;
    private playerOffsetY = 0;
    private currentLevel: Array<Array<string>>;

    constructor()
    {
        this.currentLevel = mapData;
        this.loadImages();
        this.spriteIndex = this.images[3].image;
        this.initCanvas();
        this.initEngine();
        this.player = new Player("Sharpiro");
        window.addEventListener("keydown", this.keyDownCallback.bind(this));
        window.addEventListener("keyup", this.keyUpCallback.bind(this));
        //document.forms['mapForm'].elements['fileUpload'].onchange = (data: any) => this.uploadMap(data);
        var mapForm = <HTMLElement>document.getElementById("fileUpload");
        mapForm.onchange = (event: any) => this.uploadMap(event);
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
        this.loadImage("/content/images/pokemon/map/sign.png");//16
    }

    private keyDownCallback = (event: KeyboardEvent) =>
    {
        if (this.canInput)
        {
            //console.log(event.keyCode);
            let keys: any = { 37: "left", 39: "right", 38: "up", 40: "down", 69: "e", 82: "r", 81: "q", 46: "delete" };
            //if (keys[event.keyCode])
            //{
            //    console.log(keys[event.keyCode]);
            //}
            this.oldDirection = this.direction;

            if (keys[event.keyCode] === "left")
            {
                this.direction = "left";
                const directionChanged = this.direction !== this.oldDirection;
                this.spriteIndex = this.images[12].image;
                if (!directionChanged)
                {
                    this.canInput = false;
                    this.move();
                }

            }
            else if (keys[event.keyCode] === "right")
            {
                this.direction = "right";
                const directionChanged = this.direction !== this.oldDirection;
                this.spriteIndex = this.images[9].image;
                if (!directionChanged)
                {
                    this.canInput = false;
                    this.move();
                }

            }
            else if (keys[event.keyCode] === "up")
            {
                this.direction = "up";
                const directionChanged = this.direction !== this.oldDirection;
                this.spriteIndex = this.images[6].image;
                if (!directionChanged)
                {
                    this.canInput = false;
                    this.move();
                }

            }
            else if (keys[event.keyCode] === "down")
            {
                this.direction = "down";
                const directionChanged = this.direction !== this.oldDirection;
                this.spriteIndex = this.images[3].image;
                if (!directionChanged)
                {
                    this.canInput = false;
                    this.move();
                }
            }
            else if (keys[event.keyCode] === "r")
            {
                this.canInput = false;
                this.placeRock();
            }
            else if (keys[event.keyCode] === "q")
            {
                this.canInput = false;
                this.deleteItem();
            }
            if (keys[event.keyCode] === "e")
            {
                this.interact();
            }
        }
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
        //this.canvas = document.createElement("canvas");
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.id = "canvas";
        this.canvas.width = 400;
        this.canvas.height = 240;
        //this.canvas.style.position = "absolute";
        //this.canvas.style.border = "1px solid";
        //var body = document.getElementsByTagName("body")[0];
        //body.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
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
        if (tile === "s")
            return this.images[15].image;
        return null;
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

    private drawMap(x?: number, y?: number, mapData?: Array<Array<string>>)
    {
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
        let textarea: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("textArea");
        this.createDownloadFile("battleTextDownload", textarea.value);
        clearInterval(this.gameLoop);
    }

    private createDownloadFile = (elementId: string, content: string) =>
    {
        const download = <HTMLAnchorElement>document.getElementById(elementId);
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

    public setCurrentLevel(level: string)
    {
        //this.currentLevel = JSON.parse(level);
    }

    private render = (): void =>
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawMap(6, 9, this.currentLevel);
        switch (this.gameState)
        {
            case GameState.Normal:
                break;
            case GameState.Battle:
                this.updateScoreboard(this.currentEnemy.getHealth(), this.player.getHealth());
                break;
        }
    }

    private deleteItem()
    {
        let facingTile = this.getFacingTile();
        let toY = facingTile.toY;
        let toX = facingTile.toX;
        if (this.currentLevel[toY] && this.currentLevel[toY][toX] && this.currentLevel[toY][toX] !== "g")
        {
            this.currentLevel[toY][toX] = "g";
            console.log("Deleting item!");
        } else
        {
            console.log("Nothing to delete!");
        }
        this.canInput = true;
    }

    private getFacingTile()
    {
        let x = 0;
        let y = 0;

        switch (this.direction)
        {
            case "up":
                y = 1;
                break;
            case "down":
                y = -1;
                break;
            case "left":
                x = 1;
                break;
            case "right":
                x = -1;
                break;
        }
        var toY = this.engine.viewport.y + (this.engine.screen.tilesY / 2 - 0.5) - y;
        var toX = this.engine.viewport.x + (this.engine.screen.tilesX / 2 - 0.5) - x;
        return { toY: toY, toX: toX };
    }

    private interact() {
        let facingTile = this.getFacingTile();
        let toY = facingTile.toY;
        let toX = facingTile.toX;
        if (this.currentLevel[toY] && this.currentLevel[toY][toX] && this.currentLevel[toY][toX] === "s")
        {
            console.log("Random Message!");
            alert("Random Message");
        } else
        {
            console.log("nothing to interact with!");
        }
    }

    private placeRock()
    {
        let facingTile = this.getFacingTile();
        let toY = facingTile.toY;
        let toX = facingTile.toX;
        if (this.currentLevel[toY] && this.currentLevel[toY][toX] && this.currentLevel[toY][toX] !== "r")
        {
            this.currentLevel[toY][toX] = "r";
            console.log("placing rock!");
        } else
        {
            console.log("Rock already exists!");
        }
        this.canInput = true;
    }

    private move()
    {
        //console.log(this.moving);
        //console.log(this.direction);
        let x = 0;
        let y = 0;

        switch (this.direction)
        {
            case "up":
                y = 1;
                break;
            case "down":
                y = -1;
                break;
            case "left":
                x = 1;
                break;
            case "right":
                x = -1;
                break;
        }
        var toY = this.engine.viewport.y + (this.engine.screen.tilesY / 2 - 0.5) - y;
        var toX = this.engine.viewport.x + (this.engine.screen.tilesX / 2 - 0.5) - x;
        if (this.currentLevel[toY] && this.currentLevel[toY][toX] && this.currentLevel[toY][toX] !== "g")
        {
            this.canInput = true;
            console.log("collision detected!");
        } else
        {
            this.playerOffsetX = x * 5;
            this.playerOffsetY = y * 5;
            setTimeout(this.animate.bind(this), 100);
            setTimeout(this.reset.bind(this), 200);
        }
    }

    private animate()
    {
        switch (this.direction)
        {
            case "up":
                this.playerOffsetY = 11;
                break;
            case "down":
                this.playerOffsetY = -11;
                break;
            case "left":
                this.playerOffsetX = 11;
                break;
            case "right":
                this.playerOffsetX = -11;
                break;
        }
    }

    private reset()
    {
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
        this.canInput = true;
    }

    private uploadMap = (evt: any) =>
    {
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = (data: any) =>
        {
            let result = data.currentTarget.result;
            if (result)
            {
                this.currentLevel = JSON.parse(result);
            }
        };
        reader.readAsText(file);
    }

    private updateGameState = (): void =>
    {
        this.createDownloadFile("mapDownload", JSON.stringify(this.currentLevel));
        //this.move();
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