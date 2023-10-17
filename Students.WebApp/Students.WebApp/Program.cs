using Microsoft.AspNetCore.Authentication.Cookies;
using Students.WebApp.Infrastructure;
using Students.WebApp.Infrastructure.Membership;
using Students.WebApp.Services.Accounts;
using Students.WebApp.Services.Students;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
        options.SlidingExpiration = true;
        options.AccessDeniedPath = "/Forbidden/";
    });
builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IExternalApi, ExternalApi>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
builder.Services.AddScoped<IMembershipService, MembershipService>();
builder.Services.AddScoped<IStudentServices, StudentServices>(); 


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
