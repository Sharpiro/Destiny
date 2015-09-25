using System.Data.Entity.Migrations;

namespace MasterSite.Core.Migrations
{
    public partial class Junction : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Pokemon_Moves",
                c => new
                    {
                        PokemonId = c.Int(nullable: false),
                        MoveId = c.Int(nullable: false),
                        Level = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.PokemonId, t.MoveId });
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Pokemon_Moves");
        }
    }
}
