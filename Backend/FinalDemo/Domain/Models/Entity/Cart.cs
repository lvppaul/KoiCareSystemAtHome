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
        public decimal TotalAmount { get; set; }
        public virtual ICollection<List<CartItem>> CartItems { get; set; }
    }
}
