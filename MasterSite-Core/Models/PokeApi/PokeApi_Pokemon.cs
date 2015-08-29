using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace MasterSite_Core.Models.PokeApi
{
    public class PokeApi_Pokemon
    {
        public IEnumerable<PokeApi_Move> Moves { get; set; }
        public string Name { get; set; }
        [JsonProperty(PropertyName = "national_id")]
        public int NationalId { get; set; }
    }
}
