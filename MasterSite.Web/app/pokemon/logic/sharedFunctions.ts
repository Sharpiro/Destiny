class SharedFunctions
{
    constructor()
    {

    }

    public static chance = (chanceRating: number): boolean =>
    {
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        return randomNumber <= chanceRating;
        //console.log(`${isTrue}: ${randomNumber}`);
        //return isTrue;
    }

    public static getRandomNumber = (min: number, max: number) =>
    {
        return Math.floor(Math.random() * (max + 1)) + min;
    }
}