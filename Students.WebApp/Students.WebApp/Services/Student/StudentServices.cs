using Students.WebApp.Services.Student.Contracts;

namespace Students.WebApp.Services.Students
{
    public class StudentServices : IStudentServices
    {
        private static IList<StudentResponse> _repository = new List<StudentResponse>()
        {
            new StudentResponse(1, "nombre1", "apellido1", DateTime.Now.AddYears(-1)),
            new StudentResponse(2, "nombre2", "apellido2", DateTime.Now.AddYears(-2)),
            new StudentResponse(3, "nombre3", "apellido3", DateTime.Now.AddYears(-3)),
            new StudentResponse(4, "nombre4", "apellido4", DateTime.Now.AddYears(-4)),
            new StudentResponse(5, "nombre5", "apellido5", DateTime.Now.AddYears(-5)),
            new StudentResponse(6, "nombre6", "apellido6", DateTime.Now.AddYears(-6)),
            new StudentResponse(7, "nombre7", "apellido7", DateTime.Now.AddYears(-7)),
            new StudentResponse(8, "nombre8", "apellido8", DateTime.Now.AddYears(-8)),
            new StudentResponse(9, "nombre9", "apellido9", DateTime.Now.AddYears(-9)),
            new StudentResponse(10, "nombre10", "apellido10", DateTime.Now.AddYears(-10)),
            new StudentResponse(11, "nombre11", "apellido1", DateTime.Now.AddYears(-1)),
            new StudentResponse(12, "nombre12", "apellido2", DateTime.Now.AddYears(-2)),
            new StudentResponse(13, "nombre13", "apellido3", DateTime.Now.AddYears(-3)),
            new StudentResponse(14, "nombre14", "apellido4", DateTime.Now.AddYears(-4)),
            new StudentResponse(15, "nombre15", "apellido5", DateTime.Now.AddYears(-5)),
            new StudentResponse(16, "nombre16", "apellido6", DateTime.Now.AddYears(-6)),
            new StudentResponse(17, "nombre17", "apellido7", DateTime.Now.AddYears(-7)),
            new StudentResponse(18, "nombre18", "apellido8", DateTime.Now.AddYears(-8)),
            new StudentResponse(19, "nombre19", "apellido9", DateTime.Now.AddYears(-9)),
            new StudentResponse(20, "nombre20", "apellido10", DateTime.Now.AddYears(-10)),
            new StudentResponse(21, "nombre21", "apellido1", DateTime.Now.AddYears(-1)),
            new StudentResponse(22, "nombre22", "apellido2", DateTime.Now.AddYears(-2)),
            new StudentResponse(23, "nombre23", "apellido3", DateTime.Now.AddYears(-3)),
            new StudentResponse(24, "nombre24", "apellido4", DateTime.Now.AddYears(-4)),
            new StudentResponse(25, "nombre25", "apellido5", DateTime.Now.AddYears(-5)),
            new StudentResponse(26, "nombre26", "apellido6", DateTime.Now.AddYears(-6)),
            new StudentResponse(27, "nombre27", "apellido7", DateTime.Now.AddYears(-7)),
            new StudentResponse(28, "nombre28", "apellido8", DateTime.Now.AddYears(-8)),
            new StudentResponse(29, "nombre29", "apellido9", DateTime.Now.AddYears(-9)),
            new StudentResponse(30, "nombre30", "apellido10", DateTime.Now.AddYears(-10)),
            new StudentResponse(31, "nombre31", "apellido1", DateTime.Now.AddYears(-1)),
            new StudentResponse(32, "nombre32", "apellido2", DateTime.Now.AddYears(-2)),
            new StudentResponse(33, "nombre33", "apellido3", DateTime.Now.AddYears(-3)),
            new StudentResponse(34, "nombre34", "apellido4", DateTime.Now.AddYears(-4)),
            new StudentResponse(35, "nombre35", "apellido5", DateTime.Now.AddYears(-5)),
            new StudentResponse(36, "nombre36", "apellido6", DateTime.Now.AddYears(-6)),
            new StudentResponse(37, "nombre37", "apellido7", DateTime.Now.AddYears(-7)),
            new StudentResponse(38, "nombre38", "apellido8", DateTime.Now.AddYears(-8)),
            new StudentResponse(39, "nombre39", "apellido9", DateTime.Now.AddYears(-9)),
            new StudentResponse(40, "nombre40", "apellido10", DateTime.Now.AddYears(-10)),
            new StudentResponse(41, "nombre41", "apellido1", DateTime.Now.AddYears(-1)),
            new StudentResponse(42, "nombre42", "apellido2", DateTime.Now.AddYears(-2)),
            new StudentResponse(43, "nombre43", "apellido3", DateTime.Now.AddYears(-3)),
            new StudentResponse(44, "nombre44", "apellido4", DateTime.Now.AddYears(-4)),
            new StudentResponse(45, "nombre45", "apellido5", DateTime.Now.AddYears(-5)),
            new StudentResponse(46, "nombre46", "apellido6", DateTime.Now.AddYears(-6)),
            new StudentResponse(47, "nombre47", "apellido7", DateTime.Now.AddYears(-7)),
            new StudentResponse(48, "nombre48", "apellido8", DateTime.Now.AddYears(-8)),
            new StudentResponse(49, "nombre49", "apellido9", DateTime.Now.AddYears(-9)),
            new StudentResponse(50, "nombre50", "apellido10", DateTime.Now.AddYears(-10))
        };


        public async Task<StudentPageResponse> GetPageAsync(GetStudentPageFilter filter)
        {
            await Task.Delay(100);
            var totalRows = _repository.Count;
            var items = _repository.Skip(filter.Offset).Take(filter.Limit).ToList();


            return new StudentPageResponse(totalRows,  items); ;
        }
    }

    public interface IStudentServices
    {
        Task<StudentPageResponse> GetPageAsync(GetStudentPageFilter filter);
    }
}
