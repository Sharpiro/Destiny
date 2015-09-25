using System;
using System.Linq;
using System.Threading.Tasks;
using MasterSite.Core.HttpClientWrapper;
using MasterSite.Core.Models.PokeApi;
using Newtonsoft.Json;

namespace MasterSite.Core
{
    public class PokeApiHandler
    {
        public async Task GetAllPokemonMoveData()
        {
            var repository = new PokeRepository();
            for (var i = 1; i < 722; i++)
            {
                var url = $"http://pokeapi.co/api/v1/pokemon/{i}/";
                var result = await WebHelper.GetASync(url);
                var pokemon = JsonConvert.DeserializeObject<PokeApi_Pokemon>(result);
                var levelUpMoves = pokemon.Moves.Where(m => m.LearnType == "level up").OrderBy(m => m.Level).ToList();
                foreach (var move in levelUpMoves)
                {
                    Console.WriteLine(repository.addPokemonMoveRelationship(move.Level, move.Name, pokemon.Name));
                }
            }
        }
    }
}
