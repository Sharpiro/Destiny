using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace MasterSite_Core.HttpClientWrapper
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
                return content;
            }
        }
    }
}