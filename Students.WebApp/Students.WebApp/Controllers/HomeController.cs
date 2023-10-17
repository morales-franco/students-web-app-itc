using Microsoft.AspNetCore.Mvc;
using Students.WebApp.Filters;
using Students.WebApp.Infrastructure.Membership;

namespace Students.WebApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IUserAccessor _userAccessor;

        public HomeController(ILogger<HomeController> logger,
            IUserAccessor userAccessor)
        {
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
            _userAccessor = userAccessor ?? throw new ArgumentNullException(nameof(userAccessor));
        }

        [AuthorizeRule]
        public IActionResult Index()
        {
            _logger.LogInformation($"{_userAccessor.AppUser.Username} {_userAccessor.AppUser.FullName}");
            return View();
        }
            
    }
}