using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto.Update
{
    public class CartItemUpdateDTO
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
