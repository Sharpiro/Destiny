using System.Collections.Generic;

namespace Destiny.Core.Models
{
    public class GrimoireCardBulkModel
    {
        public int Platform { get; set; }
        public ulong MembershipId { get; set; }
        public bool Details { get; set; }
        public List<int> CardIds  { get; set; }
    }
}
