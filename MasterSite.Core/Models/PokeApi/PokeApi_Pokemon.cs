using System.Collections.Generic;
using Newtonsoft.Json;

namespace MasterSite.Core.Models.PokeApi
{
    public class PokeApi_Pokemon
    {
        public IEnumerable<PokeApi_Move> Moves { get; set; }
        public string Name { get; set; }
        [JsonProperty(PropertyName = "national_id")]
        public int NationalId { get; set; }
    }
}
