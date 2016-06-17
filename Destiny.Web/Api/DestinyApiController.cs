using System;
using System.Threading.Tasks;
using System.Web.Http;
using Destiny.Core.BusinessLogic;
using Destiny.Core.DataLayer;
using DotnetCoreTools.Core.WebHelpers;
using System.Configuration;
using Destiny.Core.Models;

namespace Destiny.Web.Api
{
    public class DestinyApiController : ApiController
    {
        private readonly DestinyBusinessService _businessLayer;

        public DestinyApiController()
        {
            var key = ConfigurationManager.AppSettings["bungieApiKey"];
            _businessLayer = new DestinyBusinessService(new ApiHelper(new WebHelper(), key));
        }

        [HttpGet]
        public async Task<IHttpActionResult> SearchDestinyPlayer(int platform, string displayName)
        {
            try
            {
                var responseModel = await _businessLayer.SearchDestinyPlayer(platform, displayName);
                return Ok(responseModel);
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
                var response = await _businessLayer.GetAccountInfo(platform, membershipId);
                return Ok(response);
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
                var responseModel = await _businessLayer.GetItem(id);
                return Ok(responseModel);
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
                var responseModel = await _businessLayer.GetCharacterInventory(platform, membershipId, characterId);
                responseModel.CharacterNumber = characterNumber;
                return Ok(responseModel);
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
                var responseModel = await _businessLayer.GetAccountTriumphs(platform, membershipId);
                return Ok(responseModel);
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
                var responseModel = await _businessLayer.GetUniqueWeaponData(platform, membershipId);
                return Ok(responseModel);
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
                var responseModel = await _businessLayer.GetPlayerGrimoire(platform, membershipId);
                return Ok(responseModel);
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
                var responseModel = await _businessLayer.GetGrimoireCard(platform, membershipId, cardId, true);
                return Ok(responseModel);
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
                return Ok(model);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}