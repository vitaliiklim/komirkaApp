using Microsoft.AspNetCore.Mvc;

namespace KomirkaApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly PaymentService _payment;

        public PaymentsController(PaymentService payment)
        {
            _payment = payment;
        }

        [HttpPost]
        public IActionResult Pay(PaymentDto dto)
        {
            var success = _payment.Process(dto);
            return success ? Ok() : BadRequest();
        }
    }
}
