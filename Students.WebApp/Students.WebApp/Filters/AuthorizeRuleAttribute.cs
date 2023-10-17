using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.VisualBasic;
using Students.WebApp.Infrastructure.Membership;
using System.Data;

namespace Students.WebApp.Filters
{
    public class AuthorizeRuleAttribute : ActionFilterAttribute, IAuthorizationFilter
    {
        private string _rule = string.Empty;
        private bool _ignore = false;

        public AuthorizeRuleAttribute()
        {
        }

        public AuthorizeRuleAttribute(string rule) =>
            _rule = rule;

        public AuthorizeRuleAttribute(bool ignore) =>
           _ignore = ignore;


        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (_ignore)
                return;

            var userAccessor = context.HttpContext.RequestServices.GetService<IUserAccessor>()?? throw new NullReferenceException(nameof(IUserAccessor));

            var ruleDefinition = $"{context.RouteData.Values["controller"]}.{context.RouteData.Values["action"]}";

            if (userAccessor.AppUser == null || !userAccessor.AppUser.HasPermission(ruleDefinition))
                context.Result = new RedirectToRouteResult(new RouteValueDictionary(new { controller = "Account", action = "Login", returnUrl = context.HttpContext.Request.GetEncodedPathAndQuery() }));
 
        }
    }
}
