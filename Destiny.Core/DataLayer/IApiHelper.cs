using System.Threading.Tasks;

namespace Destiny.Core.DataLayer
{
    public interface IApiHelper
    {
        Task<string> GetAccountInfo(int platform, string membershipId);
        Task<string> GetAccountTriumphs(int platform, string membershipId);
        Task<string> GetCharacterInventory(int platform, string membershipId, string characterId);
        Task<string> GetGrimoireCard(int platform, string membershipId, string cardId = null, bool details = false);
        Task<string> GetItem(string id);
        Task<string> GetPlayerGrimoire(int platform, string membershipId);
        Task<string> GetUniqueWeaponData(int platform, string membershipId);
        Task<string> SearchDestinyPlayer(int platform, string displayName);
    }
}