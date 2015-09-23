using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Linq.Dynamic;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using MasterSite_Web.HttpClientWrapper;
using MasterSite_Web.Models;
using MasterSite_Web.Models.Destiny;
using Microsoft.Owin.Security.Provider;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using WebGrease.Css.Extensions;

namespace MasterSite_Web.Api
{
    public class DestinyApiController : ApiController
    {
        private readonly HeaderModel _bungieHeader;

        public DestinyApiController()
        {
            _bungieHeader = new HeaderModel
            {
                Name = "X-API-Key",
                Value = ConfigurationManager.AppSettings.Get("bungieApiKey")
            };
        }

        [HttpGet]
        public async Task<IHttpActionResult> SearchDestinyPlayer(int platform, string displayName)
        {
            var url = $"http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/{platform}/{displayName}/";
            var result = await WebHelper.GetASync(url, _bungieHeader);
            dynamic responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject(result);
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
            var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/?definitions=true";
            var result = await WebHelper.GetASync(url, _bungieHeader);
            dynamic dynamicData = JsonConvert.DeserializeObject(result);
            var definitions = dynamicData.Response.definitions.items;

            foreach (var definition in definitions)
            {
                var tempJObject = new JObject();
                try
                {
                    tempJObject.Add(definition.Value.Property("itemName"));
                    tempJObject.Add(definition.Value.Property("icon"));
                    tempJObject.Add(definition.Value.Property("itemDescription"));
                }
                catch (Exception)
                {
                    // one or more properties was not available
                }
                definition.Value = tempJObject;
            }
            IEnumerable<dynamic> list = dynamicData.Response.data.characters;
            var characters = list.Select(c => new CharacterModel
            {
                BackgroundPath = c.backgroundPath,
                BaseCharacterLevel = c.baseCharacterLevel,
                EmblemHash = c.emblemHash,
                EmblemPath = c.emblemPath,
                CharacterId = c.characterBase.characterId,
                ClassHash = c.characterBase.classHash,
                GenderHash = c.characterBase.genderHash,
                RaceHash = c.characterBase.raceHash,
                PowerLevel = c.characterBase.powerLevel,
                EquipmentList = c.characterBase.peerView.equipment.ToObject<IList<Equipment>>()
            });

            var response = new ResponseModel<AccountInfoModel>
            {
                ErrorCode = dynamicData.ErrorCode,
                ErrorStatus = dynamicData.ErrorStatus,
                Message = dynamicData.Message,
                Response = new AccountInfoModel
                {
                    HashDefinitions = new HashDefinitions
                    {
                        Items = definitions
                    },
                    CharacterModels = characters
                }
            };
            return Ok(response);
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