namespace Students.WebApp.Services.Student.Contracts
{
    public record StudentPageResponse(int TotalRows, List<StudentResponse> Data);

    public record StudentResponse(long Id, string Nombre, string Apellido, DateTime FechaNacimiento);
}
