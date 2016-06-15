using System.Collections.Generic;

namespace Destiny.Core.Models
{
    public class CharacterInventoryModel
    {
        public IEnumerable<ItemModel> Items { get; set; }
        public int? CharacterNumber { get; set; }
    }
}