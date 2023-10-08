using Microsoft.AspNetCore.Mvc;

namespace Students.WebApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index() =>
            View();
    }
}