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
        public IHttpActionResult GetAccountInfo(int platform, string membershipId)
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

        [HttpPost]
        public IHttpActionResult Post()
        {
            Console.WriteLine();
            return Ok();
        }
    }
}