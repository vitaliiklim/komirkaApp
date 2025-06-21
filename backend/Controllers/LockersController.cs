using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class LockersController : ControllerBase
{
    [HttpGet]
    public IEnumerable<Locker> GetLockers()
    {
        return new[] { new Locker { Id = 1, Latitude = 49.5, Longitude = 25.6, LocationName = "TZ Center", PricePerHour = 10 } };
    }
}