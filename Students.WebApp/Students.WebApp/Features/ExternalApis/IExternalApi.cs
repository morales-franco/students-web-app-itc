using Students.WebApp.Features.Students.Dtos;

namespace Students.WebApp.Features.ExternalApis
{
    public interface IExternalApi
    {
        Task CreateAsync(StudentCreateDto dto);
        public Task<IEnumerable<StudentDto>> GetAsync();
    }

    public class ExternalApi : IExternalApi
    {
        public async Task CreateAsync(StudentCreateDto dto)
        {
            await Task.CompletedTask;
        }

        public async Task<IEnumerable<StudentDto>> GetAsync()
        {
            return await Task.FromResult(new List<StudentDto>()
            {
                new StudentDto(1, "n1", "a1", DateTime.Now),
                new StudentDto(2, "n", "a2", DateTime.Now)
            });
        }
    }
}
