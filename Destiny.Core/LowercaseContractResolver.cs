using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Destiny.Core
{
    public class LowercaseContractResolver : DefaultContractResolver
    {
        protected override string ResolvePropertyName(string propertyName)
        {
            var newName = propertyName.Select((a, b) => (b != 0) ? a : char.ToLower(a));
            return new string(newName.ToArray());
        }
    }

    public class CamelCaseSerializerSettings : JsonSerializerSettings
    {
        public CamelCaseSerializerSettings()
        {
            ContractResolver = new LowercaseContractResolver();
        }
    }
}
