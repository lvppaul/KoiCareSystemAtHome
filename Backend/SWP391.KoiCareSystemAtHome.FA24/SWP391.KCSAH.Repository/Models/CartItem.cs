using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class CartItem
{
    public int CartItemId { get; set; }

    public string ProductId { get; set; } = null!;

    public int CartId { get; set; }

    public int Quantity { get; set; }

    public double PricePerItem { get; set; }

    public double TotalPrice { get; set; }

    public virtual Cart Cart { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
