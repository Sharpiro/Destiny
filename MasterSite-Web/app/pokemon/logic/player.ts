///<reference path="actor.ts"/>
///<reference path="./pokeDataService.ts"/>
///<reference path="./sharedFunctions.ts"/>

class Player extends Actor
{
    public offsetX = 0;
    public offsetY = 0;
    //private direction: KEYS;
    constructor(name: string)
    {
        super(name, ActorType.Player);
        this.abilities.push(PokeDataService.getMoveByName("bite"));
        this.abilities.push(PokeDataService.getMoveByName("godmode"));

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
        var x = (Game.window.width / 2) - (this.width / 2);
        var y = (Game.window.height / 2) + 8 - (this.height);
        return { left: x, top: y };
    }

    public move(direction: KEYS)
    {
        Game.canInput = false;
        let x = 0;
        let y = 0;

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
        var toY = Game.window.viewport.y + (Game.window.screen.tilesY / 2 - 0.5) - y;
        var toX = Game.window.viewport.x + (Game.window.screen.tilesX / 2 - 0.5) - x;
        if (Game.currentLevel[toY] && Game.currentLevel[toY][toX] && Game.currentLevel[toY][toX] !== "g")
        {
            Game.canInput = true;
            console.log("collision detected!");
        } else
        {
            this.offsetX = x * 5;
            this.offsetY = y * 5;
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
                Game.window.viewport.y--;
                break;
            case KEYS.Down:
                Game.window.viewport.y++;
                break;
            case KEYS.Left:
                Game.window.viewport.x--;
                break;
            case KEYS.Right:
                Game.window.viewport.x++;
                break;
        }
        this.offsetX = 0;
        this.offsetY = 0;
        Game.canInput = true;
    }

    public deleteItem(direction: KEYS)
    {
        let facingTile = this.getFacingTile(direction);
        let toY = facingTile.toY;
        let toX = facingTile.toX;
        if (Game.currentLevel[toY] && Game.currentLevel[toY][toX] && Game.currentLevel[toY][toX] !== "g")
        {
            Game.currentLevel[toY][toX] = "g";
            console.log("Deleting item!");
        } else
        {
            console.log("Nothing to delete!");
        }
        Game.canInput = true;
    }

    public interact(direction: KEYS)
    {
        let facingTile = this.getFacingTile(direction);
        let toY = facingTile.toY;
        let toX = facingTile.toX;
        if (Game.currentLevel[toY] && Game.currentLevel[toY][toX] && Game.currentLevel[toY][toX] === "s")
        {
            console.log("Random Message!");
            alert("Random Message");
        } else
        {
            console.log("nothing to interact with!");
        }
    }

    public placeRock(direction: KEYS)
    {
        let facingTile = this.getFacingTile(direction);
        let toY = facingTile.toY;
        let toX = facingTile.toX;
        if (Game.currentLevel[toY] && Game.currentLevel[toY][toX] && Game.currentLevel[toY][toX] !== "r")
        {
            Game.currentLevel[toY][toX] = "r";
            console.log("placing rock!");
        } else
        {
            console.log("Rock already exists!");
        }
        Game.canInput = true;
    }

    public getFacingTile(direction: KEYS)
    {
        let x = 0;
        let y = 0;

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
        var toY = Game.window.viewport.y + (Game.window.screen.tilesY / 2 - 0.5) - y;
        var toX = Game.window.viewport.x + (Game.window.screen.tilesX / 2 - 0.5) - x;
        return { x: x, y: y, toY: toY, toX: toX };
    }
}