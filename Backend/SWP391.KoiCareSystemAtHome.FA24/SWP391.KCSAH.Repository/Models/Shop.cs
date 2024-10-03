using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class Shop
{
    public int ShopId { get; set; }

    public string UserId { get; set; } = null!;

    public string ShopName { get; set; } = null!;

    public string Picture { get; set; } = null!;

    public string Description { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Email { get; set; } = null!;

    public decimal? Rating { get; set; }

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual User? User { get; set; } = null!;
}
