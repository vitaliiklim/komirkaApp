using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _db;
    private readonly SmsService _sms;

    public AuthController(ApplicationDbContext db, SmsService sms)
    {
        _db = db;
        _sms = sms;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterDto dto)
    {
        // логіка реєстрації
        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto dto)
    {
        // логіка логіну
        return Ok();
    }

    [HttpPost("send-otp")]
    public IActionResult SendOtp(PhoneDto dto)
    {
        _sms.Send(dto.PhoneNumber, "Ваш код: 1234");
        return Ok();
    }

    [HttpPost("verify-otp")]
    public IActionResult VerifyOtp(OtpDto dto)
    {
        // логіка перевірки OTP
        return Ok();
    }
}