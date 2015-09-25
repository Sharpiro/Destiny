using System.Data.Entity.Migrations;

namespace MasterSite.Core.Migrations
{
    public partial class _08291 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Moves", "MoveId", c => c.Int(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Moves", "MoveId");
        }
    }
}
