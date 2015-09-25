using System.Web.Http;
using MasterSite.Core;

namespace MasterSite.Web.Api.Pokemon
{
    public class PokeApiController : ApiController
    {
        public readonly PokeRepository _repository = new PokeRepository();
        public IHttpActionResult GetMoves()
        {
            var moves = _repository.GetMoves();
            return Ok(moves);
        }

        public IHttpActionResult GetMoveById(int id)
        {
            var move = _repository.GetMoveById(id);
            return Ok(move);
        }

        public IHttpActionResult GetMoveByName(string name)
        {
            var move = _repository.GetMoveByName(name);
            return Ok(move);
        }

        public IHttpActionResult GetMovesByType(string type)
        {
            var moves = _repository.GetMovesByType(type);
            return Ok(moves);
        }

        public IHttpActionResult GetMovesByPokemon(string pokemonName)
        {
            var moves = _repository.GetMovesByPokemon(pokemonName);
            return Ok(moves);
        }
    }
}
