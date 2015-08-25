﻿///<reference path="actor.ts"/>
///<reference path="./pokeDataService.ts"/>
///<reference path="./sharedFunctions.ts"/>

class Player extends Actor
{
    public offsetX = 0;
    public offsetY = 0;
    public spriteIndex: HTMLImageElement;
    //private direction: KEYS;
    public assetManager: AssetManager;
    constructor(name: string)
    {
        super(name, ActorType.Player);
        this.abilities.push(PokeDataService.getMoveByName("bite"));
        this.abilities.push(PokeDataService.getMoveByName("godmode"));
        this.assetManager = new AssetManager();
        this.spriteIndex = this.assetManager.getImageByName("scientist_s1.png");
    }

    public attack = (currentInput: string): IAbility =>
    {
        const moveNumber = parseInt(currentInput) - 1;
        const move = this.abilities[moveNumber];
        move.hitSuccess = SharedFunctions.chance(move.accuracy);
        if (move.hitSuccess)
        {
            move.damage = this.abilities[moveNumber].damage;
        }
        return move;
    }

    public getPosition()
    {
        var x = (Window2D.width / 2) - (this.width / 2);
        var y = (Window2D.height / 2) + 8 - (this.height);
        return { left: x, top: y };
    }

    public move(direction: KEYS)
    {
        Game.canInput = false;
        const tileInfo = this.getFacingTile(direction);
        if (tileInfo.facingTile !== "g") {
            Game.canInput = true;
            console.log("collision detected!");
        }
        else
        {
            this.offsetX = tileInfo.x * 5;
            this.offsetY = tileInfo.y * 5;
            setTimeout(() => this.animate(direction), 100);
            setTimeout(() => this.reset(direction), 200);
            console.log("moving...");
        }
    }

    private animate = (direction: KEYS) =>
    {
        console.log("animating...");
        switch (direction)
        {
            case KEYS.Up:
                this.offsetY = 11;
                break;
            case KEYS.Down:
                this.offsetY = -11;
                break;
            case KEYS.Left:
                this.offsetX = 11;
                break;
            case KEYS.Right:
                this.offsetX = -11;
                break;
        }
    }

    private reset = (direction: KEYS) =>
    {
        console.log("reset");
        switch (direction)
        {
            case KEYS.Up:
                Window2D.viewPort.y--;
                break;
            case KEYS.Down:
                Window2D.viewPort.y++;
                break;
            case KEYS.Left:
                Window2D.viewPort.x--;
                break;
            case KEYS.Right:
                Window2D.viewPort.x++;
                break;
        }
        this.offsetX = 0;
        this.offsetY = 0;
        Game.canInput = true;
    }

    public deleteItem(direction: KEYS)
    {
        const tileInfo = this.getFacingTile(direction);
        if (tileInfo.facingTile !== "g")
        {
            console.log("Deleting item!");
            this.setFacingTile(tileInfo, "g");
        }
        Game.canInput = true;
    }

    public interact(direction: KEYS)
    {
        const tileInfo = this.getFacingTile(direction);
        if (tileInfo.facingTile === "s")
        {
            console.log("Random Message!");
            alert("Random Message");
        }
        Game.canInput = true;
    }

    public placeRock(direction: KEYS)
    {
        const tileInfo = this.getFacingTile(direction);
        if (tileInfo.facingTile !== "r")
        {
            this.setFacingTile(tileInfo, "r");
            console.log("placing rock!");
        }
        Game.canInput = true;
    }

    public getFacingTile(direction: KEYS)
    {
        let x = 0;
        let y = 0;
        let facingTile = "";

        switch (direction)
        {
            case KEYS.Up:
                y = 1;
                break;
            case KEYS.Down:
                y = -1;
                break;
            case KEYS.Left:
                x = 1;
                break;
            case KEYS.Right:
                x = -1;
                break;
        }
        const toY = Window2D.viewPort.y + (Window2D.screen.tilesY / 2 - 0.5) - y;
        const toX = Window2D.viewPort.x + (Window2D.screen.tilesX / 2 - 0.5) - x;
        if (Game.currentMap[toY] && Game.currentMap[toY][toX])
        {
            facingTile = Game.currentMap[toY][toX];
        }

        return { x: x, y: y, toY: toY, toX: toX, facingTile: facingTile };
    }

    public setFacingTile(tileInfo: any, value: string)
    {
        Game.currentMap[tileInfo.toY][tileInfo.toX] = value;
    }
}