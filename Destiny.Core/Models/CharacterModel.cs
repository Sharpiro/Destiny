using System.Collections.Generic;

namespace Destiny.Core.Models
{
    public class CharacterModel
    {
        public string CharacterId { get; set; }
        public string BackgroundPath { get; set; }
        public int? BaseCharacterLevel { get; set; }
        public string EmblemHash { get; set; }
        public string EmblemPath { get; set; }
        public string ClassHash { get; set; }
        public string GenderHash { get; set; }
        public string RaceHash { get; set; }
        public IEnumerable<string> EquipmentList { get; set; }
        public int? PowerLevel { get; set; }
    }
}
