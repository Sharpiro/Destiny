using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;
using MasterSite_Web.Models;

namespace MasterSite_Web
{
    public class DestinyApiController : ApiController
    {
        [HttpGet]
        public IHttpActionResult SearchDestinyPlayer(int platform, string displayName)
        {
            string content;
            using (var client = new HttpClient())
            {
                var url = $"http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/{platform}/{displayName}/";
                try
                {
                    var request = client.GetAsync(url);
                    content = request.Result.Content.ReadAsStringAsync().Result;
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
                    var request = client.GetAsync(url);
                    content = request.Result.Content.ReadAsStringAsync().Result;
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
                    var request = client.GetAsync(url);
                    content = request.Result.Content.ReadAsStringAsync().Result;
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
                    var request = client.GetAsync(url);
                    content = request.Result.Content.ReadAsStringAsync().Result;
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
                    var request = client.GetAsync(url);
                    content = request.Result.Content.ReadAsStringAsync().Result;
                    jsonContent = Newtonsoft.Json.JsonConvert.DeserializeObject(content);
                }
                catch (Exception ex)
                {
                    Console.WriteLine("Async Request Failed...");
                    return InternalServerError(ex);
                };
            }
            //var returnModel = Newtonsoft.Json.JsonConvert.SerializeObject(testModel);
            return Json(jsonContent);
        }

        [HttpPost]
        public IHttpActionResult Post()
        {
            Console.WriteLine();
            return Ok();
        }
    }
}