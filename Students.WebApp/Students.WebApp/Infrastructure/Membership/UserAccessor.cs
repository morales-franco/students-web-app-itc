using System.Text.Json;

namespace Students.WebApp.Infrastructure.Membership
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserAccessor(IHttpContextAccessor httpContextAccessor) =>
            _httpContextAccessor = httpContextAccessor;

        public AppUser AppUser => _httpContextAccessor.HttpContext.User.Identity.IsAuthenticated ? new AppUser(
            _httpContextAccessor.HttpContext.User.Identity.Name,
            _httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == "FullName").Value,
            JsonSerializer.Deserialize<string[]>(_httpContextAccessor.HttpContext.User.Claims.First(x => x.Type == "Rules").Value)
            ) : null;

    }

    public interface IUserAccessor
    {
        AppUser AppUser { get; }
    }
}
