using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// 1) Додаємо CORS та політику, що дозволяє
//     - Origin: http://192.168.0.107:3000
//     - будь‐які заголовки і методи
//     - передавати кукі/креденсіали
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy
            .WithOrigins("http://192.168.0.107:3000")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

// 2) In‐Memory база для тесту
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseInMemoryDatabase("KomirkaDb"));

// 3) JWT‐автентифікація (приклад без валідації issuer/audience)
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer           = false,
            ValidateAudience         = false,
            ValidateLifetime         = true,
            ValidateIssuerSigningKey = false
        };
    });

// 4) Твої сервіси
builder.Services.AddScoped<SmsService>();
builder.Services.AddScoped<PaymentService>();
builder.Services.AddScoped<MapService>();

// 5) Контролери
builder.Services.AddControllers();

var app = builder.Build();

// 6) Пайплайн
app.UseRouting();

// 6.1) Вмикаємо глобальну CORS‐політику
app.UseCors("AllowReact");

// 6.2) Аутентифікація / авторизація
app.UseAuthentication();
app.UseAuthorization();

// 7) Мапимо контролери
app.MapControllers();

// 8) Старт
app.Run();
