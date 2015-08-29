using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using MasterSite_Core.Models.PokeApi;
using Newtonsoft.Json;

namespace MasterSite_Core
{
    public class PokeApiHandler
    {
        public T GetData<T>(string url)
        {
            var client = new HttpClient();
            var task = client.GetAsync(url);
            var result = task.Result;
            var data = result.Content.ReadAsStringAsync().Result;
            var returnObj = JsonConvert.DeserializeObject<T>(data);
            return returnObj;
        }

        public void getAllPokemonMoveData()
        {
            var repository = new DataRepository();
            for (var i = 1; i < 722; i++)
            {
                var url = $"http://pokeapi.co/api/v1/pokemon/{i}/";
                var pokemon = GetData<PokeApi_Pokemon>(url);
                var levelUpMoves = pokemon.Moves.Where(m => m.LearnType == "level up").OrderBy(m => m.Level).ToList();
                foreach (var move in levelUpMoves)
                {
                    Console.WriteLine(repository.addPokemonMoveRelationship(move.Level, move.Name, pokemon.Name));
                }
            }
        }
    }
}
