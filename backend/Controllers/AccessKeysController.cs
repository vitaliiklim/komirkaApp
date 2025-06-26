using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KomirkaApp.Api.Data;
using KomirkaApp.Api.Dtos;
using KomirkaApp.Api.Models;

namespace KomirkaApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccessKeysController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public AccessKeysController(ApplicationDbContext db) => _db = db;

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AccessKeyDto dto)
        {
            var key = new AccessKey
            {
                BookingId = dto.BookingId,
                Code = Guid.NewGuid().ToString("N").Substring(0, 6),
                ExpiresAt = dto.ExpiresAt
            };
            _db.AccessKeys.Add(key);
            await _db.SaveChangesAsync();
            dto.Id = key.Id;
            dto.Code = key.Code;
            return CreatedAtAction(nameof(Get), new { code = key.Code }, dto);
        }

        [HttpGet("{code}")]
        public async Task<IActionResult> Get(string code)
        {
            var key = await _db.AccessKeys
                .FirstOrDefaultAsync(k => k.Code == code);
            if (key == null || key.ExpiresAt < DateTime.UtcNow)
                return NotFound();
            return Ok(new AccessKeyDto
            {
                Id = key.Id,
                BookingId = key.BookingId,
                Code = key.Code,
                ExpiresAt = key.ExpiresAt
            });
        }
    }
}
