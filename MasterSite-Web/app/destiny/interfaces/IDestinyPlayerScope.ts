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
    state: boolean;
}

interface ICharacterData
{
    charactersOverview: Array<ICharacterOverview>;
    equipmentData: Array<Array<IEquipmentData>>;
    className: string;
    raceName: string;
    level: number;
}

interface ICharacterOverview {
    level: number;
    className: string;
}

interface IEquipmentData
{
    itemHash: number;
}