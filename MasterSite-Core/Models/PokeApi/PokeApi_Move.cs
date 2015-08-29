using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MasterSite_Core.Models.PokeApi
{
    public class PokeApi_Move
    {
        [JsonProperty(PropertyName = "learn_type")]
        public string LearnType { get; set; }
        public int Level { get; set; }
        public string Name { get; set; }
        [JsonProperty(PropertyName = "resource_uri")]
        public string ResourceUri { get; set; }
    }
}
