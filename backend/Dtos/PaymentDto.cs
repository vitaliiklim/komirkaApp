namespace KomirkaApp.Api.Dtos
{
    public class PaymentDto
    {
        public int Id { get; set; }
        public int BookingId { get; set; }
        public decimal Amount { get; set; }
        public DateTime PaidAt { get; set; }
        // ...інші ваші поля
    }
}

