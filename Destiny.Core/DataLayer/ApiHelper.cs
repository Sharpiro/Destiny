using DotnetCoreTools.Core.WebHelpers;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Destiny.Core.DataLayer
{
    public class ApiHelper
    {
        private const string XApiKeyHeaderName = "X-API-Key";
        private readonly IWebHelper _webHelper;
        private readonly string _apiKey;

        public ApiHelper(IWebHelper webHelper, string apiKey)
        {
            if (webHelper == null)
                throw new ArgumentNullException(nameof(webHelper));
            if (string.IsNullOrEmpty(apiKey))
                throw new ArgumentNullException(nameof(apiKey));
            _webHelper = webHelper;
            _apiKey = apiKey;
        }
        public async Task<string> SearchDestinyPlayer(int platform, string displayName)
        {
            var url = string.Format(DestinyConstants.Urls.SearchDestinyPlayer, platform, displayName);
            var jsonResult = await GetASync(url);
            return jsonResult;
        }

        public async Task<string> GetAccountInfo(int platform, string membershipId)
        {
            var url = string.Format(DestinyConstants.Urls.GetAccountInfo, platform, membershipId);
            var jsonResult = await GetASync(url);
            return jsonResult;
        }

        public async Task<string> GetItem(string id)
        {
            var url = string.Format(DestinyConstants.Urls.GetItem, id);
            var jsonResult = await GetASync(url);
            return jsonResult;
        }

        public async Task<string> GetCharacterInventory(int platform, string membershipId, string characterId)
        {
            var url = string.Format(DestinyConstants.Urls.GetCharacterInventory, platform, membershipId, characterId);
            var jsonResult = await GetASync(url);
            return jsonResult;
        }

        public async Task<string> GetAccountTriumphs(int platform, string membershipId)
        {
            var url = string.Format(DestinyConstants.Urls.GetAccountTriumphs, platform, membershipId);
            var jsonResult = await GetASync(url);
            return jsonResult;
        }

        public async Task<string> GetUniqueWeaponData(int platform, string membershipId)
        {
            var url = string.Format(DestinyConstants.Urls.GetUniqueWeaponData, platform, membershipId);
            var jsonResult = await GetASync(url);
            return jsonResult;
        }

        public async Task<string> GetPlayerGrimoire(int platform, string membershipId)
        {
            var url = string.Format(DestinyConstants.Urls.GetPlayerGrimoire, platform, membershipId);
            var jsonResult = await GetASync(url);
            return jsonResult;
        }

        public async Task<string> GetGrimoireCard(int platform, string membershipId, string cardId = null, bool details = false)
        {
            var url = string.Format(DestinyConstants.Urls.GetGrimoireCard, platform, membershipId, cardId, details);
            var jsonResult = await GetASync(url);
            return jsonResult;
        }

        private async Task<string> GetASync(string url)
        {
            var headers = new Dictionary<string, string> { [XApiKeyHeaderName] = _apiKey };
            return await _webHelper.GetASync(url, headers);
        }
    }
}