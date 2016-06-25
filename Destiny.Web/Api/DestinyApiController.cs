using System;
using System.Threading.Tasks;
using System.Web.Http;
using Destiny.Core.BusinessLogic;
using Destiny.Core.DataLayer;
using DotnetCoreTools.Core.WebHelpers;
using System.Configuration;
using Destiny.Core.Models;
using DotnetCoreTools.Core.SimpleAutoMapper;
using Newtonsoft.Json.Linq;

namespace Destiny.Web.Api
{
    public class DestinyApiController : ApiController
    {
        private readonly DestinyBusinessService _businessLayer;

        public DestinyApiController()
        {
            var key = ConfigurationManager.AppSettings["bungieApiKey"];
            _businessLayer = new DestinyBusinessService(new ApiHelper(new WebHelper(), key), new SimpleMapper());
        }

        [HttpGet]
        public async Task<IHttpActionResult> SearchDestinyPlayer(int platform, string displayName)
        {
            try
            {
                var model = await _businessLayer.SearchDestinyPlayer(platform, displayName);
                var jObject = JObject.FromObject(model);
                return Ok(jObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetAccountInfo(int platform, string membershipId)
        {
            try
            {
                var model = await _businessLayer.GetAccountInfo(platform, membershipId);
                var jObject = JObject.FromObject(model);
                return Ok(jObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetItem(string id, int? listNumber = null, int? listPosition = null)
        {
            try
            {
                var model = await _businessLayer.GetItem(id);
                var jObject = JObject.FromObject(model);
                return Ok(jObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetCharacterInventory(int platform, string membershipId, string characterId, int? characterNumber = null)
        {
            try
            {
                var model = await _businessLayer.GetCharacterInventory(platform, membershipId, characterId);
                model.CharacterNumber = characterNumber;
                var jObject = JObject.FromObject(model);
                return Ok(jObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetAccountTriumphs(int platform, string membershipId)
        {
            try
            {
                var model = await _businessLayer.GetAccountTriumphs(platform, membershipId);
                var jObject = JArray.FromObject(model);
                return Ok(jObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUniqueWeaponData(int platform, string membershipId)
        {
            try
            {
                var model = await _businessLayer.GetUniqueWeaponData(platform, membershipId);
                var jObject = JArray.FromObject(model);
                return Ok(jObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetPlayerGrimoire(int platform, string membershipId)
        {
            try
            {
                var model = await _businessLayer.GetPlayerGrimoire(platform, membershipId);
                var jObject = JObject.FromObject(model);
                return Ok(jObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetGrimoireCard(int platform, string membershipId, string cardId, bool details = false)
        {
            try
            {
                var model = await _businessLayer.GetGrimoireCard(platform, membershipId, cardId, true);
                var jObject = JObject.FromObject(model);
                return Ok(jObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> GetGrimoireCardBulk(GrimoireCardBulkModel bulkModel)
        {
            try
            {
                var model = await _businessLayer.GetGrimoireCards(bulkModel);
                var jObject = JArray.FromObject(model);
                return Ok(jObject);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}