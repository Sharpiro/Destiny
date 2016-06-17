using System.Collections.Generic;

namespace Destiny.Core.Models
{
    public class GrimoireCardBulkModel
    {
        public int Platform { get; set; }
        public string MembershipId { get; set; }
        public bool Details { get; set; }
        public List<string> CardIds  { get; set; }
    }
}
