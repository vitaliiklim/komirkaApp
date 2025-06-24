namespace KomirkaApp.Api.Dtos
{
    public class BookingDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int LockerId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public decimal Price { get; set; }
        // ...інші ваші поля
    }
}

