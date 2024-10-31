using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Entity
{
    public class CartItem
    {
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public string ProductName {  get; set; }

        public int Quantity { get; set; }

        public int Price { get; set; }

        public int TotalPrice { get; set; }

        public string Thumbnail { get; set; }

        public virtual Product Product { get; set; }

        public virtual Cart Cart { get; set; }
    }
}
