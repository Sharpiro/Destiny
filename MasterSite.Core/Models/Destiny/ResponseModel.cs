namespace MasterSite.Core.Models.Destiny
{
    public class ResponseModel<T>
    {
        public int ErrorCode { get; set; }
        public string ErrorStatus { get; set; }
        public string Message { get; set; }
        public T Response { get; set; }
    }
}