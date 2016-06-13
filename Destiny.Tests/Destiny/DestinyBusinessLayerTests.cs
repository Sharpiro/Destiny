using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using MasterSite.Core.BusinessLogic;
using MasterSite.Core.Models.Destiny;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MasterSite.Core.DataLayer;

namespace MasterSite.Tests.Destiny
{
    [TestClass]
    public class DestinyBusinessLayerTests
    {
        private readonly DestinyBusinessService _businessLayer;

        public DestinyBusinessLayerTests()
        {
            _businessLayer = new DestinyBusinessService(new ApiHelper());
        }

        [TestMethod]
        public void SearchDestinyPlayerTest()
        {
            const int platform = 1;
            const string displayName = "sharpirox";
            var playerInfo = _businessLayer.SearchDestinyPlayer(platform, displayName).Result;
            Assert.IsNotNull(playerInfo);
            Assert.IsNotNull(playerInfo.DisplayName);
        }

        [TestMethod]
        public void GetAccountInfoTest()
        {
            const int platform = 1;
            const string membershipId = "4611686018432239086";
            var accountInfo = _businessLayer.GetAccountInfo(platform, membershipId).Result;
            Assert.IsNotNull(accountInfo);
            Assert.IsNotNull(accountInfo.HashDefinitions);
            Assert.IsNotNull(accountInfo.Characters);
            Assert.IsTrue(accountInfo.Characters.Any());
            Assert.IsTrue(accountInfo.Characters.FirstOrDefault().EquipmentList.Any());
        }

        [TestMethod]
        public void GetItemTest()
        {
            const string itemId = "2201079123";
            var responseModel = _businessLayer.GetItem(itemId).Result;
            Assert.IsNotNull(responseModel);
            Assert.IsNotNull(responseModel.ItemHash);
        }

        [TestMethod]
        public void GetCharacterInventoryTest()
        {
            const int platform = 1;
            const ulong membershipId = 4611686018432239086;
            const ulong characterId = 2305843009314356060;
            var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Character/{characterId}/Inventory/?definitions=false";
            //var result = WebHelper.GetASync(url, _bungieHeader).Result;
            //var responseModel = _businessLayer.GetCharacterInventory(result);
            //Assert.IsNotNull(responseModel);
            ////Assert.AreEqual(responseModel.Response.Items.Any(), true);
        }

        [TestMethod]
        public void GetAccountTriumphsTest()
        {
            const int platform = 1;
            const ulong membershipId = 4611686018430697411;
            var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/Triumphs/";
            //var result = WebHelper.GetASync(url, _bungieHeader).Result;
            //var responseModel = _businessLayer.GetAccountTriumphs(result);
            //Assert.IsNotNull(responseModel);
            //Assert.AreEqual(responseModel.Response.Any(), true);
        }

        [TestMethod]
        public void GetUniqueWeaponDataTest()
        {
            const int platform = 1;
            const ulong membershipId = 4611686018432239086;
            var url = $"http://www.bungie.net/Platform/Destiny/Stats/UniqueWeapons/{platform}/{membershipId}/0/";
            //var result = WebHelper.GetASync(url, _bungieHeader).Result;
            //var responseModel = _businessLayer.GetUniqueWeaponData(result);
            //Assert.IsNotNull(responseModel);
            //Assert.AreEqual(responseModel.Response.Any(), true);
        }

        [TestMethod]
        public void GetGrimoireTest()
        {
            const int platform = 1;
            const ulong membershipId = 4611686018432239086;
            //var url = $"http://www.bungie.net/Platform/Destiny/Vanguard/Grimoire/{platform}/{membershipId}/";
            //var result = WebHelper.GetASync(url, _bungieHeader).Result;
            //var responseModel = _businessLayer.GetGrimoireCard(123, result);
            //Assert.IsNotNull(responseModel);
            ////Assert.AreEqual(responseModel.Response.Any(), true);
        }

        [TestMethod]
        public void GetGrimoireCardBulkTest()
        {
            //var controller = new DestinyApiController();
            //var model = new GrimoireCardBulkModel
            //{
            //    MembershipId = 4611686018432239086,
            //    Platform = 1,
            //    Details = false,
            //    CardIds = new List<int> { 700470, 603070, 601076, 601904 }
            //};
            //var response = controller.GetGrimoireCardBulk(model);
            //var url = $"http://www.bungie.net/Platform/Destiny/Vanguard/Grimoire/{model.Platform}/{model.MembershipId}/";
            //var result = WebHelper.GetASync(url, _bungieHeader).Result;
            //var responseModel = _businessLayer.GetGrimoireCard(123, result);
            //Assert.IsNotNull(responseModel);
            //Assert.AreEqual(responseModel.Response.Any(), true);
        }
    }
}