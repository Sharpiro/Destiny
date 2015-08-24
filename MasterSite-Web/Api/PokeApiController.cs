using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MasterSite_Web.Api
{
    public class PokeApiController : ApiController
    {
        public IHttpActionResult GetDatData()
        {
            return Ok("Dat Data is Dis");
        }
    }
}
