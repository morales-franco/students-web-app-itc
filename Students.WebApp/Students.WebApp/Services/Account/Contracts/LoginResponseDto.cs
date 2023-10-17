using Students.WebApp.Infrastructure.Membership;

namespace Students.WebApp.Services.Accounts.Contracts
{
	public record LoginResponseDto(bool Success, string Message, AppUser AppUser);
}
