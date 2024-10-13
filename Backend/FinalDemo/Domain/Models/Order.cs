using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class Order
{
    public int OrderId { get; set; }
    public string UserId { get; set; } = null!;
    public int ShopId { get; set; }

    public string FullName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public DateTime CreateDate { get; set; }

    public string? Email { get; set; }

    public string Street { get; set; } = null!;

    public string District { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Country { get; set; } = null!;

    public int PaymentMethodId { get; set; }

    public double TotalPrice { get; set; }

    public bool? OrderStatus { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual PaymentMethod PaymentMethod { get; set; } = null!;

    public virtual ICollection<Revenue> Revenues { get; set; } = new List<Revenue>();

    public virtual Shop Shop { get; set; } = null!;
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;
}
