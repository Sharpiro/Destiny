using System.Collections.Generic;

namespace MasterSite.Core.Models.Destiny
{
    public class CharacterInventoryModel
    {
        public List<ItemModel> Items { get; set; }
        public int? CharacterNumber { get; set; }
    }
}