interface IDestinyPlayerScope
{
    message: string;
    errorMessage: string;
    VM: DestinyPlayerController;
    playerSearchData: any;
    characterData: ICharacterData;
    platform: string;
    displayName: string;
    characterNumber: number;
}

interface ICharacterData
{
    charactersOverview: Array<string>;//Array<ICharacterOverview>;
    equipmentData: Array<Array<IEquipmentData>>;
}

interface ICharacterOverview {
    level: number;
    race: string;
    className: string;
}

interface IEquipmentData
{
    itemHash: number;
}