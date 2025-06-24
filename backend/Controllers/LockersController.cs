using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KomirkaApp.Api.Data;
using KomirkaApp.Api.Models;

namespace KomirkaApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LockersController : ControllerBase
    {
        private readonly ApplicationDbContext _db;
        public LockersController(ApplicationDbContext db) => _db = db;

        // GET /api/lockers
        [HttpGet]
        public async Task<IActionResult> GetAll(
            [FromQuery] string? size,
            [FromQuery] bool? video,
            [FromQuery] bool? cooling,
            [FromQuery] decimal? maxPrice)
        {
            var query = _db.Lockers.AsQueryable();

            if (!string.IsNullOrEmpty(size))
                query = query.Where(l => l.Size == size);

            if (video.HasValue)
                query = query.Where(l => l.HasVideo == video.Value);

            if (cooling.HasValue)
                query = query.Where(l => l.HasCooling == cooling.Value);

            if (maxPrice.HasValue)
                query = query.Where(l => l.HourlyPrice <= maxPrice.Value ||
                                         l.DailyPrice <= maxPrice.Value);

            var list = await query.ToListAsync();
            return Ok(list);
        }

        // GET /api/lockers/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var locker = await _db.Lockers.FindAsync(id);
            if (locker == null) return NotFound();
            return Ok(locker);
        }
    }
}