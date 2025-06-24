using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KomirkaApp.Api.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int BookingId { get; set; }

        [ForeignKey(nameof(BookingId))]
        public Booking Booking { get; set; }

        [Required]
        public decimal Amount { get; set; }

        [Required]
        public DateTime PaidAt { get; set; }
    }
}