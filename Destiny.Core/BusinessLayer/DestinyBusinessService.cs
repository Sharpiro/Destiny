using System;
using System.Linq;
using System.Collections.Generic;
using MasterSite.Core.Models.Destiny;
using Newtonsoft.Json.Linq;
using MasterSite.Core.DataLayer;
using Newtonsoft.Json;
using System.Threading.Tasks;
using DotnetCoreTools.Core.Extensions;

namespace MasterSite.Core.BusinessLogic
{
    public class DestinyBusinessService
    {
        private readonly ApiHelper _apiHelper;

        public DestinyBusinessService(ApiHelper apiHelper)
        {
            _apiHelper = apiHelper;
        }

        public async Task<SearchPlayerModel> SearchDestinyPlayer(int platform, string displayName)
        {
            var sourceJson = await _apiHelper.SearchDestinyPlayer(platform, displayName);
            var jToken = ((JArray)GetJToken(sourceJson)).FirstOrDefault();
            var responseJson = jToken.ToString();
            var model = JsonConvert.DeserializeObject<SearchPlayerModel>(responseJson);
            return model;
        }

        public async Task<AccountInfoModel> GetAccountInfo(int platform, string membershipId)
        {
            var sourceJson = await _apiHelper.GetAccountInfo(platform, membershipId);
            var jData = GetJToken(sourceJson);
            var itemHashes = new JObject((jData.SelectToken("definitions.items").Children<JProperty>())
                .Select(property => new JProperty(property.Name, new JObject
                    {
                        new JProperty("ItemHash", (string)property.Value["itemHash"]),
                        new JProperty("ItemName", (string)property.Value["itemName"]),
                        new JProperty("Icon", (string)property.Value["icon"]),
                        new JProperty("ItemDescription", (string)property.Value["itemDescription"]),
                        new JProperty("BucketHash", (string)property.Value["bucketTypeHash"])
                    })));
            var characters = jData.SelectToken("data.characters").Select(c => new CharacterModel
            {
                BackgroundPath = (string)c["backgroundPath"],
                BaseCharacterLevel = (int?)c["baseCharacterLevel"],
                EmblemHash = (string)c["emblemHash"],
                EmblemPath = (string)c["emblemPath"],
                CharacterId = (string)c.SelectToken("characterBase.characterId"),
                ClassHash = (string)c.SelectToken("characterBase.classHash"),
                GenderHash = (string)c.SelectToken("characterBase.genderHash"),
                RaceHash = (string)c.SelectToken("characterBase.raceHash"),
                PowerLevel = (int?)c.SelectToken("characterBase.powerLevel"),
                EquipmentList = c.SelectToken("characterBase.peerView.equipment").Select(p => (string)p["itemHash"])
            });
            var response = new AccountInfoModel
            {
                HashDefinitions = itemHashes,
                Characters = characters
            };
            return response;
        }

        public async Task<ItemModel> GetItem(string id)
        {
            var jsonSource = await _apiHelper.GetItem(id);
            var jData = GetJToken(jsonSource);
            var itemModel = new ItemModel
            {
                ItemHash = (string)jData.SelectToken("data.inventoryItem.itemHash"),
                ItemName = (string)jData.SelectToken("data.inventoryItem.itemName"),
                ItemDescription = (string)jData.SelectToken("data.inventoryItem.itemDescription"),
                Icon = (string)jData.SelectToken("data.inventoryItem.icon")
            };
            return itemModel;
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
                            ItemHash = (string)i?["itemHash"],
                            DamageType = (int?)i?["damageType"],
                            RequiredLevel = (int?)i?["equipRequiredLevel"],
                            PrimaryStatValue = (int?)i?["primaryStat"]?["value"]
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

        public JToken GetPlayerGrimoire(string jsonSource)
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
            return jData;
        }

        public ResponseModel<GrimoireCard> GetGrimoireCard(int cardId, string jsonSource, bool details = false)
        {
            var jData = JObject.Parse(jsonSource);
            var grimoireData = jData["Response"]?["cardDefinitions"]?.First?
                .Select(cd => new GrimoireCard
                {
                    Name = (string)cd?["cardName"],
                    Intro = (string)cd?["cardIntro"],
                    Description = (string)cd?["cardDescription"]
                }).FirstOrDefault();
            var responseModel = new ResponseModel<GrimoireCard>
            {
                ErrorCode = (int)jData["ErrorCode"],
                ErrorStatus = (string)jData["ErrorStatus"],
                Message = (string)jData["Message"],
                Response = grimoireData
            };
            if (responseModel.Response == null || !details)
                responseModel.Response = new GrimoireCard();
            responseModel.Response.Id = cardId;
            responseModel.Response.Acquired = grimoireData != null;
            return responseModel;
        }

        private JToken GetJToken(string jsonResult)
        {
            try
            {
                var jData = JObject.Parse(jsonResult);
                var errorCode = (int)jData["ErrorCode"];
                if (errorCode != 1)
                    throw new Exception("Invalid error code from bungie.net");
                var response = jData["Response"];
                return response;
            }
            catch (Exception ex)
            {
                throw new Exception("error parsing response from bungie.net", ex);
            }

        }
    }
}