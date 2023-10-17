using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using System.Text.Json;

namespace Students.WebApp.Infrastructure.Membership
{
    public class MembershipService : IMembershipService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public MembershipService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor?? throw new ArgumentNullException(nameof(httpContextAccessor));
     }

        public async Task SignInAsync(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username ),
                new Claim("FullName", user.FullName),
                new Claim("Rules", JsonSerializer.Serialize(user.Rules))
            };

            var claimsIdentity = new ClaimsIdentity(
            claims, CookieAuthenticationDefaults.AuthenticationScheme);

            await _httpContextAccessor.HttpContext.SignInAsync(
               CookieAuthenticationDefaults.AuthenticationScheme,
               new ClaimsPrincipal(claimsIdentity));

        }

        public async Task SignOutAsync()
        {
            // Clear the existing external cookie
            await _httpContextAccessor.HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);
        }
    }

    public interface IMembershipService
    {
        Task SignInAsync(AppUser user);
        Task SignOutAsync();
    }
}
