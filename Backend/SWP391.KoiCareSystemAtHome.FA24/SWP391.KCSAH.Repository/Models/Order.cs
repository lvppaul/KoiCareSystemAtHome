using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class Order
{
    public int OrderId { get; set; }

    public string UserId { get; set; } = null!;

    public int ShopId { get; set; }

    public string FullName { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public DateOnly OrderDate { get; set; }

    public string Email { get; set; } = null!;

    public string Street { get; set; } = null!;

    public string District { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Country { get; set; } = null!;

    public int PaymentMethodId { get; set; }

    public double TotalPrice { get; set; }

    public DateOnly CreateAt { get; set; }

    public bool? OrderStatus { get; set; }

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual PaymentMethod PaymentMethod { get; set; } = null!;

    public virtual Shop Shop { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
