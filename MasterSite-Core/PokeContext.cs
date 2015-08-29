using System.Data.Entity;
using MasterSite_Core.Entities;

namespace MasterSite_Core
{
    public class PokeContext: DbContext
    {
        public PokeContext() : base("Default"){}
        public DbSet<Pokemon> Pokemon { get; set; }
        public DbSet<Move> Moves { get; set; }
    }
}
