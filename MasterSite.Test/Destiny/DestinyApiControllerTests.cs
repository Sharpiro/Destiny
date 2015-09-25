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
        public void GetAccountInfoTest()
        {
            var platform = 1;
            var membershipId = 4611686018432239086;
            var url = $"http://www.bungie.net/Platform/Destiny/{platform}/Account/{membershipId}/?definitions=true";
            var result = WebHelper.GetASync(url, _bungieHeader).Result;
            var accountInfo = _businessLayer.GetAccountInfo(result);
            Assert.IsNotNull(accountInfo);
            Assert.IsNotNull(accountInfo.Response.HashDefinitions);
            Assert.IsNotNull(accountInfo.Response.Characters);
            Assert.AreNotEqual(accountInfo.Response.Characters.Count(), 0);
            Assert.AreNotEqual(accountInfo.Response.Characters.ToArray()[0].EquipmentList?.Count(), 0);
        }
    }
}
