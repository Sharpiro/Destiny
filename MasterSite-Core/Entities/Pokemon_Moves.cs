using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MasterSite_Core.Entities
{
    public class Pokemon_Moves
    {
        [Key]
        [Column(Order=1)]
        public int PokemonId { get; set; }
        [Key]
        [Column(Order = 2)]
        public int MoveId { get; set; }
        public int Level { get; set; }
    }
}
