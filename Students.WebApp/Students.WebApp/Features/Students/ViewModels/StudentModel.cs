using Students.WebApp.Features.Students.Dtos;

namespace Students.WebApp.Features.Students.ViewModels
{
    public record StudentModel(long Id, string NombreCompleto, DateTime FechaNacimiento)
    {
        public static explicit operator StudentModel(StudentDto dto) =>
            new StudentModel(
                Id: dto.Id,
                NombreCompleto: $"{dto.Apellido} {dto.Nombre}",
                FechaNacimiento: dto.FechaNacimiento
                );
    }
}
