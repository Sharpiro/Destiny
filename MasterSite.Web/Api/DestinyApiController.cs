using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using MasterSite.Core.BusinessLogic;
using MasterSite.Core.HttpClientWrapper;
using MasterSite.Core.Models.Destiny;
using Newtonsoft.Json.Linq;

namespace MasterSite.Web.Api
{
    public class DestinyApiController : ApiController
    {
        private readonly HeaderModel _bungieHeader;
        private readonly DestinyBusinessService _businessLayer;

        public DestinyApiController()
        {
            _bungieHeader = new HeaderModel
            {
                Name = "X-API-Key",
                Value = ConfigurationManager.AppSettings.Get("bungieApiKey")
            };
            _businessLayer = new DestinyBusinessService();
        }

        [HttpGet]
        public async Task<IHttpActionResult> SearchDestinyPlayer(int platform, string displayName)
        {
            try
            {
                var url = $"http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/{platform}/{displayName}/";
                var jsonResult = await WebHelper.GetASync(url, _bungieHeader);
                var responseModel = _businessLayer.SearchDestinyPlayer(jsonResult);
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetAccountInfo(int platform, ulong membershipId)
        {
            try
            {
                var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/?definitions=true";
                var jsonResult = await WebHelper.GetASync(url, _bungieHeader);
                var response = _businessLayer.GetAccountInfo(jsonResult);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetItem(uint id, int? listNumber = null, int? listPosition = null)
        {
            try
            {
                var url = $"http://www.bungie.net/Platform/Destiny/Manifest/inventoryItem/{id}/";
                var result = await WebHelper.GetASync(url, _bungieHeader);
                var responseModel = _businessLayer.GetItem(result);
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetCharacterInventory(int platform, ulong membershipId, ulong characterId, int? characterNumber = null)
        {
            try
            {
                var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Character/{characterId}/Inventory/?definitions=false";
                var result = await WebHelper.GetASync(url, _bungieHeader);
                var responseModel = _businessLayer.GetCharacterInventory(result);
                responseModel.Response.CharacterNumber = characterNumber;
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetAccountTriumphs(int platform, ulong membershipId)
        {
            try
            {
                var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Triumphs/";
                var result = await WebHelper.GetASync(url, _bungieHeader);
                var responseModel = _businessLayer.GetAccountTriumphs(result);
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetUniqueWeaponData(int platform, ulong membershipId)
        {
            try
            {
                var url = $"http://www.bungie.net/Platform/Destiny/Stats/UniqueWeapons/{platform}/{membershipId}/0/";
                var result = await WebHelper.GetASync(url, _bungieHeader);
                var responseModel = _businessLayer.GetUniqueWeaponData(result);
                return Ok(responseModel);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
    }
}