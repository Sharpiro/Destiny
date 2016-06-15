﻿using System.Linq;
using Destiny.Core.BusinessLogic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Destiny.Core.DataLayer;
using DotnetCoreTools.Core.WebHelpers;

namespace Destiny.Tests.Destiny
{
    [TestClass]
    public class DestinyBusinessLayerTests
    {
        private readonly DestinyBusinessService _businessLayer;

        public DestinyBusinessLayerTests()
        {
            _businessLayer = new DestinyBusinessService(new ApiHelper(new WebHelper()));
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
            Assert.IsNotNull(accountInfo.Characters.FirstOrDefault().ClassHash);
            Assert.IsNotNull(accountInfo.Characters.FirstOrDefault().EquipmentList.FirstOrDefault());
        }

        [TestMethod]
        public void GetItemTest()
        {
            const string itemId = "2201079123";
            var responseModel = _businessLayer.GetItem(itemId).Result;
            Assert.IsNotNull(responseModel);
            Assert.AreEqual(itemId, responseModel.ItemHash);
            Assert.IsNotNull(responseModel.ItemName);
        }

        [TestMethod]
        public void GetCharacterInventoryTest()
        {
            const int platform = 1;
            const ulong membershipId = 4611686018432239086;
            const ulong characterId = 2305843009314356060;
            var model = _businessLayer.GetCharacterInventory(platform, membershipId, characterId).Result;
            Assert.IsNotNull(model);
            Assert.AreEqual(model.Items.Any(), true);
            Assert.IsNotNull(model.Items.FirstOrDefault().ItemHash);
        }

        [TestMethod]
        public void GetAccountTriumphsTest()
        {
            const int platform = 1;
            const ulong membershipId = 4611686018430697411;
            var model = _businessLayer.GetAccountTriumphs(platform, membershipId).Result;
            Assert.IsNotNull(model);
            Assert.IsTrue(model.Any());
        }

        //[TestMethod]
        //public void GetUniqueWeaponDataTest()
        //{
        //    const int platform = 1;
        //    const ulong membershipId = 4611686018432239086;
        //    var url = $"http://www.bungie.net/Platform/Destiny/Stats/UniqueWeapons/{platform}/{membershipId}/0/";
        //    //var result = WebHelper.GetASync(url, _bungieHeader).Result;
        //    //var responseModel = _businessLayer.GetUniqueWeaponData(result);
        //    //Assert.IsNotNull(responseModel);
        //    //Assert.AreEqual(responseModel.Response.Any(), true);
        //}

        //[TestMethod]
        //public void GetGrimoireTest()
        //{
        //    const int platform = 1;
        //    const ulong membershipId = 4611686018432239086;
        //    //var url = $"http://www.bungie.net/Platform/Destiny/Vanguard/Grimoire/{platform}/{membershipId}/";
        //    //var result = WebHelper.GetASync(url, _bungieHeader).Result;
        //    //var responseModel = _businessLayer.GetGrimoireCard(123, result);
        //    //Assert.IsNotNull(responseModel);
        //    ////Assert.AreEqual(responseModel.Response.Any(), true);
        //}

        //[TestMethod]
        //public void GetGrimoireCardBulkTest()
        //{
        //    //var controller = new DestinyApiController();
        //    //var model = new GrimoireCardBulkModel
        //    //{
        //    //    MembershipId = 4611686018432239086,
        //    //    Platform = 1,
        //    //    Details = false,
        //    //    CardIds = new List<int> { 700470, 603070, 601076, 601904 }
        //    //};
        //    //var response = controller.GetGrimoireCardBulk(model);
        //    //var url = $"http://www.bungie.net/Platform/Destiny/Vanguard/Grimoire/{model.Platform}/{model.MembershipId}/";
        //    //var result = WebHelper.GetASync(url, _bungieHeader).Result;
        //    //var responseModel = _businessLayer.GetGrimoireCard(123, result);
        //    //Assert.IsNotNull(responseModel);
        //    //Assert.AreEqual(responseModel.Response.Any(), true);
        //}
    }
}