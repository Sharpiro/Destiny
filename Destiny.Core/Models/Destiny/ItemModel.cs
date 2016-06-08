﻿using Newtonsoft.Json;

namespace MasterSite.Core.Models.Destiny
{
    public class ItemModel
    {
        public ulong? ItemHash { get; set; }
        public int? DamageType { get; set; }
        public int? RequiredLevel { get; set; }
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string Icon { get; set; }
        public int? PrimaryStatValue { get; set; }
    }
}