using System.Collections.Generic;
using System.Linq;
using MasterSite.Core.Models.Destiny;
using Newtonsoft.Json.Linq;

namespace MasterSite.Core.BusinessLogic
{
    public class DestinyBusinessService
    {
        public ResponseModel<object> SearchDestinyPlayer(string sourceJson)
        {
            var jData = JObject.Parse(sourceJson);
            var responseModel = new ResponseModel<object>
            {
                ErrorCode = (int)jData["ErrorCode"],
                ErrorStatus = (string)jData["ErrorStatus"],
                Message = (string)jData["Message"],
                Response = jData["Response"]
            };
            return responseModel;
        }
        public ResponseModel<AccountInfoModel> GetAccountInfo(string sourceJson)
        {
            var jData = JObject.Parse(sourceJson);
            var definitions = jData.SelectToken("Response.definitions.items");
            var itemHashResponse = new JObject();
            foreach (var definition in definitions)
            {
                var children = (JObject)definition.First;
                var subObject = new JObject
                {
                    new JProperty("ItemHash", (string)children["itemHash"]),
                    new JProperty("icon", (string)children["icon"]),
                    new JProperty("itemDescription", (string)children["itemDescription"])
                };
                var propertyName = ((JProperty)definition).Name;
                if (propertyName != null)
                    itemHashResponse.Add(new JProperty(propertyName, subObject));
            }

            var jList = (JArray)jData.SelectToken("Response.data.characters");
            var characters = jList.Select(c => new CharacterModel
            {
                BackgroundPath = (string)c["backgroundPath"],
                BaseCharacterLevel = (int)c["baseCharacterLevel"],
                EmblemHash = (ulong)c["emblemHash"],
                EmblemPath = (string)c["emblemPath"],
                CharacterId = (string)c["characterBase"]?["characterId"],
                ClassHash = (ulong)c["characterBase"]?["classHash"],
                GenderHash = (ulong)c["characterBase"]?["genderHash"],
                RaceHash = (ulong)c["characterBase"]?["raceHash"],
                PowerLevel = (int)c["characterBase"]?["powerLevel"],
                EquipmentList = c["characterBase"]?["peerView"]?["equipment"]?
                                .Select(p => (string)p["itemHash"]).ToList()
            });

            var response = new ResponseModel<AccountInfoModel>
            {
                ErrorCode = (int)jData["ErrorCode"],
                ErrorStatus = (string)jData["ErrorStatus"],
                Message = (string)jData["Message"],
                Response = new AccountInfoModel
                {
                    HashDefinitions = itemHashResponse,
                    Characters = characters
                }
            };
            return response;
        }

        public ResponseModel<ItemModel> GetItem(string jsonSource)
        {
            var jData = JObject.Parse(jsonSource);
            var responseModel = new ResponseModel<ItemModel>
            {
                ErrorCode = (int)jData["ErrorCode"],
                ErrorStatus = (string)jData["ErrorStatus"],
                Message = (string)jData["Message"],
                Response = new ItemModel
                {
                    ItemHash = (ulong)jData["Response"]?["data"]?["inventoryItem"]?["itemHash"],
                    ItemName = (string)jData["Response"]?["data"]?["inventoryItem"]?["itemName"],
                    ItemDescription = (string)jData["Response"]?["data"]?["inventoryItem"]?["itemDescription"],
                    Icon = (string)jData["Response"]?["data"]?["inventoryItem"]?["icon"]
                }
            };
            return responseModel;
        }

        public ResponseModel<CharacterInventoryModel> GetCharacterInventory(string jsonSource)
        {
            var jData = JObject.Parse(jsonSource);
            var responseModel = new ResponseModel<CharacterInventoryModel>
            {
                ErrorCode = (int)jData["ErrorCode"],
                ErrorStatus = (string)jData["ErrorStatus"],
                Message = (string)jData["Message"],
                Response = new CharacterInventoryModel
                {
                    Items = ((JArray)jData["Response"]?["data"]?["buckets"]?["Equippable"])?
                   .Select(e => e["items"].First)
                   .Select(i => new ItemModel
                   {
                       ItemHash = (ulong?)i["itemHash"],
                       DamageType = (int?)i["damageType"],
                       RequiredLevel = (int?)i["equipRequiredLevel"],
                       PrimaryStatValue = (int?)i["primaryStat"]?["value"]
                   }).ToList()

                }
            };
            return responseModel;
        }

        public ResponseModel<List<bool>> GetAccountTriumphs(string jsonSource)
        {
            var jData = JObject.Parse(jsonSource);
            var responseModel = new ResponseModel<List<bool>>
            {
                ErrorCode = (int)jData["ErrorCode"],
                ErrorStatus = (string)jData["ErrorStatus"],
                Message = (string)jData["Message"],
                Response = jData["Response"]?["data"]?["triumphSets"]?
                    .First()["triumphs"].Select(t => (bool)t["complete"]).ToList()
            };
            return responseModel;
        }

        public ResponseModel<List<ulong>> GetUniqueWeaponData(string jsonSource)
        {
            var jData = JObject.Parse(jsonSource);
            var responseModel = new ResponseModel<List<ulong>>
            {
                ErrorCode = (int)jData["ErrorCode"],
                ErrorStatus = (string)jData["ErrorStatus"],
                Message = (string)jData["Message"],
                Response = jData["Response"]?["data"]?["weapons"]?
                    .Select(w => (ulong)w["referenceId"]).ToList()
            };
            return responseModel;
        }
    }
}