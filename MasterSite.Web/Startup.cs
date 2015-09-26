using System.Web.Http;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;

namespace MasterSite.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
                );
            //force json
            app.Use(async (environment, next) =>
            {
                var requestHeaders = environment.Request.Headers;
                requestHeaders.Set("Accept", "application/json");
                string value;
                await next();
            });
            app.UseNinjectMiddleware(() => new StandardKernel());
            app.UseNinjectWebApi(config);
        }
    }
}
