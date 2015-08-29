using System.Web.Http;
using MasterSite_Core;

namespace MasterSite_Web.Api.Pokemon
{
    public class PokeApiController : ApiController
    {
        public readonly DataRepository repository = new DataRepository();
        public IHttpActionResult GetMoves()
        {
            var moves = repository.GetMoves();
            return Ok(moves);
        }

        public IHttpActionResult GetMoveById(int id)
        {
            var move = repository.GetMoveById(id);
            return Ok(move);
        }

        public IHttpActionResult GetMoveByName(string name)
        {
            var move = repository.GetMoveByName(name);
            return Ok(move);
        }

        public IHttpActionResult GetMovesByType(string type)
        {
            var moves = repository.GetMovesByType(type);
            return Ok(moves);
        }
    }
}
