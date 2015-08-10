///<reference path="../app.ts"/>
///<reference path="../logic/game.ts"/>

class PokemonController
{
    private textarea = document.getElementById("textArea");
    private game: IPokeGame;

    constructor(private scope: any, private pokeDataService: PokeDataService)
    {
        scope.testing = [{ label: "one", popup: "popup one" }, { label: "two", popup: "popup two" }, { label: "three", popup: "popup three" }];
        scope.message = "test message";
        this.createCanvas();
        this.game = new Game();
        this.game.start();
        scope.vm = this;
        scope.test = "";
        scope.textArray = [];
    }

    private createCanvas = () =>
    {
        var canvas = document.createElement("canvas");

        canvas.id = "CursorLayer";
        canvas.width = 1024;
        canvas.height = 500;
        canvas.style.position = "absolute";
        canvas.style.border = "1px solid";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(canvas);
    }

    private submit = (data: string) =>
    {
        this.handleInputLogic(data);
    }

    private handleInputLogic = (data: string) =>
    {
        if (data === "start")
        {
            this.game.start();
        }
        else {
            this.game.updateInput(data);
            Game.writeToConsole(data);
            //Game.writeToConsole("Error: Unknown Command");
        }
    }
}
pokeApp.controller("pokemonController", ["$scope", "pokeDataService", PokemonController]); 