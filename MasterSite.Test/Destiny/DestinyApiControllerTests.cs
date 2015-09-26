using System.Configuration;
using System.Linq;
using MasterSite.Core.BusinessLogic;
using MasterSite.Core.HttpClientWrapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MasterSite.Tests.Destiny
{
    [TestClass]
    public class DestinyApiControllerTests
    {
        private readonly DestinyBusinessService _businessLayer;
        private readonly HeaderModel _bungieHeader;

        public DestinyApiControllerTests()
        {
            _businessLayer = new DestinyBusinessService();
            _bungieHeader = new HeaderModel
            {
                Name = "X-API-Key",
                Value = ConfigurationManager.AppSettings.Get("bungieApiKey")
            };
        }

        [TestMethod]
        public void SearchDestinyPlayerTest()
        {
            const int platform = 1;
            const string displayName = "sharpirox";
            var url = $"http://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/{platform}/{displayName}/";
            var jsonResult = WebHelper.GetASync(url, _bungieHeader).Result;
            var playerInfo = _businessLayer.SearchDestinyPlayer(jsonResult);
            Assert.IsNotNull(playerInfo);
        }

        [TestMethod]
        public void GetAccountInfoTest()
        {
            const int platform = 1;
            const ulong membershipId = 4611686018432239086;
            var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/?definitions=true";
            var result = WebHelper.GetASync(url, _bungieHeader).Result;
            var accountInfo = _businessLayer.GetAccountInfo(result);
            Assert.IsNotNull(accountInfo);
            Assert.IsNotNull(accountInfo.Response.HashDefinitions);
            Assert.IsNotNull(accountInfo.Response.Characters);
            Assert.AreNotEqual(accountInfo.Response.Characters.Count(), 0);
            Assert.AreNotEqual(accountInfo.Response.Characters.ToArray()[0].EquipmentList?.Count(), 0);
        }

        [TestMethod]
        public void GetItemTest()
        {
            const ulong itemId = 2201079123;
            var url = $"http://www.bungie.net/Platform/Destiny/Manifest/inventoryItem/{itemId}/";
            var result = WebHelper.GetASync(url, _bungieHeader).Result;
            var responseModel = _businessLayer.GetItem(result);
            Assert.IsNotNull(responseModel);
            Assert.IsNotNull(responseModel.Response.ItemHash);
        }

        [TestMethod]
        public void GetCharacterInventoryTest()
        {
            const int platform = 1;
            const ulong membershipId = 4611686018432239086;
            const ulong characterId = 2305843009314356060;
            var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Character/{characterId}/Inventory/?definitions=false";
            var result = WebHelper.GetASync(url, _bungieHeader).Result;
            var responseModel = _businessLayer.GetCharacterInventory(result);
            Assert.IsNotNull(responseModel);
            Assert.AreEqual(responseModel.Response.Items.Any(), true);
        }

        [TestMethod]
        public void GetAccountTriumphsTest()
        {
            const int platform = 1;
            const ulong membershipId = 4611686018430697411;
            var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Triumphs/";
            var result = WebHelper.GetASync(url, _bungieHeader).Result;
            var responseModel = _businessLayer.GetAccountTriumphs(result);
            Assert.IsNotNull(responseModel);
            Assert.AreEqual(responseModel.Response.Any(), true);
        }

        [TestMethod]
        public void GetUniqueWeaponDataTest()
        {
            const int platform = 1;
            const ulong membershipId = 4611686018432239086;
            var url = $"http://www.bungie.net/Platform/Destiny/Stats/UniqueWeapons/{platform}/{membershipId}/0/";
            var result = WebHelper.GetASync(url, _bungieHeader).Result;
            var responseModel = _businessLayer.GetUniqueWeaponData(result);
            Assert.IsNotNull(responseModel);
            Assert.AreEqual(responseModel.Response.Any(), true);
        }
    }
}
