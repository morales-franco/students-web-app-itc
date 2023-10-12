using Microsoft.AspNetCore.Mvc;
using Students.WebApp.Features.ExternalApis;
using Students.WebApp.Features.Students.Dtos;
using Students.WebApp.Features.Students.ViewModels;

namespace Students.WebApp.Controllers
{
	public class StudentsController : Controller
    {
        private readonly IExternalApi _externalApi;

        public StudentsController(IExternalApi  externalApi)
        {
			_externalApi = externalApi ?? throw new ArgumentNullException(nameof(externalApi));
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            var students = await _externalApi.GetAsync();
            return View(students.Select(x => (StudentModel)x));
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(StudentCreateModel model)
        {
            if (!ModelState.IsValid)
                return View(model);

            await _externalApi.CreateAsync((StudentCreateDto)model);

            return RedirectToAction("Index");
        }

    }
}
