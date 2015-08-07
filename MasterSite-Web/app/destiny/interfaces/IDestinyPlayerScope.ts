interface IDestinyPlayerScope
{
    message: string;
    errorMessage: string;
    pageIsErrored: boolean;
    showPageContent: boolean;
    vm: DestinyPlayerController;
    accountDetails: IAccountDetails;
    characterData: Array<ICharacterData>;
    triumphs: Array<ITriumphs>;
    testing: any;
    $apply: any;
    bind: any;
    weaponScore: Array<ITriumphs>;
}

interface ICharacterData
{
    characterId: number;
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
    icon: string;
    itemName: string;
    itemHash: number;
    details: IEquipmentDataDetails;
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

interface IExoticData {
    referenceId: number;
}