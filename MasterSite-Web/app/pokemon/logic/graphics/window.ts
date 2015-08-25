class Window2D
{
    //public static window = { width: 0, height: 0, viewport: {x: 0, y: 0}, screen: {tilesX: 0, tilesY: 0, tileSize: 16} };
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;
    public static viewPort = { x: 0, y: 0 };
    public static screen: IScreen = { tilesX: 0, tilesY: 0, tileSize: 16 };
    public static width = 0;
    public static height = 0;

    constructor()
    {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.canvas.id = "canvas";
        this.canvas.width = 400;
        this.canvas.height = 240;
        Window2D.width = this.canvas.width;
        Window2D.height = this.canvas.height;
        Window2D.screen.tilesX = Window2D.width / Window2D.screen.tileSize;
        Window2D.screen.tilesY = Window2D.height / Window2D.screen.tileSize;
        this.context = this.canvas.getContext("2d");
    }
}