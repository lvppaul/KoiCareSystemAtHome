using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class PaymentMethod
{
    public int PaymentMethodId { get; set; }

    public string PaymentName { get; set; } = null!;

    public TimeOnly CreateAt { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
