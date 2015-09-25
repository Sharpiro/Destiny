using System.Linq;
using MasterSite.Core.Models.Destiny;
using Newtonsoft.Json.Linq;

namespace MasterSite.Core.BusinessLogic
{
    public class DestinyBusinessService
    {
        public ResponseModel<AccountInfoModel> GetAccountInfo(string sourceJson)
        {
            var data = JObject.Parse(sourceJson);
            var definitions = data.SelectToken("Response.definitions.items");
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

            var jList = (JArray)data.SelectToken("Response.data.characters");
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
                EquipmentList = ((JArray)c["characterBase"]?["peerView"]?["equipment"])?
                                .Select(p => (string)p["itemHash"]).ToList()
            });

            var response = new ResponseModel<AccountInfoModel>
            {
                ErrorCode = (int)data["ErrorCode"],
                ErrorStatus = (string)data["ErrorStatus"],
                Message = (string)data["Message"],
                Response = new AccountInfoModel
                {
                    HashDefinitions = itemHashResponse,
                    Characters = characters
                }
            };
            return response;
        }
    }
}