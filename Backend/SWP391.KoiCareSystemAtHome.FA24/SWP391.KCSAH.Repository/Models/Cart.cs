using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class Cart
{
    public int CartId { get; set; }

    public string UserId { get; set; } = null!;

    public int TotalQuantity { get; set; }

    public double TotalPrice { get; set; }

    public int TotalItems { get; set; }

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual User User { get; set; } = null!;
}
