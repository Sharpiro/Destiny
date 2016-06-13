using DotnetCoreTools.Core.WebHelpers;
using System;
using System.Configuration;
using System.Threading.Tasks;

namespace MasterSite.Core.DataLayer
{
    public class ApiHelper
    {
        private readonly HeaderModel _bungieHeader;

        public ApiHelper()
        {
            _bungieHeader = new HeaderModel
            {
                Name = "X-API-Key",
                Value = ConfigurationManager.AppSettings.Get("bungieApiKey")
            };
        }
        public async Task<string> SearchDestinyPlayer(int platform, string displayName)
        {
            var url = string.Format(DestinyConstants.Urls.SearchDestinyPlayer, platform, displayName);
            var jsonResult = await WebHelper.GetASync(url, _bungieHeader);
            return jsonResult;
        }

        public async Task<string> GetAccountInfo(int platform, string membershipId)
        {
            var url = string.Format(DestinyConstants.Urls.GetAccountInfo, platform, membershipId);
            var jsonResult = await WebHelper.GetASync(url, _bungieHeader);
            return jsonResult;
        }

        public async Task<string> GetItem(string id)
        {
            var url = string.Format(DestinyConstants.Urls.GetItem, id);
            var jsonResult = await WebHelper.GetASync(url, _bungieHeader);
            return jsonResult;
        }
    }
}