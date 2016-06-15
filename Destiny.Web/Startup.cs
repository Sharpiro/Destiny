using System.Web.Http;
using Microsoft.Owin;
using Ninject;
using Ninject.Web.Common.OwinHost;
using Ninject.Web.WebApi.OwinHost;
using Owin;

namespace Destiny.Web
{
    public class Startup
    {
        public readonly PathString ApiPath = new PathString("/api");
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
                if (environment.Request.Path.StartsWithSegments(ApiPath))
                {
                    var requestHeaders = environment.Request.Headers;
                    requestHeaders.Set("Accept", "application/json");
                }
                await next();
            });
            app.UseNinjectMiddleware(() => new StandardKernel());
            app.UseNinjectWebApi(config);
        }
    }
}
