using System;

namespace KomirkaApp.Api.Models
{
    public class AccessKey
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public string Code { get; set; } = null!;
        public DateTime ExpiresAt { get; set; }

        public Booking Booking { get; set; } = null!;
    }
}
