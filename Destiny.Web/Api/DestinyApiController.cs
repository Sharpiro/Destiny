using System;
using System.Configuration;
using System.Threading.Tasks;
using System.Web.Http;
using MasterSite.Core.BusinessLogic;
using MasterSite.Core.DataLayer;

namespace MasterSite.Web.Api
{
    public class DestinyApiController : ApiController
    {
        private readonly DestinyBusinessService _businessLayer;

        public DestinyApiController()
        {
            _businessLayer = new DestinyBusinessService(new ApiHelper());
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

        //[HttpGet]
        //public async Task<IHttpActionResult> GetItem(uint id, int? listNumber = null, int? listPosition = null)
        //{
        //    try
        //    {
        //        var url = $"http://www.bungie.net/Platform/Destiny/Manifest/inventoryItem/{id}/";
        //        var result = await WebHelper.GetASync(url, _bungieHeader);
        //        var responseModel = _businessLayer.GetItem(result);
        //        return Ok(responseModel);
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpGet]
        //public async Task<IHttpActionResult> GetCharacterInventory(int platform, ulong membershipId, ulong characterId, int? characterNumber = null)
        //{
        //    try
        //    {
        //        var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Character/{characterId}/Inventory/?definitions=false";
        //        var result = await WebHelper.GetASync(url, _bungieHeader);
        //        var responseModel = _businessLayer.GetCharacterInventory(result);
        //        responseModel.Response.CharacterNumber = characterNumber;
        //        return Ok(responseModel);
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpGet]
        //public async Task<IHttpActionResult> GetAccountTriumphs(int platform, ulong membershipId)
        //{
        //    try
        //    {
        //        var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Triumphs/";
        //        var result = await WebHelper.GetASync(url, _bungieHeader);
        //        var responseModel = _businessLayer.GetAccountTriumphs(result);
        //        return Ok(responseModel);
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpGet]
        //public async Task<IHttpActionResult> GetUniqueWeaponData(int platform, ulong membershipId)
        //{
        //    try
        //    {
        //        var url = $"http://www.bungie.net/Platform/Destiny/Stats/UniqueWeapons/{platform}/{membershipId}/0/";
        //        var result = await WebHelper.GetASync(url, _bungieHeader);
        //        var responseModel = _businessLayer.GetUniqueWeaponData(result);
        //        return Ok(responseModel);
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpGet]
        //public async Task<IHttpActionResult> GetPlayerGrimoire(int platform, ulong membershipId)
        //{
        //    try
        //    {
        //        var url = $"http://www.bungie.net/Platform/Destiny/Vanguard/Grimoire/{platform}/{membershipId}/?definitions=true";
        //        var result = await WebHelper.GetASync(url, _bungieHeader);
        //        var responseModel = _businessLayer.GetPlayerGrimoire(result);
        //        return Ok(responseModel);
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpGet]
        //public async Task<IHttpActionResult> GetGrimoireCard(int platform, ulong membershipId, int cardId, bool details = false)
        //{
        //    try
        //    {
        //        var url = $"http://www.bungie.net/Platform/Destiny/Vanguard/Grimoire/{platform}/{membershipId}/?definitions=true&single={cardId}";
        //        var result = await WebHelper.GetASync(url, _bungieHeader);
        //        var responseModel = _businessLayer.GetGrimoireCard(cardId, result, details);
        //        return Ok(responseModel);
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}

        //[HttpPost]
        //public async Task<IHttpActionResult> GetGrimoireCardBulk(GrimoireCardBulkModel bulkModel)
        //{
        //    try
        //    {
        //        var grimoireCards = new List<GrimoireCard>();
        //        foreach (var cardId in bulkModel.CardIds)
        //        {
        //            var url = $"http://www.bungie.net/Platform/Destiny/Vanguard/Grimoire/{bulkModel.Platform}/{bulkModel.MembershipId}/?definitions=true&single={cardId}";
        //            var result = await WebHelper.GetASync(url, _bungieHeader);
        //            var grimoireCard = _businessLayer.GetGrimoireCard(cardId, result, bulkModel.Details).Response;
        //            grimoireCards.Add(grimoireCard);
        //        }
        //        var responseModel = new ResponseModel<List<GrimoireCard>>
        //        {
        //            ErrorCode = 1,
        //            ErrorStatus = "Success",
        //            Message = "Ok",
        //            Response = grimoireCards
        //        };
        //        return Ok(responseModel);
        //    }
        //    catch (Exception ex)
        //    {
        //        return InternalServerError(ex);
        //    }
        //}
    }
}