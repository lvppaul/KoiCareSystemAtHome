using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace Domain.Models.Entity;

public partial class Shop
{
    public int ShopId { get; set; }
    public string UserId { get; set; } = null!;
    public string ShopName { get; set; } = null!;

    public string? Thumbnail { get; set; }

    public string Description { get; set; } = null!;

    public string Phone { get; set; }

    public string Email { get; set; } = null!;

    public decimal? Rating { get; set; }

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
    public virtual ICollection<ShopRating> ShopRatings { get; set; } = new List<ShopRating>();
    public virtual ApplicationUser User { get; set; } = null!;
}
