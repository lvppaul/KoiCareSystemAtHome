using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Models.Dto
{
    public class OrderDetailRequestDTO
    {
        public string ProductId { get; set; } = null!;

        public int Quantity { get; set; }

        public double UnitPrice { get; set; }
    }
}
