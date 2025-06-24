namespace KomirkaApp.Api.Dtos
{
    public class CreateBookingDto
    {
        public int LockerId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
    }
}
