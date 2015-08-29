namespace MasterSite_Core.Entities
{
    public class Move
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public int? Power { get; set; }
        public int? Accuracy { get; set; }
        public int? PowerPoints { get; set; }
        public string TechnicalMachine { get; set; }
        public string Effect { get; set; }
        public int? Probability { get; set; }
    }
}
