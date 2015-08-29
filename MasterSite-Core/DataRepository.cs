using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MasterSite_Core.Entities;

namespace MasterSite_Core
{
    public class DataRepository
    {
        public IEnumerable<Move> GetMoves()
        {
            using (var context = new PokeContext())
            {
                var moves = context.Moves.ToList();
                return moves;
            }
        }

        public Move GetMoveById(int id)
        {
            using (var context = new PokeContext())
            {
                var move = context.Moves.Find(id);
                return move;
            }
        }

        public Move GetMoveByName(string name)
        {
            using (var context = new PokeContext())
            {
                var move = context.Moves.FirstOrDefault(p => p.Name == name);
                return move;
            }
        }

        public IEnumerable<Move> GetMovesByType(string type)
        {
            using (var context = new PokeContext())
            {
                var moves = context.Moves.Where(m => m.Type == type).OrderByDescending(m => m.Power).ToList();
                return moves;
            }
        }
    }
}
