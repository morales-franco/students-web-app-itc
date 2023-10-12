using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Students.WebApp.Features.Accounts.ViewModels;

namespace Students.WebApp.Controllers
{
    public class AccountsController : Controller
    {

        [AllowAnonymous]
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            return View();
        }
    }
}
