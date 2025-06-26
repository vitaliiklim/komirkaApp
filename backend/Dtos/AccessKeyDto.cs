using System;

namespace KomirkaApp.Api.Dtos
{
    public class AccessKeyDto
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public string Code { get; set; } = null!;
        public DateTime ExpiresAt { get; set; }
    }
}
