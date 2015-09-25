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
        public JObject HashDefinitions { get; set; }
        public IEnumerable<CharacterModel> Characters { get; set; }
    }

    public class CharacterModel
    {
        public string CharacterId { get; set; }
        public string BackgroundPath { get; set; }
        public int BaseCharacterLevel { get; set; }
        public ulong EmblemHash { get; set; }
        public string EmblemPath { get; set; }
        public ulong ClassHash { get; set; }
        public ulong GenderHash { get; set; }
        public ulong RaceHash { get; set; }
        public List<string> EquipmentList { get; set; }
        public int PowerLevel { get; set; }
    }
}