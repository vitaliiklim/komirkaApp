// backend/Program.cs
using System;
using System.Linq;
using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using KomirkaApp.Api.Data;
using KomirkaApp.Api.Models;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// 1) CORS — дозволяємо фронтенд
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
        policy.WithOrigins("http://localhost:3000", "http://192.168.0.107:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials());
});

// 2) EF Core + MySQL
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseMySql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        new MySqlServerVersion(new Version(8, 0, 28)),
        mysql => mysql.EnableRetryOnFailure()
    )
);

// 3) JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(opts =>
    {
        var key = builder.Configuration["Jwt:Key"]
                  ?? throw new InvalidOperationException("JWT Key not configured");
        opts.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };
    });
builder.Services.AddAuthorization();

// 4) Controllers + Swagger/OpenAPI
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "KomirkaApp API", Version = "v1" });
});

var app = builder.Build();

// 5) Dev-only middleware
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "KomirkaApp API V1");
    });
}

// 6) Routing, CORS, Auth
app.UseRouting();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

// 7) Ініціалізація БД + сидування двох камер
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.EnsureCreated();

    if (!db.Lockers.Any())
    {
        db.Lockers.AddRange(
            new Locker {
                Address    = "Вул. Хрещатик, 1",
                Latitude   = 50.4501,
                Longitude  = 30.5234,
                Size       = "S",
                Capacity   = 1,
                MaxWeight  = 10,
                HourlyPrice = 5m,
                DailyPrice  = 20m,
                HasVideo    = true,
                HasCooling  = false
            },
            new Locker {
                Address    = "Вул. Сагайдачного, 10",
                Latitude   = 50.4531,
                Longitude  = 30.5273,
                Size       = "M",
                Capacity   = 2,
                MaxWeight  = 20,
                HourlyPrice = 8m,
                DailyPrice  = 30m,
                HasVideo    = true,
                HasCooling  = true
            }
        );
        db.SaveChanges();
    }
}

// 8) Мапимо контролери та стартуємо
app.MapControllers();
app.Run();
