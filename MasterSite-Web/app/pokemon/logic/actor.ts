class Actor implements IActor
{
    protected  health: number;
    protected  abilities: Array<IAbility> = [];

    constructor(private name: string, private actorType: ActorType)
    {
        this.health = 100;
    }

    public attack = (input?: string): IAbility => null;

    public move(): void
    {
        console.log("base");
    }

    public doDamage = (damageDone: number): void =>
    {
        this.health -= damageDone;
    }

    //#region accessors
    public getHealth = (): number =>
    {
        return this.health;
    }

    public setHealth = (newHealth: number): void =>
    {
        this.health = newHealth;
    }

    public getAbilities = (): Array<IAbility> =>
    {
        return this.abilities;
    }

    public getName = (): string =>
    {
        return this.name;
    }

    public getActorType = (): ActorType =>
    {
        return this.actorType;
    }
    //#endregion
}

interface IActor
{
    attack(input?: string): IAbility;
    doDamage(damageDone: number): void;
    getHealth(): number;
    setHealth(newHealth: number): void;
    getAbilities(): Array<IAbility>;
    getName(): string;
    getActorType(): ActorType;
}