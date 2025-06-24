using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using KomirkaApp.Api.Dtos;
using KomirkaApp.Api.Services;

namespace KomirkaApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly PaymentService _service;

        public PaymentsController(PaymentService service)
        {
            _service = service;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var dto = await _service.GetPaymentAsync(id);
            if (dto == null) return NotFound();
            return Ok(dto);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PaymentDto dto)
        {
            var created = await _service.CreatePaymentAsync(dto);
            return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
        }

        // PUT, DELETE...
    }
}
