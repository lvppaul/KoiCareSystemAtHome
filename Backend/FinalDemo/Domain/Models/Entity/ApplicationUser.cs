using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Entity
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; } = null!;
        public string LastName { get; set; } = null!;

        public string? Sex { get; set; }

        public string? Street { get; set; }

        public string? District { get; set; }

        public string? City { get; set; }

        public string? Country { get; set; }
        public string? Avatar { get; set; }

        public virtual Shop? Shop { get; set; }

        public virtual Cart Cart { get; set; } = null!;


        public string? RefreshToken { get; set; }

        public DateTime? RefreshTokenExpiration { get; set; }

        public virtual ICollection<BlogComment> BlogComments { get; set; } = new List<BlogComment>();

        public virtual ICollection<Blog> Blogs { get; set; } = new List<Blog>();

        public virtual ICollection<KoiRecord> KoiRecords { get; set; } = new List<KoiRecord>();

        public virtual ICollection<KoiRemind> KoiReminds { get; set; } = new List<KoiRemind>();

        public virtual ICollection<Koi> Kois { get; set; } = new List<Koi>();

        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

        public virtual ICollection<Pond> Ponds { get; set; } = new List<Pond>();

        public virtual ICollection<News> News { get; set; } = new List<News>();

        public virtual ICollection<VipRecord> VipRecords { get; set; } = new List<VipRecord>();

        public virtual ICollection<ShopRating> ShopRatings { get; set; } = new List<ShopRating>();

        public virtual ICollection<WaterParameter> WaterParameters { get; set; } = new List<WaterParameter>();

        public virtual ICollection<PaymentTransaction> PaymentTransactions { get; set; } = new List<PaymentTransaction>();
    }
}
