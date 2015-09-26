using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using MasterSite.Core.Entities;

namespace MasterSite.Core
{
    public class PokeRepository
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

        public bool addPokemonMoveRelationship(int level, string moveName, string pokemonName)
        {
            if (moveName == null || pokemonName == null || level <= 0)
                return false;
            using (var context = new PokeContext())
            {
                var pokemon = context.Pokemon.FirstOrDefault(p => p.Name == pokemonName);
                var move = context.Moves.FirstOrDefault(m => m.Name == moveName);
                if (move == null || pokemon == null) return false;
                var pokemon_move = new Pokemon_Moves
                {
                    MoveId = move.MoveId,
                    PokemonId = pokemon.PokeId,
                    Level = level
                };
                context.Pokemon_Moves.Add(pokemon_move);
                return SaveContextChanges(context);
            }
        }

        public IEnumerable<Move> GetMovesByPokemon(string name)
        {
            using (var context = new PokeContext())
            {
                var pokemon = context.Pokemon.FirstOrDefault(p => p.Name == name);
                IEnumerable<Move> data = null;
                try
                {
                    data = context.Pokemon_Moves
                        .Join(context.Moves, pm => pm.MoveId, m => m.MoveId, (pm, m) => new { PM = pm, M = m })
                        .Where(selection => selection.PM.PokemonId == pokemon.PokeId).Select(final => final.M)
                        .ToList();
                }
                catch (Exception)
                {
                    Console.WriteLine("No Data available");
                }
                return data;
            }
        }

        public void DeleteAllPokemon()
        {
            using (var context = new PokeContext())
            {
                var allPokemon = context.Pokemon;
                context.Pokemon.RemoveRange(allPokemon);
                context.SaveChanges();
            }
        }
        public void DeleteAllMoves()
        {
            using (var context = new PokeContext())
            {
                var allMoves = context.Moves;
                context.Moves.RemoveRange(allMoves);
                context.SaveChanges();
            }
        }

        public void DeleteAllData()
        {
            DeleteAllPokemon();
            DeleteAllMoves();
        }

        private bool SaveContextChanges(DbContext context)
        {
            try
            {
                context.SaveChanges();
                return true;
            }

            catch (Exception ex)
            {
                Console.WriteLine("Error Saving changes to database");
                Console.WriteLine(ex.InnerException.InnerException.Message);

            }
            return false;
        }
    }
}
