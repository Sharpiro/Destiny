using System.Linq;
using Destiny.Core.BusinessLogic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Destiny.Core.DataLayer;
using DotnetCoreTools.Core.WebHelpers;
using System.Configuration;
using Destiny.Core.Models;
using System.Collections.Generic;
using DotnetCoreTools.Core.SimpleAutoMapper;

namespace Destiny.Tests.Destiny
{
    [TestClass]
    public class DestinyBusinessLayerTests
    {
        private readonly IDestinyBusinessService _businessLayer;

        public DestinyBusinessLayerTests()
        {
            var key = ConfigurationManager.AppSettings["bungieApiKey"];
            _businessLayer = new DestinyBusinessService(new ApiHelper(new WebHelper(), key), new SimpleMapper());
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
            const string membershipId = "4611686018432239086";
            const string characterId = "2305843009314356060";
            var model = _businessLayer.GetCharacterInventory(platform, membershipId, characterId).Result;
            Assert.IsNotNull(model);
            Assert.AreEqual(model.Items.Any(), true);
            Assert.IsNotNull(model.Items.FirstOrDefault().ItemHash);
        }

        [TestMethod]
        public void GetAccountTriumphsTest()
        {
            const int platform = 1;
            const string membershipId = "4611686018430697411";
            var model = _businessLayer.GetAccountTriumphs(platform, membershipId).Result;
            Assert.IsNotNull(model);
            Assert.IsTrue(model.Any());
        }

        [TestMethod]
        public void GetUniqueWeaponDataTest()
        {
            const int platform = 1;
            const string membershipId = "4611686018432239086";
            var weapons = _businessLayer.GetUniqueWeaponData(platform, membershipId).Result;
            Assert.IsNotNull(weapons);
            Assert.IsTrue(weapons.Any());
            Assert.IsNotNull(weapons.FirstOrDefault());
        }

        [TestMethod]
        public void GetPlayerGrimoireTest()
        {
            const int platform = 1;
            const string membershipId = "4611686018432239086";
            var cards = _businessLayer.GetPlayerGrimoire(platform, membershipId).Result;
            Assert.IsNotNull(cards);
            Assert.IsTrue(cards.Any());
            Assert.IsNotNull(cards.FirstOrDefault().Id);
        }

        [TestMethod]
        public void GetGrimoireCardTest()
        {
            const int platform = 1;
            const string membershipId = "4611686018432239086";
            const string cardId = "101010";
            var card = _businessLayer.GetGrimoireCard(platform, membershipId, cardId, true).Result;
            var cardNoDetails = _businessLayer.GetGrimoireCard(platform, membershipId, cardId, false).Result;
            Assert.AreEqual(5, card.Score);
            Assert.IsNotNull(card.Description);
            Assert.IsNull(cardNoDetails.Description);
        }

        [TestMethod]
        public void GetGrimoireCardBulkTest()
        {
            var model = new GrimoireCardBulkModel
            {
                MembershipId = "4611686018432239086",
                Platform = 1,
                Details = false,
                CardIds = new List<string> { "700470", "603070", "601076", "601904" }
            };
            var cards = _businessLayer.GetGrimoireCards(model).Result;
            Assert.IsNotNull(cards);
            Assert.IsTrue(cards.Any());
            Assert.AreEqual(model.CardIds.FirstOrDefault(), cards.FirstOrDefault().Id);
        }
    }
}