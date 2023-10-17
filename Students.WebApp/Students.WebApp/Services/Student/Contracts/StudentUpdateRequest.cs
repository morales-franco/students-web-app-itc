namespace Students.WebApp.Services.Student.Contracts
{
    public record StudentUpdateRequest(long Id, string Nombre, string Apellido, DateTime FechaNacimiento);
}
