using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KomirkaApp.Api.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public int UserId { get; set; }

        [ForeignKey(nameof(UserId))]
        public User User { get; set; }

        [Required]
        public int LockerId { get; set; }

        [ForeignKey(nameof(LockerId))]
        public Locker Locker { get; set; }

        [Required]
        public DateTime StartTime { get; set; }   // збігається з контролером

        [Required]
        public DateTime EndTime { get; set; }     // збігається з контролером

        [Required]
        public decimal Price { get; set; }        // збігається з контролером
    }
}

