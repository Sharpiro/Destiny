using System.Net.Http.Formatting;
using System.Web.Http;

namespace MasterSite_Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}/{postId}",
                defaults: new { id = RouteParameter.Optional, postId = RouteParameter.Optional }
            );
            config.Formatters.JsonFormatter.AddUriPathExtensionMapping("json", "application/json");
        }
    }
}
