using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Response
{
    public class CartDTO
    {
        public int CartId { get; set; }
        public string UserId { get; set; } = null!;
        public int TotalAmount { get; set; }

        public List<CartItemDTO>? CartItems { get; set; }
    }
}
