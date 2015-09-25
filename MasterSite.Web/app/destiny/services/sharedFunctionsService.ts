///<reference path="../app.ts"/>

class SharedFunctionsService implements ISharedFunctionsService
{
    constructor()
    {
    }

    public getHashObject = (hashArray: Array<IHash>, hash: number): IHash =>
    {
        for (let i = 0; i < hashArray.length; i++)
        {
            if (hashArray[i].hash === hash)
                return hashArray[i];
        }
        console.warn(`Warning: Unknown Hash: ${hash}`);
        return null;
    }
}

masterSite.service("sharedFunctionsService", [SharedFunctionsService]); 
