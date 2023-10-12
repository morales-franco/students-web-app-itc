namespace Students.WebApp.Features.Students.Dtos
{
    public record StudentUpdateDto(long Id, string Nombre, string Apellido, DateTime FechaNacimiento);
}
