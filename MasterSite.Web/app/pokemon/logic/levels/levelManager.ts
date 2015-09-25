class LevelManager
{
    public currentLevel: Level;

    constructor()
    {

    }

    public startLevel(id: number): void
    {
        if (!this.currentLevel)
        {
            switch (id)
            {
                case 1:
                    this.currentLevel = new LevelOne();
                    break;
            }
        }
    }

    public stopLevel(id: number): void
    {
        if (this.currentLevel)
        {
            switch (id)
            {
                case 1:
                    this.currentLevel = null;
                    break;
            }
        }
    }

    public getCurrentMap(): any
    {
        return this.currentLevel.getMapData();
    }
}