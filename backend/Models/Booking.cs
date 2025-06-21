using System;
public class Booking
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public int LockerId { get; set; }
    public DateTime From { get; set; }
    public DateTime To { get; set; }
}