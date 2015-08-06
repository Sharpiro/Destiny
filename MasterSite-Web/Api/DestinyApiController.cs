using System;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using MasterSite_Web.Models;

namespace MasterSite_Web.Api
{
    public class DestinyApiController : ApiController
    {
        public readonly string bungieApiKey = ConfigurationManager.AppSettings.Get("bungieApiKey");
        [HttpGet]
        public IHttpActionResult SearchDestinyPlayer(int platform, string displayName)
        {
            string content;
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
                    request.Headers.Add("X-API-Key", bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    content = result.Content.ReadAsStringAsync().Result;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Async Request Failed...");
                    return InternalServerError(ex);
                };
            }
            return Json(content);
        }

        [HttpGet]
        public IHttpActionResult GetAccountInfo(int platform, ulong membershipId)
        {
            string content;
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
                    request.Headers.Add("X-API-Key", bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    content = result.Content.ReadAsStringAsync().Result;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Async Request Failed...");
                    return InternalServerError(ex);
                };
            }
            return Json(content);
        }

        [HttpGet]
        public IHttpActionResult GetItem(uint itemId, int? listNumber = null, int? listPosition = null)
        {
            string content;
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
                    request.Headers.Add("X-API-Key", bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    content = result.Content.ReadAsStringAsync().Result;
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
            var returnModel = Newtonsoft.Json.JsonConvert.SerializeObject(testModel);
            return Json(returnModel);
        }

        [HttpGet]
        public IHttpActionResult GetCharacterInventory(int platform, ulong membershipId, ulong characterId, int? characterNumber = null)
        {
            string content;
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
                    request.Headers.Add("X-API-Key", bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    content = result.Content.ReadAsStringAsync().Result;
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
            var returnModel = Newtonsoft.Json.JsonConvert.SerializeObject(testModel);
            return Json(returnModel);
        }

        [HttpGet]
        public IHttpActionResult GetAccountTriumphs(int platform, ulong membershipId)
        {
            string content;
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
                    request.Headers.Add("X-API-Key", bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    content = result.Content.ReadAsStringAsync().Result;
                    jsonContent = Newtonsoft.Json.JsonConvert.DeserializeObject(content);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Async Request Failed...");
                    return InternalServerError(ex);
                };
            }
            return Json(jsonContent);
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
                    request.Headers.Add("X-API-Key", bungieApiKey);
                    var task = client.SendAsync(request);
                    var result = task.Result;
                    var content = result.Content.ReadAsByteArrayAsync().Result;
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
            Console.WriteLine();
            return Ok();
        }
    }
}