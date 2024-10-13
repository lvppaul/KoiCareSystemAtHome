using System;
using System.Collections.Generic;

namespace Domain.Models;

public partial class Shop
{
    public int ShopId { get; set; }
    public string UserId { get; set; } = null!;
    public string ShopName { get; set; } = null!;

    public string? Thumbnail { get; set; }

    public string Description { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public decimal? Rating { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    public virtual ApplicationUser ApplicationUser { get; set; } = null!;
}
