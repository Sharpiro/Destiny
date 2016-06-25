using System.Collections.Generic;
using System.Threading.Tasks;
using Destiny.Core.Models;

namespace Destiny.Core.BusinessLogic
{
    public interface IDestinyBusinessService
    {
        Task<AccountInfoModel> GetAccountInfo(int platform, string membershipId);
        Task<IEnumerable<bool>> GetAccountTriumphs(int platform, string membershipId);
        Task<CharacterInventoryModel> GetCharacterInventory(int platform, string membershipId, string characterId);
        Task<GrimoireCard> GetGrimoireCard(int platform, string membershipId, string cardId = null, bool details = false);
        Task<IEnumerable<GrimoireCard>> GetGrimoireCards(GrimoireCardBulkModel bulkModel);
        Task<ItemModel> GetItem(string id);
        Task<IEnumerable<GrimoireCard>> GetPlayerGrimoire(int platform, string membershipId);
        Task<IEnumerable<string>> GetUniqueWeaponData(int platform, string membershipId);
        Task<SearchPlayerModel> SearchDestinyPlayer(int platform, string displayName);
    }
}