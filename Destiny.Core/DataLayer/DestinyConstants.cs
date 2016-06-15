namespace Destiny.Core.DataLayer
{
    public static class DestinyConstants
    {
        public static class Urls
        {
            public const string SearchDestinyPlayer = "http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/{0}/{1}/";
            public const string GetAccountInfo = "http://www.bungie.net/Platform/Destiny/{0}/Account/{1}/?definitions=true";
            public const string GetItem = "http://www.bungie.net/Platform/Destiny/Manifest/inventoryItem/{0}/";
            public const string GetCharacterInventory = "http://www.bungie.net/Platform/Destiny/{0}/Account/{1}/Character/{2}/Inventory/?definitions=false";
            public const string GetAccountTriumphs = "http://www.bungie.net/Platform/Destiny/{0}/Account/{1}/Triumphs/";
        }
    }
}
