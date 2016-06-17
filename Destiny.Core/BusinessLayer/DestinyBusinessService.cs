using System;
using System.Linq;
using System.Collections.Generic;
using Destiny.Core.Models;
using Newtonsoft.Json.Linq;
using Destiny.Core.DataLayer;
using Newtonsoft.Json;
using System.Threading.Tasks;

namespace Destiny.Core.BusinessLogic
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
            var jToken = ((JArray)GetBungieJToken(sourceJson)).FirstOrDefault().ToString();
            var model = JsonConvert.DeserializeObject<SearchPlayerModel>(jToken);
            return model;
        }

        public async Task<AccountInfoModel> GetAccountInfo(int platform, string membershipId)
        {
            var sourceJson = await _apiHelper.GetAccountInfo(platform, membershipId);
            var jData = GetBungieJToken(sourceJson);
            var response = new AccountInfoModel
            {
                HashDefinitions = new JObject((jData.SelectToken("definitions.items").Children<JProperty>())
                .Select(property => new JProperty(property.Name, new JObject
                    {
                        new JProperty("ItemHash", property.Value["itemHash"].Value<string>()),
                        new JProperty("ItemName", property.Value["itemName"]),
                        new JProperty("Icon", property.Value["icon"]),
                        new JProperty("ItemDescription", property.Value["itemDescription"]),
                        new JProperty("BucketHash", property.Value["bucketTypeHash"].Value<string>())
                    }))),
                Characters = jData.SelectToken("data.characters").Select(character => new CharacterModel
                {
                    BackgroundPath = character["backgroundPath"].Value<string>(),
                    BaseCharacterLevel = character["baseCharacterLevel"].Value<int?>(),
                    EmblemHash = character["emblemHash"].Value<string>(),
                    EmblemPath = character["emblemPath"].Value<string>(),
                    CharacterId = character.SelectToken("characterBase.characterId").Value<string>(),
                    ClassHash = character.SelectToken("characterBase.classHash").Value<string>(),
                    GenderHash = character.SelectToken("characterBase.genderHash").Value<string>(),
                    RaceHash = character.SelectToken("characterBase.raceHash").Value<string>(),
                    PowerLevel = character.SelectToken("characterBase.powerLevel").Value<int?>(),
                    EquipmentList = character.SelectToken("characterBase.peerView.equipment")
                        .Select(p => p["itemHash"].Value<string>())
                })
            };
            return response;
        }

        public async Task<ItemModel> GetItem(string id)
        {
            var jsonSource = await _apiHelper.GetItem(id);
            var jData = GetBungieJToken(jsonSource).SelectToken("data.inventoryItem");
            var itemModel = JsonConvert.DeserializeObject<ItemModel>(jData.ToString());
            return itemModel;
        }

        public async Task<CharacterInventoryModel> GetCharacterInventory(int platform, string membershipId, string characterId)
        {
            var jsonSource = await _apiHelper.GetCharacterInventory(platform, membershipId, characterId);
            var jData = GetBungieJToken(jsonSource);
            var model = new CharacterInventoryModel
            {
                Items = jData.SelectToken("data.buckets.Equippable").Select(equippable => equippable["items"].First)
                    .Select(item => new ItemModel
                    {
                        ItemHash = item["itemHash"].Value<string>(),
                        DamageType = item["damageType"].Value<int?>(),
                        RequiredLevel = item["equipRequiredLevel"].Value<int?>(),
                        PrimaryStatValue = item.SelectToken("primaryStat.value")?.Value<int?>()
                    })
            };
            return model;
        }

        public async Task<IEnumerable<bool>> GetAccountTriumphs(int platform, string membershipId)
        {
            var jsonSource = await _apiHelper.GetAccountTriumphs(platform, membershipId);
            var jData = JObject.Parse(jsonSource);
            var list = jData.SelectToken("Response.data.triumphSets").First()["triumphs"]
                .Select(triumph => (bool)triumph["complete"]);
            return list;
        }

        public async Task<IEnumerable<string>> GetUniqueWeaponData(int platform, string membershipId)
        {
            var jsonSource = await _apiHelper.GetUniqueWeaponData(platform, membershipId);
            var jData = GetBungieJToken(jsonSource);
            var model = jData.SelectToken("data.weapons")
                .Select(weapon => weapon["referenceId"].Value<string>());
            return model;
        }

        public async Task<IEnumerable<GrimoireCard>> GetPlayerGrimoire(int platform, string membershipId)
        {
            var jsonSource = await _apiHelper.GetPlayerGrimoire(platform, membershipId);
            var jData = GetBungieJToken(jsonSource);
            var model = jData.SelectToken("data.cardCollection")
                .Select(cc => new GrimoireCard
                {
                    Id = cc["cardId"].Value<string>(),
                    Score = cc["score"].Value<int>(),
                    Points = cc["points"].Value<int>()
                });
            return model;
        }

        public async Task<GrimoireCard> GetGrimoireCard(int platform, string membershipId, string cardId = null, bool details = false)
        {
            var jsonSource = await _apiHelper.GetGrimoireCard(platform, membershipId, cardId, details);
            var jData = GetBungieJToken(jsonSource);
            var card = jData.SelectToken("data.cardCollection")
                .Select(cc => new
                {
                    Id = cc["cardId"].Value<string>(),
                    Score = cc["score"].Value<int>(),
                    Points = cc["points"].Value<int>()
                }).FirstOrDefault();
            GrimoireCard def;
            if (!details)
                def = new GrimoireCard();
            else
                def = jData["cardDefinitions"].First
                    .Select(cd => new GrimoireCard
                    {
                        Name = (string)cd["cardName"],
                        Intro = (string)cd["cardIntro"],
                        Description = (string)cd["cardDescription"]
                    }).FirstOrDefault();
            var grimoireCard = new GrimoireCard
            {
                Id = card.Id,
                Score = card.Score,
                Points = card.Points,
                Name = def.Name,
                Intro = def.Intro,
                Description = def.Description
            };
            return grimoireCard;
        }

        public async Task<IEnumerable<GrimoireCard>> GetGrimoireCards(GrimoireCardBulkModel bulkModel)
        {
            var grimoireCards = new List<GrimoireCard>();
            foreach (var id in bulkModel.CardIds)
            {
                var grimoireCard = await GetGrimoireCard(bulkModel.Platform, bulkModel.MembershipId, id, bulkModel.Details);
                grimoireCards.Add(grimoireCard);
            }
            return grimoireCards;
        }

        private JToken GetBungieJToken(string jsonResult)
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