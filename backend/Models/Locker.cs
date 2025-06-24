namespace KomirkaApp.Api.Models
{
    public class Locker
    {
        public int Id { get; set; }

        // Адреса та координати
        public string Address { get; set; } = null!;
        public double Latitude { get; set; }
        public double Longitude { get; set; }

        // Розмір та місткість
        public string Size { get; set; } = null!;
        public int Capacity { get; set; }
        public double MaxWeight { get; set; }

        // Ціни
        public decimal HourlyPrice { get; set; }
        public decimal DailyPrice { get; set; }

        // Додаткові опції
        public bool HasVideo { get; set; }
        public bool HasCooling { get; set; }
    }
}
