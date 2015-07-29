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
    triumphs: Array<ITriumphs>;
    $apply: any;
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
    details: any;
    image: HTMLImageElement;
    icon: string;
}

interface ITriumphs
{
    title: string,
    complete: boolean;
}