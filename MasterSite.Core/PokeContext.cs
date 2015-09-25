using System.Data.Entity;
using MasterSite.Core.Entities;

namespace MasterSite.Core
{
    public class PokeContext : DbContext
    {
        private static string name = "localdb";
        public static string Name
        {
            get
            {
#if !DEBUG
                name = "azuredb";
#endif
                return name;
            }
        }
        public PokeContext() : base(Name){}
        public DbSet<Pokemon> Pokemon { get; set; }
        public DbSet<Move> Moves { get; set; }
        public DbSet<Pokemon_Moves> Pokemon_Moves { get; set; }
    }
}
