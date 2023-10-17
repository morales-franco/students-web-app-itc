
namespace Students.WebApp.Services.Student.Contracts
{
    public record GetStudentPageFilter(int Offset, int Limit, string Name = null);
}
