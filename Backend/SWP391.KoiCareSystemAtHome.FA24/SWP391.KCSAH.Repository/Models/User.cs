using System;
using System.Collections.Generic;

namespace SWP391.KCSAH.Repository.Models;

public partial class User
{
    public string UserId { get; set; } = null!;

    public string UserName { get; set; } = null!;

    public string FullName { get; set; } = null!;

    public string Pass { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public string Sex { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Street { get; set; } = null!;

    public string District { get; set; } = null!;

    public string City { get; set; } = null!;

    public string Country { get; set; } = null!;

    public int Role { get; set; }

    public bool? IsActive { get; set; }

    public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();

    public virtual ICollection<Cart> Carts { get; set; } = new List<Cart>();

    public virtual ICollection<KoiRecord> KoiRecords { get; set; } = new List<KoiRecord>();

    public virtual ICollection<KoiRemind> KoiReminds { get; set; } = new List<KoiRemind>();

    public virtual ICollection<Koi> Kois { get; set; } = new List<Koi>();

    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

    public virtual ICollection<Pond> Ponds { get; set; } = new List<Pond>();

    public virtual ICollection<Product> Products { get; set; } = new List<Product>();

    public virtual ICollection<Shop> Shops { get; set; } = new List<Shop>();

    public virtual ICollection<WaterParameter> WaterParameters { get; set; } = new List<WaterParameter>();
}
