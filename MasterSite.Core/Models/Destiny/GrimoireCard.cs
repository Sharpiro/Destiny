﻿using Newtonsoft.Json;

namespace MasterSite.Core.Models.Destiny
{
    public class GrimoireCard
    {
        [JsonProperty("id")]
        public int? Id { get; set; }
        [JsonProperty("name")]
        public string Name { get; set; }
        [JsonProperty("intro")]
        public string Intro { get; set; }
        [JsonProperty("description")]
        public string Description { get; set; }
        [JsonProperty("acquired")]
        public bool Acquired { get; set; }
    }
}
