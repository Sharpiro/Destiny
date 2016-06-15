using System.Collections.Generic;

namespace Destiny.Core.Models.Destiny
{
    public class CharacterInventoryModel
    {
        public List<ItemModel> Items { get; set; }
        public int? CharacterNumber { get; set; }
    }
}