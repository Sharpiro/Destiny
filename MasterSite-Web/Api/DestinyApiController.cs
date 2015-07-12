using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
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
            using (HttpClient client = new HttpClient())
            {
                var url = $"http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/{platform}/{displayName}/";
                var request = client.GetAsync(url);
                content = request.Result.Content.ReadAsStringAsync().Result;
            }
            var temp = new TestModel
            {
                One = 1,
                Two = 2,
                Three = 3,
                Four = 4,
                Five = 5
            };
            return Json(content);
        }

        [HttpGet]
        public IHttpActionResult GetAccountInfo(int platform, string membershipId)
        {
            string content;
            using (HttpClient client = new HttpClient())
            {
                var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/";
                var request = client.GetAsync(url);
                content = request.Result.Content.ReadAsStringAsync().Result;
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