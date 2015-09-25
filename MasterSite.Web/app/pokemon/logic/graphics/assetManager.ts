class AssetManager
{
    public images: Array<ITexture> = [];

    constructor()
    {
        this.loadTextures();
    }

    private loadImage(imgSrc: string, name?: string): void
    {
        if (!name)
        {
            const stringArr = imgSrc.split("\\");
            name = stringArr[stringArr.length];
        }
        const image = new Image();
        image.src = imgSrc;
        const texture: ITexture = { image: image, name: name };
        this.images.push(texture);
        //return texture;
    }

    public getImage(tile: any): HTMLImageElement
    {
        switch (tile.type)
        {
            case " ":
                return this.images[0].image;
            case "grass":
                return this.images[1].image;
            case "rock":
                return this.images[2].image;
            case "sign":
                return this.images[15].image;
            default:
                return null;
        }
    }
    public getImageByName(name: string): HTMLImageElement
    {
        for (let i = 0; i < this.images.length; i++)
        {
            if (this.images[i].name === name)
            {
                return this.images[i].image;
            }
        }
        return null;
    }

    public getPlayerImages(): Array<ITexture>
    {
        let playerImages: Array<ITexture> = [];
        for (let i = 3; i < 15; i++)
        {
            playerImages.push(this.images[i]);
        }
        return playerImages;
    }

    private loadTextures(): void
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
}