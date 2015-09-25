using System.Data.Entity.Migrations;

namespace MasterSite.Core.Migrations
{
    public partial class WHATEVER : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Moves",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Type = c.String(),
                        Category = c.String(),
                        Power = c.Int(),
                        Accuracy = c.Int(),
                        PowerPoints = c.Int(),
                        TechnicalMachine = c.String(),
                        Effect = c.String(),
                        Probability = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Pokemons",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        PokeId = c.Int(nullable: false),
                        Name = c.String(),
                        Type = c.String(),
                        Total = c.Int(nullable: false),
                        HP = c.Int(nullable: false),
                        Attack = c.Int(nullable: false),
                        Defense = c.Int(nullable: false),
                        SpAtk = c.Int(nullable: false),
                        SpDef = c.Int(nullable: false),
                        Speed = c.Int(nullable: false),
                        MoveFour_Id = c.Int(),
                        MoveOne_Id = c.Int(),
                        MoveThree_Id = c.Int(),
                        MoveTwo_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Moves", t => t.MoveFour_Id)
                .ForeignKey("dbo.Moves", t => t.MoveOne_Id)
                .ForeignKey("dbo.Moves", t => t.MoveThree_Id)
                .ForeignKey("dbo.Moves", t => t.MoveTwo_Id)
                .Index(t => t.MoveFour_Id)
                .Index(t => t.MoveOne_Id)
                .Index(t => t.MoveThree_Id)
                .Index(t => t.MoveTwo_Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Pokemons", "MoveTwo_Id", "dbo.Moves");
            DropForeignKey("dbo.Pokemons", "MoveThree_Id", "dbo.Moves");
            DropForeignKey("dbo.Pokemons", "MoveOne_Id", "dbo.Moves");
            DropForeignKey("dbo.Pokemons", "MoveFour_Id", "dbo.Moves");
            DropIndex("dbo.Pokemons", new[] { "MoveTwo_Id" });
            DropIndex("dbo.Pokemons", new[] { "MoveThree_Id" });
            DropIndex("dbo.Pokemons", new[] { "MoveOne_Id" });
            DropIndex("dbo.Pokemons", new[] { "MoveFour_Id" });
            DropTable("dbo.Pokemons");
            DropTable("dbo.Moves");
        }
    }
}
