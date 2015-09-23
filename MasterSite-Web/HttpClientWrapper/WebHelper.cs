using System;
using System.Net.Http;
using System.Threading.Tasks;
using MasterSite_Web.Models;
using MasterSite_Web.Models.Destiny;

namespace MasterSite_Web.HttpClientWrapper
{
    public static class WebHelper
    {
        public static async Task<string> GetASync(string url, HeaderModel header)
        {
            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage()
                {
                    RequestUri = new Uri(url),
                    Method = HttpMethod.Get,
                };
                request.Headers.Add(header.Name, header.Value);
                var task = client.SendAsync(request);
                var result = await task;
                var content = await result.Content.ReadAsStringAsync();
                //var responseModel = Newtonsoft.Json.JsonConvert.DeserializeObject<ResponseModel>(content);

                //if (responseModel.ErrorCode != 1)
                //{
                //    return InternalServerError(new Exception($"Error Code: {responseModel.ErrorCode}\nStatus: {responseModel.ErrorStatus}\nMessage: {responseModel.Message}"));
                //}
                //var jsonContent = Newtonsoft.Json.JsonConvert.DeserializeObject(content);
                return content;
            }
            //var data = "this is a sync data";
            //return Task.FromResult(data);
        }
    }
}