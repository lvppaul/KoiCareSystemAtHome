using System;
using System.Collections.Generic;

namespace Domain.Models.Entity;

public partial class Revenue
{
    public int RevenueId { get; set; }

    public int OrderId { get; set; }

    public int Income { get; set; }

    public virtual Order Order { get; set; } = null!;
}
