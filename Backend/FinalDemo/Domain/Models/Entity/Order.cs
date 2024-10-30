using System;
using System.Collections.Generic;

namespace Domain.Models.Entity;

public partial class Order
{
    public int OrderId { get; set; }
    public string UserId { get; set; } = null!;
    public string? FullName { get; set; }

    public string? Phone { get; set; }

    public DateTime CreateDate { get; set; }

    public string? Email { get; set; }

    public string? Street { get; set; }

    public string? District { get; set; }

    public string? City { get; set; }

    public string? Country { get; set; }

    public int TotalPrice { get; set; }

    public string OrderStatus { get; set; } = null!;

    public bool isVipUpgrade { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    public virtual ICollection<OrderVipDetail> OrderVipDetails { get; set; } = new List<OrderVipDetail>();


    public virtual ICollection<Revenue> Revenues { get; set; } = new List<Revenue>();

    public virtual ApplicationUser ApplicationUser { get; set; } = null!;

    public virtual PaymentTransaction PaymentTransaction { get; set; } = null!;
}
