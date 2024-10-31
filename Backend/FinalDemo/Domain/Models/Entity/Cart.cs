using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Entity
{
    public class Cart
    {
        public int CartId { get; set; }
        public string UserId { get; set; } = null!;
        public int TotalAmount { get; set; } = 0;

        public virtual ICollection<CartItem> CartItems { get; set; } = new List<CartItem>();
        public virtual ApplicationUser User { get; set; } = null!;
    }
}
