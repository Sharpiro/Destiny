using System;
using System.Threading.Tasks;
using MasterSite_Core.HttpClientWrapper;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MasterSite_Test
{
    [TestClass]
    public class DestinyApiControllerTests
    {
        [TestMethod]
        public async Task GetAccountInfoTest()
        {
            const string url = "http://abcd:2555/api/DestinyApi/GetAccountInfo";
            var result = await WebHelper.GetASync(url, null);
        }
    }
}
