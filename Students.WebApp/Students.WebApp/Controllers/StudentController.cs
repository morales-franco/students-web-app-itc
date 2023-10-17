using Microsoft.AspNetCore.Mvc;
using Students.WebApp.Filters;
using Students.WebApp.Services.Student.Contracts;
using Students.WebApp.Services.Students;
using Students.WebApp.ViewModels.Student;

namespace Students.WebApp.Controllers
{
    public class StudentController : Controller
    {
        private readonly IStudentServices _studentService;

        public StudentController(IStudentServices studentService)
        {
            _studentService = studentService ?? throw new ArgumentNullException(nameof(studentService));
        }

        [AuthorizeRule(true)]
        [HttpGet]
        public async Task<IActionResult> Index(int pageNumber, int rowsPerPage, string name = null)
        {
            var studentPage = await _studentService.GetPageAsync(new GetStudentPageFilter(pageNumber, rowsPerPage, name));
            return View((StudentIndexModel)studentPage);
        }

        [AuthorizeRule(true)]
        [HttpPost]
        public async Task<IActionResult> LoadGrid()
        {
            var draw = Request.Form["draw"].FirstOrDefault();
            var start = Request.Form["start"].FirstOrDefault();
            var length = Request.Form["length"].FirstOrDefault();
            int pageSize = length != null ? Convert.ToInt32(length) : 0;
            int skip = start != null ? Convert.ToInt32(start) : 0;

            var studentPage = await _studentService.GetPageAsync(new GetStudentPageFilter(skip, pageSize));

            return Json(new { draw = draw, recordsFiltered = studentPage.TotalRows, recordsTotal = studentPage.TotalRows, data = studentPage.Data });
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }


    }
}
