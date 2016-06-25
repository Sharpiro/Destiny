using System.Collections.Generic;
using Newtonsoft.Json.Linq;

namespace Destiny.Core.Models
{
    public class AccountInfoModel
    {
        public JObject HashDefinitions { get; set; }
        public IEnumerable<CharacterModel> Characters { get; set; }
    }
}