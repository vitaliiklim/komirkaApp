using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly ApplicationDbContext _db;

    public BookingsController(ApplicationDbContext db)
    {
        _db = db;
    }

    [HttpPost]
    public IActionResult Create(BookingDto dto)
    {
        // перевірити доступність, створити бронювання
        return Ok();
    }
}