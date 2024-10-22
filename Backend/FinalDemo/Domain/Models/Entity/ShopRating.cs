using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Entity
{
    public class ShopRating
    {
        public int RatingId {  get; set; }
        public string UserId { get; set; } = null!;
        public int ShopId { get; set; }
        public int Rating {  get; set; }
        public DateTime CreateAt { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; } = null!;

        public virtual Shop Shop { get; set; } = null!;
    }
}
