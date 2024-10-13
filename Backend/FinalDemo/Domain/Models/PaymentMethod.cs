using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class PaymentMethod
{
    public int PaymentMethodId { get; set; }

    public string PaymentName { get; set; } = null!;

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
