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
    private images: Array<IImageObject> = [];
    private spriteIndex: HTMLImageElement;
    public static canInput = true;
    private direction = KEYS.Down;
    private oldDirection = KEYS.Down;
    private startTime: number = null;
    public static currentLevel: Array<Array<string>>;
    public static window = { width: 0, height: 0, viewport: {x: 0, y: 0}, screen: {tilesX: 0, tilesY: 0, tileSize: 16} };
    private keys: any = {
        37: { value: KEYS.Left, type: "movement", animationIndex: 12 },
        39: { value: KEYS.Right, type: "movement", animationIndex: 9 },
        38: { value: KEYS.Up, type: "movement", animationIndex: 6 },
        40: { value: KEYS.Down, type: "movement", animationIndex: 3 },
        67: KEYS.C, 69: KEYS.E, 82: KEYS.R, 81: KEYS.Q, 46: KEYS.Delete
    };


    constructor()
    {
        Game.currentLevel = mapData;
        this.loadImages();
        this.spriteIndex = this.images[3].image;
        this.initCanvas();
        this.player = new Player("Sharpiro");
        window.addEventListener("keydown", this.keyDownCallback.bind(this));
        window.addEventListener("keyup", this.keyUpCallback.bind(this));
        var mapForm = <HTMLElement>document.getElementById("fileUpload");
        mapForm.onchange = (event: any) => this.uploadMap(event);
    }

    private loadImages()
    {
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
        if (Game.canInput)
        {
            //console.log(event.keyCode);
            const currentKey = this.keys[event.keyCode];
            if (currentKey.type === "movement")
            {
                this.oldDirection = this.direction;
                this.direction = currentKey.value;
                this.spriteIndex = this.images[currentKey.animationIndex].image;
                const directionChanged = this.direction !== this.oldDirection;
                if (!directionChanged)
                {
                    this.player.move(this.direction);
                }
            }
            else if (this.keys[event.keyCode] === KEYS.R)
            {
                this.player.placeRock(this.direction);
            }
            else if (this.keys[event.keyCode] === KEYS.Q)
            {
                this.player.deleteItem(this.direction);
            }
            else if (this.keys[event.keyCode] === KEYS.C)
            {
                this.player.interact(this.direction);
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

    private initCanvas = () =>
    {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.id = "canvas";
        this.canvas.width = 400;
        this.canvas.height = 240;
        Game.window.width = this.canvas.width;
        Game.window.height = this.canvas.height;
        Game.window.screen.tilesX = Game.window.width / Game.window.screen.tileSize;
        Game.window.screen.tilesY = Game.window.height / Game.window.screen.tileSize;
        this.context = this.canvas.getContext("2d");
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
        const rx = x * 16 + this.player.offsetX;
        const ry = y * 16 + this.player.offsetY;
        const img = this.retrieve(tile);
        const grass = this.retrieve("g");
        const playerPosition = this.player.getPosition();
        if (tile !== " ")
            this.context.drawImage(grass, rx, ry);
        this.context.drawImage(img, rx, ry);
        this.context.drawImage(this.spriteIndex, playerPosition.left, playerPosition.top);
    }

    private drawMap(x?: number, y?: number, mapData?: Array<Array<string>>)
    {
        //console.log(`drawing map from ${Game.window.viewport.x},${Game.window.viewport.y} to ${Game.window.viewport.x + Game.window.screen.tilesX},${Game.window.viewport.y + Game.window.screen.tilesY}`);

        for (let j = -1; j < Game.window.screen.tilesY + 1; j++)
        {
            for (let i = -1; i < Game.window.screen.tilesX + 1; i++)
            {
                let mapX = i + Game.window.viewport.x;
                let mapY = j + Game.window.viewport.y;

                let tile = (mapData[mapY] && mapData[mapY][mapX]) ? mapData[mapY][mapX] : " ";

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
        this.drawMap(6, 9, Game.currentLevel);
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
            let result = data.currentTarget.result;
            if (result)
            {
                Game.currentLevel = JSON.parse(result);
            }
        };
        reader.readAsText(file);
    }

    private updateGameState = (): void =>
    {
        this.createDownloadFile("mapDownload", JSON.stringify(Game.currentLevel));
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