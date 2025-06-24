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
        public async Task<IActionResult> GetAll()
        {
            var list = await _db.Lockers.ToListAsync();
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