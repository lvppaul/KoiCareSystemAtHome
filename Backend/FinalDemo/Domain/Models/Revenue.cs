using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class Revenue
{
    public int RevenueId { get; set; }

    public int OrderId { get; set; }

    public double CommissionFee { get; set; }

    public virtual Order Order { get; set; } = null!;
}
