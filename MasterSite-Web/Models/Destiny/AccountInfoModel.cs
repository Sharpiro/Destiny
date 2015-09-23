using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MasterSite_Web.Models.Destiny
{
    public class AccountInfoModel
    {
        public HashDefinitions HashDefinitions { get; set; }
        public IEnumerable<CharacterModel> CharacterModels { get; set; }
    }

    public class HashDefinitions
    {
        public dynamic Items { get; set; }
    }

    public class CharacterModel
    {
        public ulong CharacterId { get; set; }
        public string BackgroundPath { get; set; }
        public int BaseCharacterLevel { get; set; }
        public string EmblemHash { get; set; }
        public string EmblemPath { get; set; }
        public ulong ClassHash { get; set; }
        public ulong GenderHash { get; set; }
        public ulong RaceHash { get; set; }
        public List<Equipment> EquipmentList { get; set; }
        public int PowerLevel { get; set; }
    }

    public class Equipment
    {
        [JsonProperty("itemHash")]
        public ulong ItemHash { get; set; }
    }
}