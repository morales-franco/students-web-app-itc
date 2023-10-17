
using Students.WebApp.Services.Student.Contracts;

namespace Students.WebApp.ViewModels.Student
{
    public record StudentIndexModel(int TotalRows, IEnumerable<StudentRow> Students)
    {
        public static explicit operator StudentIndexModel(StudentPageResponse dto) =>
            new StudentIndexModel(
                TotalRows: dto.TotalRows,
                Students: dto.Data.Select(x => new StudentRow(x.Id, x.Nombre, x.Apellido))
                );
    }

    public record StudentRow(long Id, string Nombre, string Apellido);
}
