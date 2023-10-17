using Students.WebApp.Services.Student.Contracts;

namespace Students.WebApp.Infrastructure
{
    public interface IExternalApi
    {
        Task CreateAsync(StudentCreateRequest dto);
    }

    public class ExternalApi : IExternalApi
    {
        public async Task CreateAsync(StudentCreateRequest dto)
        {
            await Task.CompletedTask;
        }

       
    }
}
