using System.Threading.Tasks;
using KomirkaApp.Api.Data;
using KomirkaApp.Api.Dtos;
using KomirkaApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace KomirkaApp.Api.Services
{
    public class PaymentService
    {
        private readonly ApplicationDbContext _db;

        public PaymentService(ApplicationDbContext db)
        {
            _db = db;
        }

        public async Task<PaymentDto> GetPaymentAsync(int id)
        {
            var payment = await _db.Payments.FindAsync(id);
            if (payment == null) return null;

            return new PaymentDto
            {
                Id = payment.Id,
                BookingId = payment.BookingId,
                Amount = payment.Amount,
                PaidAt = payment.PaidAt
                // map other fields...
            };
        }

        public async Task<PaymentDto> CreatePaymentAsync(PaymentDto dto)
        {
            var payment = new Payment
            {
                BookingId = dto.BookingId,
                Amount = dto.Amount,
                PaidAt = dto.PaidAt
                // map other fields...
            };
            _db.Payments.Add(payment);
            await _db.SaveChangesAsync();

            dto.Id = payment.Id;
            return dto;
        }

        // other service methods...
    }
}
