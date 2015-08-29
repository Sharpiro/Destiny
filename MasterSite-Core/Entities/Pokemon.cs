namespace MasterSite_Core.Entities
{
    public class Pokemon
    {
        public int Id { get; set; }
        public int PokeId { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public int Total { get; set; }
        public int HP { get; set; }
        public int Attack { get; set; }
        public int Defense { get; set; }
        public int SpAtk { get; set; }
        public int SpDef { get; set; }
        public int Speed { get; set; }
        public Move MoveOne { get; set; }
        public Move MoveTwo { get; set; }
        public Move MoveThree { get; set; }
        public Move MoveFour { get; set; }
    }
}
