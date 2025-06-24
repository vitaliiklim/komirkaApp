using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using KomirkaApp.Api.Data;
using KomirkaApp.Api.Models;

namespace KomirkaApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public BookingsController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var bookings = await _db.Bookings
                .Include(b => b.User)
                .Include(b => b.Locker)
                .ToListAsync();
            return Ok(bookings);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var booking = await _db.Bookings
                .Include(b => b.User)
                .Include(b => b.Locker)
                .FirstOrDefaultAsync(b => b.Id == id);
            if (booking == null)
                return NotFound();
            return Ok(booking);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Booking booking)
        {
            _db.Bookings.Add(booking);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = booking.Id }, booking);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Booking updated)
        {
            var booking = await _db.Bookings.FindAsync(id);
            if (booking == null)
                return NotFound();

            booking.LockerId = updated.LockerId;
            booking.StartTime = updated.StartTime;
            booking.EndTime = updated.EndTime;
            booking.Price = updated.Price;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var booking = await _db.Bookings.FindAsync(id);
            if (booking == null)
                return NotFound();

            _db.Bookings.Remove(booking);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
