using CSharpFunctionalExtensions;
using Students.WebApp.Infrastructure.Membership;
using Students.WebApp.Services.Accounts.Contracts;

namespace Students.WebApp.Services.Accounts
{
	public class AccountService : IAccountService
	{
		public async Task<Result<AppUser>> LoginAsync(LoginRequest loginDto)
		{
			await Task.Delay(100);
			if(loginDto.Password == "123")
                return Result.Success(new AppUser("fmorales", "Franco Morales", new string[] { "Home.Index", "Student.Index" }) );

			return Result.Failure<AppUser>("Usuario y/o contraseña incorrecta");
		}
	}

	public interface IAccountService
	{
        Task<Result<AppUser>> LoginAsync(LoginRequest loginDto);
	}
}
