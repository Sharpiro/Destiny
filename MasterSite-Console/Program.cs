using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MasterSite_Core;
using MasterSite_Core.Models.PokeApi;

namespace MasterSite_Console
{
    class Program
    {
        private static void Main(string[] args)
        {
            Run();
        }

        private static void Run()
        {
            Console.WriteLine("Starting...");
            var repository = new DataRepository();
            repository.GetMovesByPokemon("bulbasaur");
            Console.WriteLine("Ending...");
            Console.ReadLine();
        }
    }
}
