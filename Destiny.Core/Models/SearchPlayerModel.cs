﻿namespace Destiny.Core.Models
{
    public class SearchPlayerModel
    {
        public int MembershipType { get; set; }
        public long MembershipId { get; set; }
        public string DisplayName { get; set; }
        public string IconPath { get; set; }
    }
}