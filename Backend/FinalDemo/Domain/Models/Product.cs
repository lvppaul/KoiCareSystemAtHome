using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class Product
{
    public string ProductId { get; set; } = null!;
    public string UserId { get; set; } = null!;
    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public int Quantity { get; set; }

    public double Price { get; set; }

    public bool? Status { get; set; }

    public int CategoryId { get; set; }

    public virtual Category Category { get; set; } = null!;
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;

    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();

    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

}
