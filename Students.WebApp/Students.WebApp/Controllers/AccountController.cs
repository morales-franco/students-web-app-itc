using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Students.WebApp.Infrastructure.Membership;
using Students.WebApp.Services.Accounts;
using Students.WebApp.Services.Accounts.Contracts;
using Students.WebApp.ViewModels.Account;

namespace Students.WebApp.Controllers
{
    public class AccountController : Controller
    {
        private readonly IAccountService _accountService;
        private readonly IMembershipService _membershipService;
        private readonly ILogger<AccountController> _logger;

        public AccountController(IAccountService accountService,
            IMembershipService membershipService,
            ILogger<AccountController> logger)
        {
            _accountService = accountService ?? throw new ArgumentNullException(nameof(accountService));
            _membershipService = membershipService ?? throw new ArgumentNullException(nameof(membershipService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));

        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult Login()
        {
            return View();
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login(LoginModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            var response = await _accountService.LoginAsync(new LoginRequest(Username: model.UserName, Password: model.Password));

            if (!response.IsSuccess)
            {
                ModelState.AddModelError("Error", response.Error);
                return View(model);
            }

            await _membershipService.SignInAsync(response.Value);

            _logger.LogInformation($"User {response.Value.FullName} logged in at {DateTime.Now}.");

            return RedirectToAction(nameof(HomeController.Index), "Home");
        }

        [AllowAnonymous]
        public async Task<IActionResult> Logout()
        {
            await _membershipService.SignOutAsync();
            return RedirectToAction(nameof(AccountController.Login), "Account");
        }
    }
}
