// backend/Controllers/AuthController.cs
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using KomirkaApp.Api.Data;
using KomirkaApp.Api.Dtos;
using KomirkaApp.Api.Models;
using BCrypt.Net;

namespace KomirkaApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        private readonly IConfiguration _cfg;

        public AuthController(ApplicationDbContext db, IConfiguration cfg)
        {
            _db = db;
            _cfg = cfg;
        }

        // POST: api/auth/register
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            // Перевіряємо, чи такий email вже зареєстрований
            if (await _db.Users.AnyAsync(u => u.Email == dto.Email))
                return Conflict(new { message = "Email is already registered." });

            // Хешуємо пароль
            var hash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            // Створюємо користувача
            var user = new User
            {
                Email = dto.Email,
                PasswordHash = hash,
                PhoneNumber = string.Empty,      // Заповнюємо порожнім рядком, бо NOT NULL у БД
                IsPhoneConfirmed = false
            };

            _db.Users.Add(user);
            await _db.SaveChangesAsync();

            // Повертаємо підтвердження успіху
            return Ok(new { message = "Registration successful." });
        }

        // POST: api/auth/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _db.Users.SingleOrDefaultAsync(u => u.Email == dto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid credentials." });

            // Формуємо JWT
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_cfg["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var jwt = new JwtSecurityToken(
                issuer: _cfg["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),
                signingCredentials: creds
            );

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(jwt)
            });
        }
    }
}
