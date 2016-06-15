using DotnetCoreTools.Core.WebHelpers;
using System;
using System.Configuration;
using System.Threading.Tasks;

namespace Destiny.Core.DataLayer
{
    public class ApiHelper
    {
        private readonly HeaderModel _bungieHeader;
        private readonly IWebHelper _webHelper;

        public ApiHelper(IWebHelper webHelper)
        {
            _webHelper = webHelper;
            _bungieHeader = new HeaderModel
            {
                Name = "X-API-Key",
                Value = ConfigurationManager.AppSettings.Get("bungieApiKey")
            };
        }
        public async Task<string> SearchDestinyPlayer(int platform, string displayName)
        {
            var url = string.Format(DestinyConstants.Urls.SearchDestinyPlayer, platform, displayName);
            var jsonResult = await _webHelper.GetASync(url, _bungieHeader);
            return jsonResult;
        }

        public async Task<string> GetAccountInfo(int platform, string membershipId)
        {
            var url = string.Format(DestinyConstants.Urls.GetAccountInfo, platform, membershipId);
            var jsonResult = await _webHelper.GetASync(url, _bungieHeader);
            return jsonResult;
        }

        public async Task<string> GetItem(string id)
        {
            var url = string.Format(DestinyConstants.Urls.GetItem, id);
            var jsonResult = await _webHelper.GetASync(url, _bungieHeader);
            return jsonResult;
        }
    }
}