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
            var url = $"http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/{platform}/{displayName}/";
            var jsonResult = await WebHelper.GetASync(url, _bungieHeader);
            dynamic responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject(jsonResult);
            var response = new ResponseModel<object>
            {
                ErrorCode = responseModel.ErrorCode,
                ErrorStatus = responseModel.ErrorStatus,
                Message = responseModel.Message,
                Response = responseModel.Response
            };
            return Ok(response);
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
        public async Task<IHttpActionResult> GetItem(uint itemId, int? listNumber = null, int? listPosition = null)
        {
            var url = $"http://www.bungie.net/Platform/Destiny/Manifest/inventoryItem/{itemId}/";
            var result = await WebHelper.GetASync(url, _bungieHeader);
            dynamic responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject(result);
            var response = new ResponseModel<ItemModel>
            {
                ErrorCode = responseModel.ErrorCode,
                ErrorStatus = responseModel.ErrorStatus,
                Message = responseModel.Message,
                Response = new ItemModel
                {
                    ItemName = responseModel.Response.data.inventoryItem.itemName,
                    ItemDescription = responseModel.Response.data.inventoryItem.itemDescription,
                    Icon = responseModel.Response.data.inventoryItem.icon
                }
            };
            return Ok(response);
        }

        [HttpGet]
        public IHttpActionResult GetCharacterInventory(int platform, ulong membershipId, ulong characterId, int? characterNumber = null)
        {
            //object jsonContent;
            //using (var client = new HttpClient())
            //{
            //    var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Character/{characterId}/Inventory/?definitions=false";
            //    try
            //    {
            //        var request = new HttpRequestMessage()
            //        {
            //            RequestUri = new Uri(url),
            //            Method = HttpMethod.Get,
            //        };
            //        request.Headers.Add("X-API-Key", _bungieApiKey);
            //        var task = client.SendAsync(request);
            //        var result = task.Result;
            //        var content = result.Content.ReadAsStringAsync().Result;
            //        var responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject<ResponseModel<T>(content);
            //        if (responseModel.ErrorCode != 1)
            //        {
            //            return InternalServerError(new Exception($"Error Code: {responseModel.ErrorCode}\nStatus: {responseModel.ErrorStatus}\nMessage: {responseModel.Message}"));
            //        }
            //        jsonContent = Newtonsoft.Json.JsonConvert.DeserializeObject(content);
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.WriteLine("Async Request Failed...");
            //        return InternalServerError(ex);
            //    };
            //}
            //var testModel = new CharacterInventoryModel
            //{
            //    Response = jsonContent,
            //    CharacterNumber = characterNumber
            //};
            return Ok();
        }

        [HttpGet]
        public IHttpActionResult GetAccountTriumphs(int platform, ulong membershipId)
        {
            object jsonContent;
            using (var client = new HttpClient())
            {
                var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Triumphs/";
                try
                {
                    var request = new HttpRequestMessage()
                    {
                        RequestUri = new Uri(url),
                        Method = HttpMethod.Get,
                    };
                    request.Headers.Add("X-API-Key", "");
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    var content = result.Content.ReadAsStringAsync().Result;
                    var responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject<ResponseModel<string>>(content);
                    if (responseModel.ErrorCode != 1)
                    {
                        return InternalServerError(new Exception($"Error Code: {responseModel.ErrorCode}\nStatus: {responseModel.ErrorStatus}\nMessage: {responseModel.Message}"));
                    }
                    jsonContent = Newtonsoft.Json.JsonConvert.DeserializeObject(content);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Async Request Failed...");
                    return InternalServerError(ex);
                };
            }
            return Ok(jsonContent);
        }

        [HttpGet]
        public IHttpActionResult GetUniqueWeaponData(int platform, ulong membershipId)
        {
            object jsonContent;
            using (var client = new HttpClient())
            {
                var url = $"http://www.bungie.net/Platform/Destiny/Stats/UniqueWeapons/{platform}/{membershipId}/0/";
                try
                {
                    var request = new HttpRequestMessage()
                    {
                        RequestUri = new Uri(url),
                        Method = HttpMethod.Get,
                    };
                    request.Headers.Add("X-API-Key", "");
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    var content = result.Content.ReadAsStringAsync().Result;
                    var responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject<ResponseModel<string>>(content);
                    if (responseModel.ErrorCode != 1)
                    {
                        return InternalServerError(new Exception($"Error Code: {responseModel.ErrorCode}\nStatus: {responseModel.ErrorStatus}\nMessage: {responseModel.Message}"));
                    }
                    jsonContent = Newtonsoft.Json.JsonConvert.DeserializeObject(content);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Async Request Failed...");
                    return InternalServerError(ex);
                };
            }
            return Ok(jsonContent);
        }

        [HttpGet]
        public HttpResponseMessage GetImage(string iconLocation)
        {
            HttpResponseMessage responseMessage;
            using (var client = new HttpClient())
            {
                var url = $"http://www.bungie.net{iconLocation}";
                try
                {
                    var request = new HttpRequestMessage()
                    {
                        RequestUri = new Uri(url),
                        Method = HttpMethod.Get,
                    };
                    request.Headers.Add("X-API-Key", "");
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    var content = result.Content.ReadAsByteArrayAsync().Result;
                    //TODO: Error handling
                    responseMessage = new HttpResponseMessage(HttpStatusCode.OK)
                    {
                        Content = new ByteArrayContent(content),
                    };
                    responseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("image/jpeg");
                }
                catch (Exception)
                {
                    Console.WriteLine("Async Request Failed...");
                    return new HttpResponseMessage(HttpStatusCode.InternalServerError);
                };
            }
            return responseMessage;
        }
    }
}