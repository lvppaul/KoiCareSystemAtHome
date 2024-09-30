using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class Product
{
    public string ProductId { get; set; } = null!;

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public int Quantity { get; set; }

    public double Price { get; set; }

    public bool? Status { get; set; }

    public string CategoryId { get; set; } = null!;

    public string UserId { get; set; } = null!;

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

    public virtual Category Category { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    public virtual User User { get; set; } = null!;
}
