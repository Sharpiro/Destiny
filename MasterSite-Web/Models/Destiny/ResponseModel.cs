namespace MasterSite_Web.Models.Destiny
{
    public class ResponseModel<T>
    {
        public int ErrorCode { get; set; }
        public string ErrorStatus { get; set; }
        public string Message { get; set; }
        public T Response { get; set; }
    }

    public class InventoryItem
    {
        public string ItemName { get; set; }
        public string ItemDescription { get; set; }
        public string Icon { get; set; }
    }
}