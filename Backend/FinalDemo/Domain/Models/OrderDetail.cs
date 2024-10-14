using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class OrderDetail
{
    public int OrderId { get; set; }

    public string ProductId { get; set; } = null!;

    public int Quantity { get; set; }

    public double UnitPrice { get; set; }

    public virtual Order Order { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
