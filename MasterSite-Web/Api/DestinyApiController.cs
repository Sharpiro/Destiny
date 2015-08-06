using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web.Http;
using MasterSite_Web.Models;
using Microsoft.Owin.Security.Provider;

namespace MasterSite_Web.Api
{
    public class DestinyApiController : ApiController
    {
        private readonly string _bungieApiKey = ConfigurationManager.AppSettings.Get("bungieApiKey");
        [HttpGet]
        public IHttpActionResult SearchDestinyPlayer(int platform, string displayName)
        {
            string content;
            object jsonContent;
            using (var client = new HttpClient())
            {
                var url = $"http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/{platform}/{displayName}/";
                try
                {
                    var request = new HttpRequestMessage()
                    {
                        RequestUri = new Uri(url),
                        Method = HttpMethod.Get,
                    };
                    request.Headers.Add("X-API-Key", _bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    content = result.Content.ReadAsStringAsync().Result;
                    var responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject<ResponseModel>(content);
                    if (responseModel.ErrorCode != 1)
                    {
                        return InternalServerError(new Exception(responseModel.Message));
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
        public IHttpActionResult GetAccountInfo(int platform, ulong membershipId)
        {
            object jsonContent;
            using (var client = new HttpClient())
            {
                var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/";
                try
                {
                    var request = new HttpRequestMessage()
                    {
                        RequestUri = new Uri(url),
                        Method = HttpMethod.Get,
                    };
                    request.Headers.Add("X-API-Key", _bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    var content = result.Content.ReadAsStringAsync().Result;
                    var responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject<ResponseModel>(content);
                    if (responseModel.ErrorCode != 1)
                    {
                        return InternalServerError(new Exception(responseModel.Message));
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
        public IHttpActionResult GetItem(uint itemId, int? listNumber = null, int? listPosition = null)
        {
            object jsonContent;
            using (var client = new HttpClient())
            {
                var url = $"http://www.bungie.net/Platform/Destiny/Manifest/inventoryItem/{itemId}/";
                try
                {
                    var request = new HttpRequestMessage()
                    {
                        RequestUri = new Uri(url),
                        Method = HttpMethod.Get,
                    };
                    request.Headers.Add("X-API-Key", _bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    var content = result.Content.ReadAsStringAsync().Result;
                    var responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject<ResponseModel>(content);
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
            var testModel = new ItemModel
            {
                Response = jsonContent,
                ListNumber = listNumber,
                ListPosition = listPosition
            };
            //var returnModel = Newtonsoft.Json.JsonConvert.SerializeObject(testModel);
            return Ok(testModel);
        }

        [HttpGet]
        public IHttpActionResult GetCharacterInventory(int platform, ulong membershipId, ulong characterId, int? characterNumber = null)
        {
            object jsonContent;
            using (var client = new HttpClient())
            {
                var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Character/{characterId}/Inventory/?definitions=false";
                try
                {
                    var request = new HttpRequestMessage()
                    {
                        RequestUri = new Uri(url),
                        Method = HttpMethod.Get,
                    };
                    request.Headers.Add("X-API-Key", _bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    var content = result.Content.ReadAsStringAsync().Result;
                    var responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject<ResponseModel>(content);
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
            var testModel = new CharacterInventoryModel
            {
                Response = jsonContent,
                CharacterNumber = characterNumber
            };
            return Ok(testModel);
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
                    request.Headers.Add("X-API-Key", _bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    var content = result.Content.ReadAsStringAsync().Result;
                    var responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject<ResponseModel>(content);
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
            var contentList = new List<object>();
            using (var client = new HttpClient())
            {
                for (var i = 0; i < 3; i++)
                {
                    var url = $"http://www.bungie.net/Platform/Destiny/Stats/UniqueWeapons/{platform}/{membershipId}/{i}";
                    try
                    {
                        var request = new HttpRequestMessage()
                        {
                            RequestUri = new Uri(url),
                            Method = HttpMethod.Get,
                        };
                        request.Headers.Add("X-API-Key", _bungieApiKey);
                        var task = client.SendAsync(request);
                        var result = task.Result;
                        var content = result.Content.ReadAsStringAsync().Result;
                        var responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject<ResponseModel>(content);
                        if (responseModel.ErrorCode != 1)
                        {
                            return InternalServerError(new Exception($"Error Code: {responseModel.ErrorCode}\nStatus: {responseModel.ErrorStatus}\nMessage: {responseModel.Message}"));
                        }
                        var jsonContent = Newtonsoft.Json.JsonConvert.DeserializeObject(content);
                        contentList.Add(jsonContent);
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Async Request Failed...");
                        return InternalServerError(ex);
                    };
                }
            }
            return Ok(contentList);
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
                    request.Headers.Add("X-API-Key", _bungieApiKey);
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

        [HttpPost]
        public IHttpActionResult Post()
        {
            return Ok();
        }
    }
}