namespace Students.WebApp.Services.Student.Contracts
{
    public record StudentCreateRequest(string Nombre, string Apellido, DateTime FechaNacimiento);
}
