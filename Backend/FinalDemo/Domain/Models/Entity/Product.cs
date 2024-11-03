using System;
using System.Collections.Generic;

namespace Domain.Models.Entity;

public partial class Product
{
    public int ProductId { get; set; }
    public int ShopId { get; set; } 
    public string Name { get; set; } = null!;

    public string? Description { get; set; }
    public string? Thumbnail { get; set; }
    public int Quantity { get; set; }

    public bool IsDeleted { get; set; }

    public int Price { get; set; }

    public bool? Status { get; set; }

    public int CategoryId { get; set; }

    public virtual Category Category { get; set; } = null!;

    public virtual Shop Shop { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();

}
