interface IDestinyPlayerScope
{
    message: string;
    errorMessage: string;
    vm: DestinyPlayerController;
    accountDetails: IAccountDetails;
    characterData: Array<ICharacterData>;
    triumphs: Array<ITriumphs>;
    $apply: any;
}

interface ICharacterData
{
    charactersOverview: string;
    equipmentData: Array<IEquipmentData>;
}

interface ICharacterOverview
{
    level: number;
    race: string;
    className: string;
}

interface IEquipmentData
{
    itemHash: number;
    itemName: string;
    details: IEquipmentDataDetails;
    icon: string;
}

interface ITriumphs
{
    title: string,
    complete: boolean;
}

interface IEquipmentDataDetails
{
    primaryStat: number;
    damageType: DAMAGETYPE;
}