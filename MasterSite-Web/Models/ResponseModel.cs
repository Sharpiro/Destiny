using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MasterSite_Web.Models
{
    public class ResponseModel
    {
        public int ErrorCode { get; set; }
        public string ErrorStatus { get; set; }
        public string Message { get; set; }
        public object data { get; set; }
    }
}